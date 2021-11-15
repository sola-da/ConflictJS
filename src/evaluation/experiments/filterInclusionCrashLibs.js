/**
 * Created by Jibesh Patra on 18-Apr-2017.
 *
 * Filter those libs that fail when included alone. The filtered libs are not part of our evaluations
 */
const fs = require('fs')

const config = require('../../config')
const libraries = require('../../utilities/libraries')
const baseDir = require('process').cwd() + '/'
const unique = require('../../utilities/constructFileName')
const pathExists = require('../../utilities/pathExists.js').pathExists
const resultsDirectory =
  baseDir + config.resultsDirectory + '/filter-inclusion-crash/' // The directory where the final  global writes go

const htmlgen = require('../../utilities/generate-html')
const addJobs = require('../../utilities/addJobs')

const filterInclusionCrashJobIdPrefix = 'filter-inclusion-crash'

function filterInclusionCrashingLibs(allLibraries, jobQueue) {
  for (let i = 0; i < allLibraries.length; i++) {
    let library = allLibraries[i]
    let libraryName = library.name
    let validationTest = {
      name: filterInclusionCrashJobIdPrefix,
      libraryNames: [libraryName],
      accessPath: 'accessPath',
      isValidated: false, // The moment a library pair is known to be validated make this true
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

    if (!pathExists(resultsDirectory)) {
      fs.mkdirSync(resultsDirectory)
    }

    if (!pathExists(validationTest.generatedDir)) {
      fs.mkdirSync(validationTest.generatedDir)
    }

    let filename = unique.constructUniqueFilename(validationTest)
    validationTest.resultFilePath = resultsDirectory + filename + '.json'

    if (!pathExists(validationTest.resultFilePath)) {
      validationTest.libraryPaths[libraryName] =
        libraries.libraryByName(libraryName).libraryFiles[0] // Currently considering the first file
      htmlgen.filterInclusionCrashLibs(validationTest)

      let dependence = [] // no dependence since this is the first test I am running
      addJobs.addtoqueue(validationTest, jobQueue, dependence)
    }
  }
}

/* Write the libraries that crash on including alone to json file */
function writeCrashingLibs(jobQueue) {
  let resultFiles = fs.readdirSync(resultsDirectory).filter(function (elem) {
    return fs.lstatSync(resultsDirectory + '/' + elem).isFile()
  })
  let crashingLibs = new Set()
  for (let i = 0; i < resultFiles.length; i++) {
    let resultFile = resultFiles[i]
    let rawresults = JSON.parse(
      fs.readFileSync(resultsDirectory + '/' + resultFile, { encoding: 'utf8' })
    )
    let errorPattern = new RegExp('w*(ERROR)', 'i')
    for (let key in rawresults) {
      let data = rawresults[key]

      if (errorPattern.test(data)) {
        let libname = resultFile.split(config.accessPathSeparationChar)[0]
        crashingLibs.add(libname)
      }
    }
  }

  fs.writeFileSync(
    config.singleLibCrashingFile,
    JSON.stringify([...crashingLibs])
  )
  setTimeout(jobQueue.markDone.bind(null, 'Writing crashing libs'))
}

function createJobs(jobQueue) {
  let allLibraries = libraries.allLibraries()
  // Find if inclusion of single library produces any exception
  filterInclusionCrashingLibs(allLibraries, jobQueue)
  let jobID = 'Writing crashing libs'
  jobQueue.newJob(
    jobID,
    [new RegExp(filterInclusionCrashJobIdPrefix)],
    writeCrashingLibs.bind(null, jobQueue)
  )
}

exports.filterInclusionCrashJobIdPrefix = filterInclusionCrashJobIdPrefix
exports.createJobs = createJobs
