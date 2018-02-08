// Author: Michael Pradel

_LibraryInterference_libraryName = "/media/Data/Work/LibraryInterference/results_new/global-write-analysis/global-write-analysiswaypoints.json";
_LibraryInterference_jobID = "individual analysis of waypoints";
_TypeOfTest = "global-write-analysis";

J$.analysis.endExecution();
window.setTimeout(function () {
    close();
}, timeToClose_BrowserTab);