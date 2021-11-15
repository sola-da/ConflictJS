/**
 * Created by Jibesh Patra on 03-Apr-2017.
 */

(function () {
  const browser = require("./browser");

  function addtoqueue(validationTest, jobQueue, dependence) {
    validationTest.jobIds.forEach((jobID) => {
      let url = validationTest.htmlURLs[jobID];
      var onExecute = (function (url) {
        return function (job) {
          job.process = browser.loadURL(url);
          job.resultFilePath = validationTest.resultFilePath;
        };
      })(url);

      var onDone = (function () {
        return function (jobState) {
          // TODO: need these functions?
        };
      })();
      jobQueue.newJob(jobID, dependence, onExecute);
    });
    // let lastJobId = [...validationTest.jobIds].pop();
    validationTest.jobIds.clear(); // Once added, clear the jobs
    // return lastJobId;
  }

  exports.addtoqueue = addtoqueue;
})();
