/**
 * Created by Jibesh Patra on 28-Mar-2017.
 */
;(function () {
  const htmlgen = require('../../utilities/generate-html')
  const addjobs = require('../../utilities/addJobs').addtoqueue

  function inclusionTest(validationTest, jobQueue, dependence) {
    let hostingPageClient, LibraryClientCode

    hostingPageClient =
      "\t<script src='../src/evaluation/validation-tests/inclusionTest_Hostingclient.js'></script>"

    // LibraryClientCode = "\n\t<script>var message = '" + validationTest.libraryNames + "';</script>";
    LibraryClientCode =
      "\t<script src='../src/evaluation/validation-tests/inclusionTest_Libclient.js'></script>"
    htmlgen.generateTemplate(
      validationTest,
      hostingPageClient,
      LibraryClientCode
    )
    addjobs(validationTest, jobQueue, dependence)
  }

  exports.inclusionTest = inclusionTest
})()
