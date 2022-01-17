// Author: Michael Pradel, Jibesh Patra

;(function () {
  let fs = require('fs')
  const pathExists = require('./pathExists.js').pathExists
  const config = require('../config')
  let express = require('express')
  let bodyParser = require('body-parser')
  const ListenToport = require('../config').serverPort

  function startServer(jobQueue) {
    let app = express()
    app.use(express.static('./'))
    app.use(
      bodyParser.json({
        limit: '100mb',
      })
    )
    app.use(
      bodyParser.urlencoded({
        limit: '100mb',
        extended: true,
      })
    )

    app.post('/debugMessage', (req, res) => {
      console.log('debug message: ', req.body.debugMessage)
    })

    app.post('/reportResult', function (request, response) {
      let result = request.body.result
      let typeofTest = result.typeofTest.replace(
        'defaultstatus',
        'defaultStatus'
      )
      // console.log("Received result " + JSON.stringify(result, 0, 2));
      if (result.generatedTests.length !== 0) {
        // Write only if the tests are generated
        let generatedTestsDir = config.resultsDirectory + '/generatedTests/'
        if (!pathExists(generatedTestsDir)) {
          fs.mkdirSync(generatedTestsDir)
        }
        fs.writeFileSync(
          generatedTestsDir + typeofTest + '.json',
          JSON.stringify(result.generatedTests, 0, 2)
        )
      }
      let summarisedResult = {}

      let resultfile = result.resultFilePath.replace(
        'defaultstatus',
        'defaultStatus'
      )
      if (pathExists(resultfile)) {
        summarisedResult = JSON.parse(
          fs.readFileSync(resultfile, { encoding: 'utf8' })
        )
      }

      // If the type of test is global-write-analysis then store only the results and not the type of test
      let gwpattern = new RegExp('w*(global-write-analysis)', 'i')
      gwpattern.test(typeofTest)
        ? (summarisedResult = result.content)
        : (summarisedResult[typeofTest] = result.content)

      fs.writeFileSync(resultfile, JSON.stringify(summarisedResult, 0, 2))
      response.send('OK')
      let jobId = typeofTest

      // console.log(
      //   'result:',
      //   decodeURIComponent(result.url),
      //   jobId,
      //   decodeURIComponent(result.url).includes(jobId)
      // )

      setTimeout(jobQueue.markDone.bind(null, jobId)) // TODO re-enable
    })

    let server = app.listen(ListenToport, function () {
      let host = server.address().address
      let port = server.address().port

      console.log('\nServer listing at http://%s:%s', host, port)
    })

    return server
  }

  exports.startServer = startServer
})()
