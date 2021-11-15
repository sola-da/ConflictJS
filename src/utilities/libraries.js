// Author: Michael Pradel, Jibesh Patra

;(function () {
  var fs = require('fs')
  var baseDir = require('process').cwd()
  let config = require('../config')
  var benchmarkBaseDir = baseDir + config.benchmarkDir

  function Library(name, urls) {
    this.name = name
    this.urls = urls
    this.libraryFiles = []
    this.instrumentedLibraryFiles = []

    for (var i = 0; i < urls.length; i++) {
      var url = urls[i]
      var urlSegments = url.split('/')
      this.libraryFiles.push(urlSegments[urlSegments.length - 1])
    }
  }

  function allLibraries() {
    var result = []
    var benchmarks = fs.readdirSync(benchmarkBaseDir).filter(function (elem) {
      return fs.lstatSync(benchmarkBaseDir + '/' + elem).isDirectory()
    })
    for (var i = 0; i < benchmarks.length; i++) {
      var benchmark = benchmarks[i]
      var benchmarkDir = benchmarkBaseDir + '/' + benchmark

      // read libInfo.json, which is required in each benchmark directory
      var rawLibraryInfo = fs.readFileSync(benchmarkDir + '/libraryInfo.json', {
        encoding: 'utf8',
      })
      var libraryInfo = JSON.parse(rawLibraryInfo)

      result.push(new Library(benchmark, libraryInfo.urls))
    }
    return result
  }

  function libraryByName(name) {
    var rawLibraryInfo = fs.readFileSync(
      benchmarkBaseDir + '/' + name + '/libraryInfo.json',
      { encoding: 'utf8' }
    )
    var libraryInfo = JSON.parse(rawLibraryInfo)
    return new Library(name, libraryInfo.urls)
  }

  exports.allLibraries = allLibraries
  exports.libraryByName = libraryByName
})()
