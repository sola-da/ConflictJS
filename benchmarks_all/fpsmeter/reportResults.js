// Author: Michael Pradel

_LibraryInterference_libraryName = "/media/Data/Work/LibraryInterference/results_new/global-write-analysis/global-write-analysisfpsmeter.json";
_LibraryInterference_jobID = "individual analysis of fpsmeter";
_TypeOfTest = "global-write-analysis";

J$.analysis.endExecution();
window.setTimeout(function () {
    close();
}, timeToClose_BrowserTab);