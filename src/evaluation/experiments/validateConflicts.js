/**
 * Created by Jibesh Patra on 28-Mar-2017.
 */

;(function () {
  const fs = require('fs'),
    path = require('path')
  const baseDir = require('process').cwd() + '/'
  const browser = require('../../utilities/browser'),
    libraries = require('../../utilities/libraries'),
    config = require('../../config')

  /* Directories */
  const resultsDirectory = baseDir + config.resultsDirectory + '/' // The directory where the final results go

  /* Utility Scripts */
  const pathExists = require('../../utilities/pathExists.js').pathExists
  const libraryPairs = require('../../utilities/libraryPairs').libraryPairs
  const resultFileName =
    require('../../utilities/constructFileName').constructUniqueFilename

  /* Misc */
  const findPotentialConflictsJobID = require('./findPotentialConflicts').jobID

  // ----------------------------------------- Experiments to validate conflict --------------------------------
  const inclusionTest =
    require('../validation-tests/inclusionTest').inclusionTest
  const compareType = require('../validation-tests/compareType').compareType
  const compareNonFunctions =
    require('../validation-tests/compareNonFunctions').compareNonFunctions
  const compareFunctions =
    require('../validation-tests/compareFunctions').compareFunctions
  // -----------------------------------------------------------------------------------------------------------

  function testDispatcher(jobQueue, dependence) {
    let potentialConflicts = readPotentialConflicts()

    if (!potentialConflicts) {
      return
    }

    let accessPaths = Object.keys(potentialConflicts)

    /* Take an access path that is potentially conflicting and dispatch one job after another
     * to validate if it is really conflicting for a pair of libraryNames.
     * */
    accessPaths.forEach(accessPath => {
      let libraryNames = Object.keys(potentialConflicts[accessPath])
      let pairsOfLibraries = libraryPairs(libraryNames)

      for (let i = 0; i < pairsOfLibraries.length; i++) {
        let validationTest = {
          accessPath: accessPath,
          libraryNames: [], // Array containing two library names
          isValidated: false, // The moment a library pair is known to be validated make this true
          name: '',
          runTests: new Set(), // Tests that have already executed
          libraryPaths: {}, // name => path (src)
          resultFilePath: '',
          htmlFilePaths: {}, // The HTML file that gets generated
          htmlURLs: {}, // The HTML file that gets generated and loaded in browser
          libIframes: {},
          jobIds: new Set(),
          generatedDir: baseDir + 'generated/',
          fragmentDir: baseDir + config.htmlFragmentsDir,
          urlprefix: 'http://localhost:3000/generated/',
        }

        if (!pathExists(validationTest.generatedDir)) {
          fs.mkdirSync(validationTest.generatedDir)
        }

        pairsOfLibraries[i].forEach(lib => {
          validationTest.libraryPaths[lib] =
            libraries.libraryByName(lib).libraryFiles[0] // Currently considering the first file
        })
        validationTest.libraryNames = pairsOfLibraries[i].sort() // An array containing two libraryNames

        let fileName = resultFileName(validationTest)
        validationTest.resultFilePath = resultsDirectory + fileName + '.json'
        let conflictingJob = checkValidationStatus(validationTest)

        // addFilePaths(validationTest);

        let validated = validationTest.isValidated

        /* Write to the validated conflicts file*/
        if (validated && conflictingJob) {
          writeValidatedResults(validationTest, conflictingJob)
        } else {
          if (validationTest.runTests.size === 0) {
            // Experiment One: Inclusion test
            validationTest.name = 'inclusionTest'
            inclusionTest(validationTest, jobQueue, dependence)
          }

          if (
            validationTest.runTests.has('inclusionTest') &&
            !validationTest.runTests.has('typeTest')
          ) {
            // inclusion test done
            // Experiment Two: Type test
            validationTest.name = 'typeTest'
            compareType(validationTest, jobQueue, dependence)
          }

          if (validationTest.runTests.has('typeTest')) {
            // type test done
            // Experiment Three: Value test
            if (
              !accessPathFunctionType(
                potentialConflicts[accessPath],
                validationTest.libraryNames
              )
            ) {
              if (!validationTest.runTests.has('value-test-non-functions')) {
                /// Non-functions
                validationTest.name = 'value-test-non-functions'
                compareNonFunctions(validationTest, jobQueue, dependence)
              }
            } else {
              if (!validationTest.runTests.has('value-test-functions')) {
                /// Functions
                validationTest.name = 'value-test-functions'
                compareFunctions(validationTest, jobQueue, dependence)
              }
            }
          }
        }
      }
    })
  }

  function accessPathFunctionType(conflictingLibs, libraryPair) {
    let types = new Set()
    libraryPair.forEach(lib => {
      types.add(conflictingLibs[lib])
    })
    if (types.size > 1) throw 'Different types found during global analysis'
    return types.has('Function')
  }

  function writeValidatedResults(validationTest, job) {
    let result = JSON.parse(
      fs.readFileSync(validationTest.resultFilePath, { encoding: 'utf8' })
    )
    let message = result[job]

    let validatedResultFile = config.validatedProblematicLibrariesFile
    let results = {}

    if (pathExists(validatedResultFile)) {
      results = JSON.parse(
        fs.readFileSync(validatedResultFile, { encoding: 'utf8' })
      )
    }
    if (!results.hasOwnProperty(job)) {
      results[job] = message
      fs.writeFileSync(validatedResultFile, JSON.stringify(results))
    }
  }

  function checkValidationStatus(validationTest) {
    let result_File = validationTest.resultFilePath
    if (pathExists(result_File)) {
      let result = JSON.parse(
        fs.readFileSync(result_File, { encoding: 'utf8' })
      )
      for (let job in result) {
        if (result.hasOwnProperty(job)) {
          let message = result[job]
          let errorPattern = new RegExp('w*(ERROR)')
          let notSurePattern = new RegExp('w*(NOT SURE)')

          let inclusionPattern = new RegExp('w*(inclusionTest)')
          let typePattern = new RegExp('w*(typeTest)')
          let valuenonfuncPattern = new RegExp('w*(value-test-non-functions)')
          let valuefuncPattern = new RegExp('w*(value-test-functions)')

          if (inclusionPattern.test(job))
            validationTest.runTests.add('inclusionTest')
          if (typePattern.test(job)) validationTest.runTests.add('typeTest')
          if (valuenonfuncPattern.test(job))
            validationTest.runTests.add('value-test-non-functions')
          if (valuefuncPattern.test(job))
            validationTest.runTests.add('value-test-functions')

          // If contains only ERROR
          if (errorPattern.test(message) && !notSurePattern.test(message)) {
            validationTest.isValidated = true
            return job
          }
        }
      }
    }
    return false
  }

  function readPotentialConflicts() {
    let potentialConflictsFile = resultsDirectory + '/potentialConflicts.json'
    /* Potential conflicts are not yet ready */
    if (!pathExists(potentialConflictsFile)) {
      /**/
      console.log('Potential conflicts have not been found yet. Run again...')
      return false
    }
    let rawPotentialConflicts = fs.readFileSync(potentialConflictsFile, {
      encoding: 'utf8',
    })
    return JSON.parse(rawPotentialConflicts)
  }

  function createJobs(jobQueue) {
    /* jobid is name of the job and the precondition is the other */
    let dependence = [new RegExp(findPotentialConflictsJobID)]
    testDispatcher(jobQueue, dependence)
  }

  exports.createJobs = createJobs
})()
