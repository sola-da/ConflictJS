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

  console.log('run experiment')

  console.log('filterInclusionCrashLibs')
  filterInclusionCrashLibs.createJobs(jobQueue)
  console.log('findGlobalWrites')
  findGlobalWrites.createJobs(jobQueue)
  console.log('findPotentialConflicts')
  findPotentialConflicts.createJobs(jobQueue)
  console.log('validateConflicts')
  validateConflicts.createJobs(jobQueue)

  console.log('start server')
  let server_new = server.startServer(jobQueue)
  browser.start()

  jobQueue.setFinalize(function () {
    console.log('Waiting a moment before cleaning up...')
    // TODO: Move validated conflicts to results directory

    // TODO: Delete the generated directory

    setTimeout(function () {
      browser.close()
      server_new.close()
      console.log('Server closed. Experiments finished.')
    }, config.waitingTime)
  })

  jobQueue.execute()
})()
