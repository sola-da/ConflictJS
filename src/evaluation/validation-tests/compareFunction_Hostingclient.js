/**
 * Created by jibesh on 04.04.17.
 */
function checkMessages() {
  if (!testsGenerated) {
    let generatedTests = new Map()
    if (messages.size > 1) {
      messages.forEach(function (val, key) {
        let tests = []
        try {
          tests = testGeneration.generateTests(
            [new testGeneration.APIObject('window', val, [accessPath])],
            NO_OF_TESTS,
            NO_OF_CALLS,
            true
          )
        } catch (err) {
          console.log('Test generation failed')
          tests = []
        }
        generatedTests.set(key, tests)
        generatedTestsSize.push(tests.length)
      })
    }

    // Check the number of tests generated for each library
    let testSizes = generatedTestsSize.filter((num) => {
      return num > 0
    }).length
    // If tests could not be generated for both of the libraries
    if (testSizes == 0) {
      result_content = 'NOT SURE - Tests could not be generated for both'
      window.setTimeout(sendBackToServer, 100)
    } else if (testSizes == 1) {
      // Tests could not be generated for one of the library
      result_content = 'NOT SURE - Tests could not be generated for one'
      window.setTimeout(sendBackToServer, 100)
    } else {
      messages.forEach(function (val, key) {
        generatedTests.forEach(function (tests, key_gen) {
          if (key !== key_gen) {
            /*  let test_size = tests.length;
                         if (test_size === 0) {
                         val.postMessage([], "*");
                         }*/
            tests.forEach((test) => {
              testsgen.push(test)
              val.postMessage(test, '*') // Send the test for execution
            })
            // let result = executeGeneratedTests(test);
          }
        })
      })
    }
    testsGenerated = true
    messages.clear()
  } else {
    messages.forEach(function (val, key) {
      if (key === 'ERROR') {
        // FIXME: For some error the generated tests are not going back to Server. Eg.
        // lib1: jsface
        // lib2: matreshka
        // Access path: Class

        result_content =
          key /*+ ' no. of generated tests is ' + generatedTestsSize*/
      } else testsgen = [] // Empty the generated tests if there is no error
    })
    window.setTimeout(sendBackToServer, 100)
  }
}
