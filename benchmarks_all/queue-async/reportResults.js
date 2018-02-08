// Author: Michael Pradel

_LibraryInterference_libraryName = "/media/Data/Work/LibraryInterference/results_new/global-write-analysis/global-write-analysisqueue-async.json";
_LibraryInterference_jobID = "individual analysis of queue-async";
_TypeOfTest = "global-write-analysis";

J$.analysis.endExecution();
window.setTimeout(function () {
    close();
}, timeToClose_BrowserTab);