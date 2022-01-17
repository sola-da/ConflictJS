// Author: Michael Pradel, Jibesh Patra

;(function () {
  const jobQueue = require('./utilities/jobQueue')
  const server = require('./utilities/server')
  const browser = require('./utilities/browser')
  const config = require('./config')
  const pathExists = require('./utilities/pathExists').pathExists

  const filterInclusionCrashLibs = require('./evaluation/experiments/filterInclusionCrashLibs')
  const findGlobalWrites = require('./evaluation/experiments/findGlobalWrites')
  const findPotentialConflicts = require('./evaluation/experiments/findPotentialConflicts')
  const validateConflicts = require('./evaluation/experiments/validateConflicts')

  filterInclusionCrashLibs.createJobs(jobQueue)
  findGlobalWrites.createJobs(jobQueue)
  findPotentialConflicts.createJobs(jobQueue)
  validateConflicts.createJobs(jobQueue)

  let server_new = server.startServer(jobQueue)
  browser.start()

  jobQueue.setFinalize(function () {
    console.log('Waiting a moment before cleaning up...')
    // TODO: Move validated conflicts to results directory

    // TODO: Delete the generated directory

    browser.close()
    server_new.close()
    console.log('Server closed. Experiments finished.')
    process.exit(1)

    // setTimeout(function () {
    //   browser.close()
    //   server_new.close()
    //   console.log('Server closed. Experiments finished.')
    // }, config.waitingTime)
  })

  jobQueue.execute()
})()
