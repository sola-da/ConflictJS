/**
 * Created by Jibesh Patra on 03-Apr-2017.
 */
function checkMessages() {
    if (messages.size > 1) {
        messages.forEach(function (val, key) {
            messages.forEach(function (val2, key2) {
                if (key !== key2) {
                    let comparisonMessage = areEqual(val[accessPath], val2[accessPath]);
                    if (comparisonMessage !== 'EQUAL') {
                        result_content = "ERROR " + comparisonMessage;
                    }
                }
            });
        });
    }
    window.setTimeout(sendBackToServer, 100);
}

function areEqual(obj1, obj2) {
    let len1 = 0, len2 = 0;
    // console.log(obj1);
    // console.log(obj2);
    if (obj1 === obj2) {
        return 'EQUAL';
    }
    if (obj1 && obj2) {
        len1 = Object.keys(obj1).length;
        len2 = Object.keys(obj2).length;
    }
    /* Step by step comparision */

    if (len1 !== len2) {
        return "SIZE of objects different " + len1 + ' and ' + len2;
    }

    var functions_inObj1 = [], functions_inObj2 = [];

    /* Keep track of the properties in objects that are functions.
     * TODO: This is taking a lot of time, I am commenting out it for now
     * */


    /* The following is using underscore to find if the objects are different. I am also keeping track of the
     * name of properties that are function types.
     * If the size of objects are same and the properties that are 'Function' types are also same then
     * I might want to generate test for such functions.
     * In the worst case, I want to find out how often such cases happen.
     * */
    if (!_.isEqual(obj1, obj2)) {
        // return 'NOT EQUAL - Functions properties, First >>' + funcTypes1.toString() + ' Second >>' + funcTypes2.toString();

        /* First check if functions exists in the respective objects */
        functions_inObj1 = findFunctions(obj1);
        functions_inObj2 = findFunctions(obj2);
        /* Check if the number of functions both the objects have is equal, then check if the name of the functions are same
         *  If both the number of functions and names of the properties are same, then compare the Functions within objects
         * */
        if (functions_inObj1.length === functions_inObj2.length && nameOfFunctionsAreSame(new Set(functions_inObj1), new Set(functions_inObj2))) {
            return 'NOT SURE - objects contain functions';
            // var listOfFunctionAccessPath = comparedFunctionsWithinObjects(obj1, functions_inObj1, obj2, functions_inObj2, accessPathName);
            // return listOfFunctionAccessPath;
            // if () {
            //     return 'EQUAL Objects having FUNCTIONS';
            // }
        } else
            return 'NOT EQUAL';
    }

    return 'EQUAL';
}

/* Compare the names of the functions stored in the objects */
function nameOfFunctionsAreSame(set1, set2) {
    if (set1.size !== set2.size) return false;
    for (var elem of set1) if (!set2.has(elem)) return false;
    return true;
}

/* For an object save the property names that are functions.
 *  It goes inside nested objects and pulls out the function types present in the nested objects.
 * */
function findFunctions(obj) {
    var funcTypes = [];
    for (const key in obj) {
        let types = myType(obj[key]);
        if (types === "Function") {
            // return true; // Returns true specifying that the object has
            funcTypes.push(key);
        } else if (types === "object") {
            let nestedFunctions = findFunctions(obj[key]);
            nestedFunctions.forEach(elem => {
                funcTypes.push(key + '.' + elem)
            });
        }
    }
    return funcTypes;
}

function myType(value) {
    if (_.isArray(value)) return 'Array';
    else if (_.isFunction(value)) return 'Function';
    else if (_.isBoolean(value)) return 'Boolean';
    else if (_.isNumber(value)) return 'Number';
    else if (_.isDate(value)) return 'Date';
    else if (_.isRegExp(value)) return 'RegExp';
    else if (_.isNull(value)) return 'null';
    else if (_.isUndefined(value)) return 'undefined';
    else if (_.isString(value)) return 'String';
    else if (_.isArguments(value)) return 'Arguments';
    else if (value instanceof Map) return 'Map';
    else if (value instanceof Set) return 'Set';
    else return typeof value; // If none of above then probably 'object'
}
