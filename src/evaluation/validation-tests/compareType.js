/**
 * Created by Jibesh Patra on 28-Mar-2017.
 */
(function () {
  const htmlgen = require("../../utilities/generate-html");
  const addjobs = require("../../utilities/addJobs").addtoqueue;

  function compareType(validationTest, jobQueue, dependence) {
    let hostingPageClient, LibraryClientCode;

    hostingPageClient =
      "\t<script src='../node_modules/underscore/underscore-min.js'></script>";
    hostingPageClient +=
      "\n\t<script src='../src/evaluation/validation-tests/compareType_Hostingclient.js'></script>";
    hostingPageClient +=
      "\n\t<script>var accessPath = '" +
      validationTest.accessPath +
      "';</script>";

    LibraryClientCode =
      "\n\t<script src='../src/evaluation/validation-tests/compareType_Libclient.js'></script>";
    htmlgen.generateTemplate(
      validationTest,
      hostingPageClient,
      LibraryClientCode
    );
    addjobs(validationTest, jobQueue, dependence);
  }

  exports.compareType = compareType;
})();
