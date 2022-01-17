/**
 * Created by Jibesh Patra on 28-Mar-2017.
 */
;(function () {
  const htmlgen = require('../../utilities/generate-html')
  const addjobs = require('../../utilities/addJobs').addtoqueue

  function compareNonFunctions(validationTest, jobQueue, dependence) {
    let hostingPageClient, LibraryClientCode

    hostingPageClient =
      "\t<script src='../node_modules/underscore/underscore-min.js'></script>"
    hostingPageClient +=
      "\n\t<script src='../src/evaluation/validation-tests/compareNonFunction_Hostingclient.js'></script>"
    hostingPageClient +=
      "\n\t<script>let accessPath = '" +
      validationTest.accessPath +
      "';</script>"

    LibraryClientCode =
      "\n\t<script src='../src/evaluation/validation-tests/compareNonFunction_Libclient.js'></script>"
    htmlgen.generateTemplate(
      validationTest,
      hostingPageClient,
      LibraryClientCode
    )
    addjobs(validationTest, jobQueue, dependence)
  }

  exports.compareNonFunctions = compareNonFunctions
})()
