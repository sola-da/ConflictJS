// Author: Michael Pradel, Jibesh Patra

;(function (sandbox) {
  function GlobalWritesAnalysis() {
    /*
         Store global props before any library is loaded
         We need this because this returns properties even if they are non-enumerable. Number could be overwritten but could
         be non enumerable
         */
    var globalProps = Object.getOwnPropertyNames(window)

    // TODO: ideally, should track all writes to global state as it is just before a particular lib is loaded

    var globalWritesTypes = {} // access path --> type
    var alreadyVisited = new Set()

    var theManyNamesOfGlobal = ["window", "top", "frames", "self", "parent"]
    var manyDifferentTypes = [
      "undefined",
      "boolean",
      "number",
      "string",
      "symbol",
      "function",
    ] // Types except object

    function globalRefs(base, propName) {
      var result = []
      for (var i = 0; i < globalProps.length; i++) {
        // result = [];
        var prop = globalProps[i]
        var multiseg = prop.split(".")
        var access = window[prop]
        if (multiseg.length > 1) {
          multiseg.forEach((elem) => {
            if (!access) {
              access = window[elem]
            } else access = access[elem]
          })
        }
        if (access !== undefined && access !== null) {
          // check for access to a global object's field
          if (access === base) {
            if (access === window) {
              result.push(propName) // deal w/ writes to aliases of window, such as "top" and "self"
            } else {
              result.push(prop + "." + propName)
            }
            /*
                         There is particular library called places.js that has the problem of writing to window.$.
                         At the end window.$ becomes undefined for some reason. Our global analysis is correct in
                         this regard. The following console.log shows that.
                         if (propName === 'event') {
                         console.log(prop);
                         console.log(window["Zepto"] === window["$"]);
                         console.log(base);
                         console.log(access);
                         console.log(result);
                         }*/
          }
          /**
           * Check for access to the prototype of the global object
           * Example: If Number.prototype gets extended or overwritten, check it
           *
           * This necessarily means that the library might interfere with the built-
           * in implementations of the browser.
           */
          if (
            Object.getPrototypeOf(access) === base ||
            access.prototype === base
          ) {
            let property = myType(base)

            // For non-primitives get the name of the object
            if (property === "object") {
              property = prop
            }
            result.push(property + ".prototype." + propName)
            // result.push(prop + ".prototype." + propName);
          }
        }
      }
      return result
    }

    var traversedobjects = new Set()

    function returnNestedPropNames(obj) {
      let namesandTypes = new Map()
      if (traversedobjects.has(obj)) {
        return namesandTypes
      }
      traversedobjects.add(obj)
      let props = Object.keys(obj)
      // console.log("Size: ", props.length);
      props.forEach((prop) => {
        if (!blackSet.has(prop)) {
          let typeOfProp = myType(obj[prop])
          namesandTypes.set(prop, typeOfProp)

          if (typeOfProp === "object") {
            let nestedProp = returnNestedPropNames(obj[prop])
            nestedProp.forEach((typeOfProp, accessPath) => {
              namesandTypes.set(prop + "." + accessPath, typeOfProp)
            })
          }
        }
      })
      return namesandTypes
    }

    /**
     * Returns the JavaScript type of 'value'
     * @param value
     * @returns {String}
     */
    function myType(value) {
      if (_.isArray(value)) return "Array"
      else if (_.isFunction(value)) return "Function"
      else if (_.isBoolean(value)) return "Boolean"
      else if (_.isNumber(value)) return "Number"
      else if (_.isDate(value)) return "Date"
      else if (_.isRegExp(value)) return "RegExp"
      else if (_.isNull(value)) return "null"
      else if (_.isUndefined(value)) return "undefined"
      else if (_.isString(value)) return "String"
      else if (_.isArguments(value)) return "Arguments"
      else if (value instanceof Map) return "Map"
      else if (value instanceof Set) return "Set"
      else return typeof value // If none of above then probably 'object'
    }

    this.write = function (iid, name, val, lhs, isGlobal, isScriptLocal) {
      if (isGlobal) {
        let globalname = "window"
        let typeOfCurrent = myType(val)

        if (globalWritesTypes.hasOwnProperty(name)) {
          //    Remove all elements that start with 'name'
          var propNames = Object.keys(globalWritesTypes)
          propNames.forEach((prop) => {
            if (prop.split(".")[0] === name) {
              delete globalWritesTypes[prop]
              globalProps.splice(globalProps.indexOf(prop), 1)
            }
          })
        }

        // TODO (by MP): What if the type is an object for which myType doesn't return 'object'?
        //       E.g., an array.
        if (typeOfCurrent === "object") {
          traversedobjects.clear()
          var nestedProp = returnNestedPropNames(val)
          nestedProp.forEach((typeOfProperty, propertyName) => {
            globalWritesTypes[name + "." + propertyName] = typeOfProperty
            globalProps.push(name + "." + propertyName)
          })
          if (nestedProp.size === 0) {
            globalWritesTypes[name] = typeOfCurrent
            globalProps.push(name)
          }
        } else globalWritesTypes[name] = typeOfCurrent
      }
      /*else {
             globalProps.forEach(elem => {
             var obj;
             elem.split('.').forEach(e => {
             if (!obj) {
             obj = window[e];
             } else obj = obj[e];
             });
             if (val === obj) {
             console.log(name, val);
             }
             });
             //
             }*/
    }

    // TODO (by MP): Handle function declarations
    //       E.g., can you use the 'declare' hook, like this:

    this.declare = function (
      iid,
      name,
      val,
      isArgument,
      argumentIndex,
      isCatchParam
    ) {
      if (typeof val === "function" && window[name] === val) {
        // add to globalProps and globalWritesTypes
        globalWritesTypes[name] = myType(val)
      }
      // return {result: val};
    }

    /* TODO: To handle 'delete' of properties in objects */
    var blackSet = new Set()
    blackSet.add("navigator")
    blackSet.add("Navigator")
    blackSet.add("clientInformation")
    blackSet.add("J$")

    function findReachableAccessPath(
      base,
      alreadyVisited,
      start,
      currentAccessPath
    ) {
      if (alreadyVisited.size > 3000) {
        return false
      }
      // console.log("base = ", base /*+ ", start = ", start, ' visited: ' + alreadyVisited.size, currentAccessPath, alreadyVisited.has(start)*/);
      // console.log("start = ", start);
      // console.log("accespath = ", currentAccessPath);
      if (base === start) return currentAccessPath
      var properties = []
      properties = Object.getOwnPropertyNames(start)
      // properties.splice(properties.indexOf('*J$SID*'), 1);
      // properties.splice(properties.indexOf('*J$IID*'), 1);
      // console.log(properties.length);
      if (!alreadyVisited.has(start)) {
        for (var prop = 0; prop < properties.length; prop++) {
          alreadyVisited.add(start)
          // console.log(start);
          let propName = properties[prop]
          let accesspath
          // // For the
          if (currentAccessPath === "window") accesspath = propName
          else accesspath = currentAccessPath + "." + propName

          let typeOfStart = myType(start)

          if (blackSet.has(propName) || typeOfStart === "Arguments") continue

          try {
            var nextStart = start[propName]
            if (nextStart === null || nextStart === undefined) {
              continue
            }
          } catch (err) {
            continue
          }

          let typeOfNextStart = myType(nextStart)

          if (typeOfStart === "Function") {
            /* Functions have two special properties 'length' and 'name' which I do not want to iterate */
            if (typeOfNextStart === "String" || typeOfNextStart === "Number") {
              continue
            }
          }

          if (nextStart === base) {
            return accesspath
          } else {
            var isReachable = findReachableAccessPath(
              base,
              alreadyVisited,
              nextStart,
              accesspath
            )
            if (isReachable !== false) {
              return isReachable
            }
          }
        }
      }
      return false // The access path is not reachable
    }

    this.putField = function (iid, base, offset, val, isComputed, isOpAssign) {
      alreadyVisited.clear()
      var reachablePath = findReachableAccessPath(
        base,
        alreadyVisited,
        window,
        "window"
      )
      let typeOfCurrent = myType(val)
      if (reachablePath) {
        if (reachablePath !== "window") {
          // globalProps.push(reachablePath + '.' + offset);

          if (typeOfCurrent === "object") {
            let name = reachablePath + "." + offset
            traversedobjects.clear()
            var nestedProp = returnNestedPropNames(val)
            nestedProp.forEach((typeOfProperty, propertyName) => {
              globalWritesTypes[name + "." + propertyName] = typeOfProperty
              // globalProps.push(name + '.' + propertyName);
            })
            if (nestedProp.size === 0) {
              globalWritesTypes[reachablePath + "." + offset] = typeOfCurrent
            }
          } else globalWritesTypes[reachablePath + "." + offset] = typeOfCurrent
        }
      }

      var globalPathsToField = globalRefs(base, offset)
      for (var i = 0; i < globalPathsToField.length; i++) {
        var globalPathToField = globalPathsToField[i]
        globalWritesTypes[globalPathToField] = typeOfCurrent
        globalProps.push(globalPathToField)
      }
    }

    this.endExecution = function () {
      /* At the end of execution check again if the properties exists.
       * Some properties might get deleted in the meantime.
       * */
      for (const key in globalWritesTypes) {
        // console.log(key);
        let val = "START"
        try {
          let propertyExists = true
          key.split(".").forEach((p) => {
            if (val === "START") {
              if (window.hasOwnProperty(p)) {
                val = window[p]
              } else propertyExists = false
            } else {
              let check = false
              // val = null;
              try {
                /* For some libraryNames this fails */
                check = val && val.hasOwnProperty(p)
              } catch (err) {
                check = val && Object.keys(val).indexOf(p) !== -1
              }

              if (val && check) {
                val = val[p]
              } else propertyExists = false
            }
          })

          /* Check if the */
          if (propertyExists) {
            let typeOfCurrent = myType(val)
            if (typeOfCurrent !== globalWritesTypes[key]) {
              delete globalWritesTypes[key]
            }
          } else delete globalWritesTypes[key]
        } catch (err) {
          throw err
          // If access to the key is not possible then delete it
          // delete globalWritesTypes[key];
        }
        // console.log(val);
      }
      console.log("global writes:\n" + JSON.stringify(globalWritesTypes, 0, 2))

      sendBackToServer(globalWritesTypes)
      // console.log("Types: " + JSON.stringify(globalWritesTypes, 0, 2));

      /*            var stringData = JSON.stringify({
             result: {
             id: _LibraryInterference_libraryName, // The name of the results file for writing the global-writes
             jobID: _LibraryInterference_jobID,
             content: globalWritesTypes,
             // types: globalWritesTypes,
             typeOfTest: _TypeOfTest // The name of the directory for the writing the results of the global-writes
             }
             });
             var request = new XMLHttpRequest();
             request.open('POST', 'http://localhost:3000/reportResult', true);
             request.setRequestHeader('Content-Type', "application/json;charset=UTF-8");
             request.send(stringData);*/
    }
  }

  sandbox.analysis = new GlobalWritesAnalysis()
})(J$)
