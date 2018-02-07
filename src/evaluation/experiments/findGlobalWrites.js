/**
 * Created by Jibesh Patra on 06-Apr-2017.
 */
const fs = require('fs');

// Importing jalangi for instrumenting
const jalangiAPI = require('../../../node_modules/jalangi2/src/js/utils/api');

const config = require('../../config');
const libraries = require("../../utilities/libraries");
const unique = require('../../utilities/constructFileName');
const pathExists = require('../../utilities/pathExists.js').pathExists;
const baseDir = require("process").cwd() + '/';
const resultsDirectory = baseDir + config.resultsDirectory + config.globalWritesDir; // The directory where the final  global writes go

const htmlgen = require("../../utilities/generate-html");
const addJobs = require('../../utilities/addJobs');

const filterInclusionCrashJobIdPrefix = require("./filterInclusionCrashLibs").filterInclusionCrashJobIdPrefix;

const globalWritesAnalysisJobIdPrefix = 'global-write-analysis';
/**
 * Include each library to a HTML file, use jalangi to analyse globalwrites and keep track of their types (using Underscore library)
 * Skip a library if libraryname_globalWrites.json file already exists in the 'results/global-write-analysis' directory
 * @param allLibraries
 * @param {Object} jobQueue - Containing queued jobs of type RegExp
 */
function globalWritesAndTypeAnalysis(allLibraries, jobQueue) {
    if (!pathExists(config.singleLibCrashingFile)) {
        return;
    }
    let singleCrashingLibs = new Set(JSON.parse(fs.readFileSync(config.singleLibCrashingFile, {encoding: "utf8"})));

    for (let i = 0; i < allLibraries.length; i++) {
        let library = allLibraries[i];
        let libraryName = library.name;

        let validationTest = {
            name: globalWritesAnalysisJobIdPrefix,
            libraryNames: [libraryName],
            accessPath: 'global-writes',
            isValidated: false, // The moment a library pair is known to be validated make this true
            runTests: new Set(), // Tests that have already executed
            libraryPaths: {}, // name => path (src)
            resultFilePath: "",
            htmlFilePaths: {}, // The HTML file that gets generated
            htmlURLs: {}, // The HTML file that gets generated and loaded in browser
            libIframes: {},
            jobIds: new Set(),
            generatedDir: baseDir + 'generated/',
            fragmentDir: baseDir + config.htmlFragmentsDir,
            urlprefix: "http://localhost:3000/generated/"
        };

        if (!pathExists(resultsDirectory)) {
            fs.mkdirSync(resultsDirectory);
        }

        if (!pathExists(validationTest.generatedDir)) {
            fs.mkdirSync(validationTest.generatedDir);
        }

        let filename = unique.constructUniqueFilename(validationTest);
        validationTest.resultFilePath = resultsDirectory + filename + '.json';

        // If it is known that the library casues an exception, do not find global writes
        if (!pathExists(validationTest.resultFilePath) && !singleCrashingLibs.has(libraryName) /*&& singleLibInclusionTestDone.has(libraryName)*/) {
            /* If not already done */
            downloadAndInstrumentLibrary(library);
            let libjsfilename = libraries.libraryByName(libraryName).libraryFiles[0]; // Currently considering the first file

            // Inject _instrumented to src of html
            libjsfilename = libjsfilename.split(".js").join("_instrumented.js");

            validationTest.libraryPaths[libraryName] = libjsfilename;
            htmlgen.globalWriteAnalysis(validationTest);

            let dependence = [new RegExp(filterInclusionCrashJobIdPrefix)];
            addJobs.addtoqueue(validationTest, jobQueue, dependence);
        } else {
            console.log("Skipping: " + libraryName);
        }
    }
}

/**
 * Download and instrument a library if not already done
 * @param {Object} library - Containing properties about a library like name, url etc.
 */
function downloadAndInstrumentLibrary(library) {
    let urls = library.urls;
    let libraryDir = baseDir + config.benchmarkDir + "/" + library.name;
    for (let j = 0; j < urls.length; j++) {
        let url = urls[j];
        let urlSegments = url.split("/");
        let originalLibraryFile = urlSegments[urlSegments.length - 1];
        let originalLibraryPath = libraryDir + "/" + originalLibraryFile;
        let instrumentedLibraryFile = originalLibraryFile.replace(/.js$/, "_instrumented.js");
        let instrumentedLibraryPath = libraryDir + "/" + instrumentedLibraryFile;

        try {
            fs.accessSync(instrumentedLibraryPath, fs.F_OK);
        } catch (e) {
            // download library
            let wgetCmd = "wget " + url;
            // childProcess.execSync(wgetCmd, {cwd: libraryDir});
            // instrument library
            let originalLibraryCode = fs.readFileSync(originalLibraryPath, {encoding: "utf8"});
            let instrumentedLibraryCode = jalangiAPI.instrumentString(originalLibraryCode, {inlineSourceMap: "true"}).code;
            fs.writeFileSync(instrumentedLibraryPath, instrumentedLibraryCode);
            console.log("Have written to " + instrumentedLibraryPath);
        }
        library.instrumentedLibraryFiles.push(instrumentedLibraryFile);
    }
}

function createJobs(jobQueue) {
    let allLibraries = libraries.allLibraries();
    // Find if inclusion of single library produces any exception
    // singleLibraryInclusionTest(allLibraries, jobQueue);

    // Find the global writes and types
    globalWritesAndTypeAnalysis(allLibraries, jobQueue);
}
exports.createJobs = createJobs;
exports.globalWritesAnalysisJobIdPrefix = globalWritesAnalysisJobIdPrefix;