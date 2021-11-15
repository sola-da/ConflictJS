// Author: Michael Pradel, Jibesh Patra

;(function () {
  if (typeof window === 'undefined') {
    var seedrandom = require('seedrandom')
    var _ = require('underscore')
  } else {
    var _ = window._
  }

  function assert(c) {
    if (!c) throw 'Assertion violated!'
  }

  function APIObject(name, object, filter) {
    this.name = name // string
    this.object = object // object
    this.filter = filter // array of strings

    // make sure that each function (including anonymous ones) have a name
    // var objectKeys = Object.keys(object);
    var objectKeys = Object.getOwnPropertyNames(object)
    for (var i = 0; i < objectKeys.length; i++) {
      var key = objectKeys[i]
      if (typeof object[key] === 'function' && object[key].name === '') {
        Object.defineProperty(object[key], 'name', {
          value: key,
        })
      }
    }
  }

  // types: undefined, object, number, boolean, string, function -- anything else?
  function typeOf(value) {
    if (value === null) return 'null'
    return typeof value
  }

  function Test(apiObjects) {
    // static information
    this.statements = []
    this.constantPool = {} // variable identifier --> primitive value
    this.apiObjects = apiObjects
    this.lastVarCtr = 0
    // this.baseVarPool = {};

    // recorded at runtime and stored for future use
    this.varToType = {} // string --> string
  }

  Test.prototype = {
    freshVar: function () {
      return 'var' + this.lastVarCtr++
    },
    varForConstant: function (constant) {
      var varName = this.freshVar()
      this.constantPool[varName] = constant
      return varName
    },
    /*        varForBaseVar: function (baseVal) {
         var varName = this.freshVar();
         this.baseVarPool[varName] = baseVal;
         return varName;
         },*/
    execute: function () {
      // initialize variable store w/ api objects and constants
      var varStore = new VarStore(this.varToType)
      for (var i = 0; i < this.apiObjects.length; i++) {
        var apiObject = this.apiObjects[i]
        varStore.put(apiObject.name, apiObject.object)
      }
      var constantVars = Object.keys(this.constantPool)
      for (var i = 0; i < constantVars.length; i++) {
        var constantVar = constantVars[i]
        varStore.put(constantVar, this.constantPool[constantVar])
      }

      /*var baseVars = Object.keys(this.baseVarPool);
             for (var i = 0; i < baseVars.length; i++) {
             var baseVar = baseVars[i];
             varStore.put(baseVar, this.baseVarPool[baseVar]);
             }*/
      // execute one statement after the other
      var lastRelVal
      for (var i = 0; i < this.statements.length; i++) {
        var statement = this.statements[i]
        lastRelVal = statement.execute(varStore)
      }
      return lastRelVal
    },
    toString: function () {
      var result = ''

      // constants
      var constantVars = Object.keys(this.constantPool)
      for (var j = 0; j < constantVars.length; j++) {
        var constantVar = constantVars[j]
        var constant = this.constantPool[constantVar]

        var constantString =
          typeof constant === 'string' ? '"' + constant + '"' : constant
        if (Array.isArray(constant)) {
          constantString = '['
          constant.forEach((elem) => {
            if (typeOf(elem) === 'string') {
              if (constantString.length === 1)
                constantString += "'" + elem + "'"
              else constantString += ",'" + elem + "'"
            } else {
              if (constantString.length === 1) constantString += elem
              else constantString += ',' + elem
            }
          })
          constantString += ']'
        }
        if (constant && typeof constant === 'object') {
          constantString = JSON.stringify(constant)
        }
        result += 'var ' + constantVar + ' = ' + constantString + ';\n'
        // console.log(result);
      }

      // assertion functions
      result +=
        "function assertEqual(actual, expected) {\n  if (actual !== expected) {\n    throw 'Expected ' + expected + ' but found '+ actual;\n  }\n}\n"

      // statements
      for (var i = 0; i < this.statements.length; i++) {
        var statement = this.statements[i]
        result += statement + '\n'
      }
      return result
    },
    clone: function () {
      var clonedTest = new Test(this.apiObjects)
      for (var i = 0; i < this.statements.length; i++) {
        var statement = this.statements[i]
        clonedTest.statements.push(statement.clone())
      }
      clonedTest.constantPool = _.clone(this.constantPool)
      clonedTest.lastVarCtr = this.lastVarCtr
      clonedTest.varToType = JSON.parse(JSON.stringify(this.varToType))
      // clonedTest.baseVarPool = _.clone(this.baseVarPool);
      return clonedTest
    },
  }

  function VarStore(varToType) {
    this.varToVal = {}
    this.varToType = varToType
  }

  VarStore.prototype = {
    put: function (variable, val) {
      this.varToVal[variable] = val
      this.varToType[variable] = typeOf(val)
    },
    get: function (variable) {
      if (!this.varToVal.hasOwnProperty(variable))
        throw 'Undefined variable ' + variable
      return this.varToVal[variable]
    },
  }

  function Call(fct, baseVar, argVars, retVar, filter) {
    assert(typeof fct === 'function')
    this.filter = filter
    this.fct = fct
    this.baseVar = baseVar
    this.argVars = argVars
    this.retVar = retVar
  }

  Call.prototype = {
    execute: function (varStore) {
      var baseVal = varStore.get(this.baseVar) // usually the window object
      var argVals = []
      for (var i = 0; i < this.argVars.length; i++) {
        var argVar = this.argVars[i]
        argVals.push(varStore.get(argVar))
      }
      /* Call the function with argVals
       *  Say, I have generated tests for a function called foo(), assuming 'baseVal' is 'window'
       *  the following call is window.foo(argVals)
       *  Store the return value of the call in retVal
       * */
      var retVal = this.fct.apply(baseVal, argVals)
      varStore.put(this.retVar, retVal)
      return retVal
    },
    toString: function () {
      if (!this.filter) {
        console.log(this)
      }
      return (
        this.retVar +
        ' = ' +
        this.baseVar +
        '.' +
        this.filter +
        '(' +
        this.argVars.join() +
        ');'
      )
      /* Doing the following does not work for function expressions. Calling fct.name for Function expressions
             returns the wrong name.
             return this.retVar + " = " + this.baseVar + "." + this.fct.name + "(" + this.argVars.join() + ");";*/
    },
    clone: function () {
      return new Call(
        this.fct,
        this.baseVar,
        this.argVars,
        this.retVar,
        this.filter
      )
    },
  }

  function EqualityAssertion(varName, expectedValue) {
    this.varName = varName
    this.expectedValue = expectedValue
  }

  EqualityAssertion.isSupportedValue = function (val) {
    var type = typeof val
    return (
      val === val &&
      (type === 'number' ||
        type === 'boolean' ||
        type === 'string' ||
        val === undefined ||
        val === null)
    )
  }

  EqualityAssertion.prototype = {
    execute: function (varStore) {
      var actualVal = varStore.get(this.varName)
      if (actualVal !== this.expectedValue)
        throw 'Expected ' + this.expectedValue + ' but found ' + actualVal
    },
    toString: function () {
      var type = typeof this.expectedValue
      var expectedValueString
      if (
        type === 'number' ||
        type === 'boolean' ||
        this.expectedValue === undefined ||
        this.expectedValue === null
      ) {
        expectedValueString = String(this.expectedValue)
      } else if (type === 'string') {
        expectedValueString = '"' + this.expectedValue + '"'
      } else throw 'Unexpected type in an equality assertion: ' + type
      return 'assertEqual(' + this.varName + ', ' + expectedValueString + ');'
    },
    clone: function () {
      return new EqualityAssertion(this.varName, this.expectedValue)
    },
  }

  function Random(seed) {
    // initialize seedrandom so that it overwrites Math.random with deterministic PRNG
    if (typeof window === 'undefined')
      seedrandom(seed, {
        global: 'true',
      })
    else Math.seedrandom(seed)

    this.nextNb = Math.random
  }

  Random.prototype = {
    pickFromArray: function (array) {
      var index = Math.round(this.nextNb() * (array.length - 1))
      return array[index]
    },
    pickIndex: function (length) {
      return Math.round(this.nextNb() * (length - 1))
    },
  }

  function Decisions() {
    /* number and string have triple probability of getting selected */
    this.constantTypes = [
      'number',
      'number',
      'number',
      'string',
      'string',
      'string',
      'undefined',
      'null',
      'boolean',
      'boolean',
      'Array',
      'Object',
      'Array',
      'Object',
    ]

    this.charsForRandomStrings = []
    for (var charCode = 32; charCode < 126; charCode++) {
      // charCode 34 is " We do not want to include it. This generates strings for examples W" which are syntax errors
      if (
        charCode !== 34 &&
        charCode !== 46 &&
        charCode !== 92 &&
        charCode !== 47
      )
        this.charsForRandomStrings.push(String.fromCharCode(charCode))
    }
    // this.charsForRandomStrings.push("\n");
    // this.charsForRandomStrings.push("\t");
    // this.charsForRandomStrings.push("\r");
    // console.log(this.charsForRandomStrings);
    /* We might want to serialize the seed along with the generated tests in order to replicate the failure */
    var seed = Math.floor(100)
    this.r = new Random(seed)

    this.randomNumberPool = [
      Number.MIN_VALUE,
      -100,
      -1,
      0,
      100,
      Number.MAX_VALUE,
    ]

    var sizeOfRandomNumberPool = 30
    while (this.randomNumberPool.length !== sizeOfRandomNumberPool) {
      this.randomNumberPool.push(Math.floor(this.r.nextNb() * 1000))
    }
    // console.log(this.randomNumberPool);
  }

  Decisions.prototype = {
    pickFunction: function (apiObject) {
      var fcts = []
      var filter = apiObject.filter[0]
      var filterSegements = filter.split('.')

      // var keys = Object.keys(apiObject.object);
      var keys = Object.getOwnPropertyNames(apiObject.object)
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        var val = apiObject.object[key]
        if (
          typeof val === 'function' &&
          (apiObject.filter === undefined ||
            apiObject.filter.indexOf(key) !== -1)
        ) {
          fcts.push(val)
        }
        /**
         * In certain cases the function to be picked is a nested Object (access path)
         * Eg. window.obj1.obj2.obj3 or Number.prototype.round
         *
         * The following code extracts these functions
         */
        if (key === filterSegements[0] && filterSegements.length > 1) {
          var constructedMultiSegmentValue = apiObject.object
          filterSegements.forEach(function (seg) {
            constructedMultiSegmentValue = constructedMultiSegmentValue[seg]
          })
          if (
            constructedMultiSegmentValue &&
            typeof constructedMultiSegmentValue === 'function'
          ) {
            // If the function is anonymous, give it the name of accesspath
            if (constructedMultiSegmentValue.name === '') {
              Object.defineProperty(constructedMultiSegmentValue, 'name', {
                value: filter,
              })
            }
            fcts.push(constructedMultiSegmentValue)
          }
        }
      }

      return this.r.pickFromArray(fcts)
    },
    pickNbArguments: function (fct) {
      /* TODO: Currently I am generating tests using the number of arguments I have seen in the original function. I might want to change it.
       *  Round(A random number * 2) = 0 or 1 or 2
       * */
      var numberOfArguments = fct.length
      return Math.round(this.r.nextNb() * numberOfArguments)
    },
    pickArgument: function (test) {
      // 50-50 chance to use existing value (if any) or a new value
      var vars = Object.keys(test.varToType)
      if (vars.length > 0 && this.r.nextNb() < 0.5) {
        return this.r.pickFromArray(vars)
      } else {
        var constant = this.pickRandomConstant()
        return test.varForConstant(constant)
      }
    },
    pickRandomConstant: function () {
      var type = this.r.pickFromArray(this.constantTypes)
      switch (type) {
        case 'boolean':
          return this.pickRandomBoolean()
        case 'string':
          return this.pickRandomString()
        case 'number':
          return this.pickRandomNumber()
        case 'undefined':
          return undefined
        case 'null':
          return null
        case 'Array':
          return this.pickRandomArray()
        case 'Object':
          return this.pickRandomObject()
      }
      throw 'Should never be reached.'
    },
    pickRandomBoolean: function () {
      if (this.r.nextNb() < 0.5) return true
      else return false
    },
    pickRandomObject: function () {
      var obj = {}
      var objSize = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      var length = this.r.pickFromArray(objSize)
      var prop, val
      while (Object.keys(obj).length !== length) {
        if (this.r.nextNb() < 0.5) prop = this.pickRandomString()
        else prop = this.pickRandomNumber()

        if (this.r.nextNb() < 0.5) val = this.pickRandomString()
        else val = this.pickRandomNumber()
        obj[prop] = val
      }
      // console.log(obj);
      return obj
    },
    pickRandomArray: function () {
      var randomArray = []
      var arrayLengths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      var length = this.r.pickFromArray(arrayLengths)
      var PossibleArrayTypes = ['string', 'number', 'both']
      var arrayType = this.r.pickFromArray(PossibleArrayTypes)
      if (arrayType === 'string') {
        while (randomArray.length != length) {
          var randomString = this.pickRandomString()
          while (randomString.length === 0 || randomString.indexOf("'") !== -1)
            randomString = this.pickRandomString()
          randomArray.push(randomString)
        }
      } else if (arrayType === 'number') {
        while (randomArray.length != length)
          randomArray.push(this.r.pickFromArray(this.randomNumberPool))
      } else if (arrayType === 'both') {
        while (randomArray.length != length) {
          if (this.r.nextNb() < 0.5) {
            randomArray.push(this.r.pickFromArray(this.randomNumberPool))
          } else {
            randomString = this.pickRandomString()
            while (
              randomString.length === 0 ||
              randomString.indexOf("'") !== -1
            )
              randomString = this.pickRandomString()
            randomArray.push(randomString)
          }
        }
      }
      // console.log(randomArray);
      if (!Array.isArray(randomArray)) {
        throw 'Not Array'
      }
      return randomArray
    },
    /*pickaFunction: function () {
         return function () {

         }
         },*/
    pickRandomString: function () {
      var s = ''
      while (this.r.nextNb() < 0.5) {
        s += this.r.pickFromArray(this.charsForRandomStrings)
      }
      return s
    },
    pickRandomNumber: function () {
      // 50-50 chance to pick from pre-defined pool of numbers or purely random
      if (this.r.nextNb() < 0.5) {
        return this.r.pickFromArray(this.randomNumberPool)
      } else {
        return Number.MAX_VALUE * this.r.nextNb()
      }
    },
  }

  var decisions = new Decisions()

  function ExtendTestTask(test) {
    this.test = test
    this.description = '(generic task description to be replaced by subtypes)'
  }

  ExtendTestTask.prototype = {
    perform: function () {
      for (var tries = 0; tries < 100; tries++) {
        var candidateTest = this.createCandidate()

        if (candidateTest === 'NO_TEST_GENERATED') {
          break
        }
        try {
          if (candidateTest !== 'NO_TEST_GENERATED') {
            candidateTest.execute()
          }
        } catch (e) {
          // console.log("\nCandidate test failed: \n" + candidateTest);
          console.log('Will try again..')
          continue // try again
        }
        return candidateTest
      }
      if (candidateTest !== 'NO_TEST_GENERATED') {
        // throw "Failed to execute task: " + this.description;
      }
    },
  }

  function AppendAPICallTask(test) {
    ExtendTestTask.call(this, test)
    this.description = 'Extend test with API call'
  }

  AppendAPICallTask.prototype = Object.create(ExtendTestTask.prototype)
  AppendAPICallTask.constructor = AppendAPICallTask

  AppendAPICallTask.prototype.createCandidate = function () {
    var candidateTest = this.test.clone()
    var apiObjectIndex = decisions.r.pickIndex(candidateTest.apiObjects.length)
    var apiObject = candidateTest.apiObjects[apiObjectIndex]
    var fct = decisions.pickFunction(apiObject)
    /* Some times it is not possible to pick the function because it is unavailable.
     * This may be because the function is browser specific.
     * If could not pick function then skip generating tests for it.
     * The generated tests file will be empty
     * */
    if (!fct) {
      return 'NO_TEST_GENERATED'
    }
    var retVar = candidateTest.freshVar()
    var argVars = []
    var nbArgs = decisions.pickNbArguments(fct)
    for (var argIdx = 0; argIdx < nbArgs; argIdx++) {
      argVars.push(decisions.pickArgument(candidateTest))
    }
    /*  Usually, the baseVar is always windows. This results in a lot of failed tests getting created
     *  To prevent this, adding more types of baseVar
     * */
    /*        var array = decisions.pickRandomArray();
         candidateTest.varForBaseVar(array);
         var num = decisions.pickRandomNumber();
         candidateTest.varForBaseVar(num);
         var str = decisions.pickRandomString();
         candidateTest.varForBaseVar(str);
         var baseVars = Object.keys(candidateTest.baseVarPool);
         baseVars.push(apiObject.name);
         var pickedBaseVar = decisions.r.pickFromArray(baseVars);*/

    // var baseVars = [apiObject.name, array, num, str];
    // var pickedBaseVar = decisions.r.pickFromArray(baseVars);

    // console.log(apiObject);
    var call = new Call(
      fct,
      apiObject.name,
      argVars,
      retVar,
      apiObject.filter[0]
    )
    candidateTest.statements.push(call)
    return candidateTest
  }

  /**
   *
   * @param apiObjects - The apiObject that contains the function for which tests needs to be generated
   * @param maxNbTests - No. of tests that needs to be generated
   * @param maxNbCallsPerTest - No. of calls per test
   * @param {Boolean} asStrings - Specifies if the tests should be returned as strings
   * @return {Array}
   */
  function generateTests(apiObjects, maxNbTests, maxNbCallsPerTest, asStrings) {
    var tests = []
    console.log('Will generate ' + maxNbTests + ' tests')
    for (var nbTests = 0; nbTests < maxNbTests; nbTests++) {
      var test = new Test(apiObjects) // the empty test object with apiObject appended

      for (var nbCalls = 0; nbCalls < maxNbCallsPerTest; nbCalls++) {
        // append API call
        test = new AppendAPICallTask(test).perform()
        if (!test) {
          break
        }
        // console.log("Test is now:\n" + test);

        // append assertions about new API call's return value
        var newCallsRetVar = _.last(test.statements).retVar
        var newCallsRetVal = test.execute() // should we avoid re-executing the test here?
        // console.log(newCallsRetVal);
        if (EqualityAssertion.isSupportedValue(newCallsRetVal)) {
          test.statements.push(
            new EqualityAssertion(newCallsRetVar, newCallsRetVal)
          )
        }
      }
      if (test) {
        tests.push(test)
      }
    }

    if (asStrings) {
      var testsAsString = []
      for (var i = 0; i < tests.length; i++) {
        var test = tests[i]
        testsAsString.push(test.toString())
      }
      return testsAsString
    } else {
      return tests
    }
  }

  // ------------------------- for testing ------------------------
  if (0) {
    var myAPI = new APIObject(
      'myAPI',
      {
        foo: function (a, b) {
          //console.log("foo called with " + a + " and " + b);
          if (a > 5) throw 'error'
          return a + b
        },
        other: function () {},
        other2: function () {},
        other3: function () {},
      },
      ['foo']
    )

    var myAPI2 = new APIObject(
      'myAPI2',
      {
        bar: 23,
        baz: function (a, b, c, d, e) {
          if (Array.isArray(a)) {
            return a.length
          }
          return 2 * a * b
        },
      },
      ['baz']
    )

    var tests = generateTests([myAPI2], 10, 10, true)
    for (var i = 0; i < tests.length; i++) {
      var test = tests[i]
      console.log('\nTest ' + i + ':\n' + test)
      // test.execute();
    }
  }
  // ------------------------- end of testing ------------------------

  if (typeof window === 'undefined') {
    // node.js export
    exports.generateTests = generateTests
  } else {
    window.testGeneration = {
      APIObject: APIObject,
      generateTests: generateTests,
    }
  }
})()
