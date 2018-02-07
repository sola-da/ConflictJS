// Author: Michael Pradel, Jibesh Patra
/**
 * Go through the global writes file of each library
 * 1) If global writes is undefined, then ignore the library.
 * 2) If global writes are available, then find the name of the variable
 * that gets overwritten. After that, check for any possible name collisions
 * and write them to a file as potential candidates for conflict.
 *
 * Later these libraryNames that are potentially conflicting are checked in
 * pairs to validate the conflict. (Not in this file)
 */
(function () {

    let baseDir = require("process").cwd();
    const config = require('../../config');
    const pathExists = require('../../utilities/pathExists.js').pathExists;
    const globalWritesDir = baseDir + '/' + config.resultsDirectory + "/global-writes/";
    const globalWritesjobidprefix = require("./findGlobalWrites").globalWritesAnalysisJobIdPrefix;

    let fs = require("fs");
    let jobID = "Finding potential conflicts across all libraryNames";

    function findPotentialConflicts(jobQueue) {
        let globalPathToLibs = {};
        // console.log(globalWritesDir);
        if (!pathExists(globalWritesDir)) {
            setTimeout(jobQueue.markDone.bind(null, jobID));
            return;
        }
        let globalWriteResultFiles = fs.readdirSync(globalWritesDir).filter(function (elem) {
            return fs.lstatSync(globalWritesDir + "/" + elem).isFile();
        });
        // sort global access paths by libraryNames that write to them
        let nbIgnoredLibraries = 0;
        for (let i = 0; i < globalWriteResultFiles.length; i++) {
            let globalWriteResultFile = globalWriteResultFiles[i];
            let libraryName = globalWriteResultFile.split(config.accessPathSeparationChar)[0];
            let globalWritesRaw = fs.readFileSync(globalWritesDir + "/" + globalWriteResultFile, {encoding: "utf8"});

            if (globalWritesRaw === "undefined") {
                nbIgnoredLibraries++;
            } else {
                let globalWrites = JSON.parse(globalWritesRaw);
                let writtenPaths = Object.keys(globalWrites);
                for (let j = 0; j < writtenPaths.length; j++) {
                    let writtenPath = writtenPaths[j];
                    let librariesForPath = globalPathToLibs[writtenPath] || {};
                    librariesForPath[libraryName] = globalWrites[writtenPath]; // The type of access path
                    globalPathToLibs[writtenPath] = librariesForPath;
                }
            }
        }

        // find paths with at least two writers
        let finalGlobalPathToLibs = {};
        let globalPaths = Object.keys(globalPathToLibs);
        for (let i = 0; i < globalPaths.length; i++) {
            let globalPath = globalPaths[i];
            if (Object.keys(globalPathToLibs[globalPath]).length > 1) {
                finalGlobalPathToLibs[globalPath] = globalPathToLibs[globalPath];
            }
        }

        console.log("Ignored libraryNames: " + nbIgnoredLibraries + "/" + globalWriteResultFiles.length);

        fs.writeFileSync(baseDir + '/' + config.resultsDirectory + "/potentialConflicts.json", JSON.stringify(finalGlobalPathToLibs, 0, 2));

        setTimeout(jobQueue.markDone.bind(null, jobID));
    }

    function createJobs(jobQueue) {
        jobQueue.newJob(jobID, [new RegExp(globalWritesjobidprefix)], findPotentialConflicts.bind(null, jobQueue));
    }

    exports.createJobs = createJobs;
    exports.jobID = jobID;

})();