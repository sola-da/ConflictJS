// Author: Michael Pradel, Jibesh Patra

(function () {
    const pathExists = require('./utilities/pathExists').pathExists;
    const fs = require('fs');
    exports.nbGeneratedTests = 50; // Number of tests to generate
    exports.callsPerGeneratedTest = 10; // Number of times to call the function
    exports.serverPort = 3000;

    exports.waitingTime = 30000; // Time to wait before killing the experiments
    exports.timeout_kill_job = 120000; // If a job runs more than set time kill it (60000 = 1 minute)
    exports.browserName = 'chromium-browser';

// The result file
    let currentDir = process.cwd();
    let resultDir = "results";

    if (!pathExists(currentDir + '/' + resultDir)) fs.mkdirSync(currentDir + '/' + resultDir);
    exports.validatedProblematicLibrariesFile = currentDir + '/' + resultDir + '/validated-conflicts.json';
    exports.singleLibCrashingFile = currentDir + '/' + resultDir + '/filtered-InclusionCrash.json';

    /**
     * Test these characters for uniqueness in src/utilities/findUniqueChars.js
     * @type {string}
     */
    exports.libraryNamesConjunctionChar = '§';
    exports.accessPathSeparationChar = '°';
    exports.fileNamePrefixSeparationChar = 'ß';

// Need the following directories in order to function
    exports.resultsDirectory = resultDir;
    exports.generationDirectory = "/generated"; // A directory where all generated tests and HTML files are kept
    exports.benchmarkDir = "/benchmarks"; // Contains libraryNames we want to test
    exports.htmlFragmentsDir = "src/htmlFragments"; // Contains libraryNames we want to test
    exports.globalWritesDir = "/global-writes/";
})();
