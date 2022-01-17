/**
 * Created by Jibesh Patra on 28-Mar-2017.
 */
;(function () {
  const htmlgen = require('../../utilities/generate-html')
  const addjobs = require('../../utilities/addJobs').addtoqueue
  const config = require('../../config')

  function compareFunctions(validationTest, jobQueue, dependence) {
    let hostingPageClient, LibraryClientCode

    hostingPageClient =
      "\n\t<script src='../node_modules/seedrandom/seedrandom.min.js'></script>"
    hostingPageClient +=
      "\n\t<script src='../src/utilities/testGeneration.js'></script>"
    hostingPageClient +=
      "\n\t<script src='../src/evaluation/validation-tests/compareFunction_Hostingclient.js'></script>"
    hostingPageClient +=
      "\n\t<script>let accessPath = '" +
      validationTest.accessPath +
      "';\nlet testsGenerated = false,generatedTestsSize = [];</script>"
    hostingPageClient +=
      '\n\t<script>let NO_OF_TESTS =' +
      config.nbGeneratedTests +
      ', NO_OF_CALLS =' +
      config.callsPerGeneratedTest +
      ';</script>'

    LibraryClientCode =
      "\n\t<script src='../src/evaluation/validation-tests/compareFunction_Libclient.js'></script>"
    htmlgen.generateTemplate(
      validationTest,
      hostingPageClient,
      LibraryClientCode
    )
    addjobs(validationTest, jobQueue, dependence)
  }

  exports.compareFunctions = compareFunctions
})()
