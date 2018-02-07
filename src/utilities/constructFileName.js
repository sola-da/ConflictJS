/**
 * Created by Jibesh Patra on 07-Dec-2016.
 */

(function () {
    let accessPathSeparationChar = require('../config').accessPathSeparationChar;
    let fileNamePrefixSeparationChar = require('../config').fileNamePrefixSeparationChar;
    let libraryNamesConjunctionChar = require('../config').libraryNamesConjunctionChar;

    function constructFilename(filenamePrefix, libraryNames, accessPathName) {
        if (accessPathName) {
            accessPathName = accessPathName.replace(/\//g, 'SLASH'); // Some access paths have this char
            accessPathName = accessPathName.replace(/_/g, 'µ'); // Some access paths have this char
            accessPathName = accessPathName.replace(/%/g, 'PERCENT'); // Some access paths have this char
        }
        let fileName = filenamePrefix + fileNamePrefixSeparationChar;
        fileName = fileName + libraryNames;
        if (!accessPathName) {
            return fileName;
        }
        return fileName + accessPathSeparationChar + accessPathName;
    }

    function constructUniqueFilename(validationTest) {
        let libraryNames = mappedArray(validationTest.libraryNames), accessPathName = validationTest.accessPath;

        if (accessPathName) {
            accessPathName = accessPathName.replace(/\//g, 'SLASH'); // Some access paths have this char
            accessPathName = accessPathName.replace(/_/g, 'µ'); // Some access paths have this char
            accessPathName = accessPathName.replace(/%/g, 'PERCENT'); // Some access paths have this char
        }
        let fileName = libraryNames;
        return fileName + accessPathSeparationChar + accessPathName;
    }

    function constructUniquejobID(validationTest) {
        let filenamePrefix = validationTest.name, libraryNames = mappedArray(validationTest.libraryNames),
            accessPathName = validationTest.accessPath;

        if (accessPathName) {
            accessPathName = accessPathName.replace(/\//g, 'SLASH'); // Some access paths have this char
            accessPathName = accessPathName.replace(/_/g, 'µ'); // Some access paths have this char
            accessPathName = accessPathName.replace(/%/g, 'PERCENT'); // Some access paths have this char
        }
        let fileName = filenamePrefix + fileNamePrefixSeparationChar;
        fileName = fileName + libraryNames;
        if (!accessPathName) {
            return fileName;
        }
        return fileName + accessPathSeparationChar + accessPathName;
    }

    function mappedArray(libraries) {
        return libraries.map(l => {
            return l;
        }).join(libraryNamesConjunctionChar);
    }

    exports.constructFilename = constructFilename;
    exports.constructUniqueFilename = constructUniqueFilename;
    exports.constructUniquejobID = constructUniquejobID;
})();