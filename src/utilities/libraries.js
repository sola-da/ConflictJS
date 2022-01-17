// Author: Michael Pradel, Jibesh Patra

;(function () {
  let fs = require('fs')
  let baseDir = require('process').cwd()
  let config = require('../config')
  let benchmarkBaseDir = baseDir + config.benchmarkDir

  function Library(name, urls) {
    this.name = name
    this.urls = urls
    this.libraryFiles = []
    this.instrumentedLibraryFiles = []

    for (let i = 0; i < urls.length; i++) {
      let url = urls[i]
      let urlSegments = url.split('/')
      this.libraryFiles.push(urlSegments[urlSegments.length - 1])
    }
  }

  function allLibraries() {
    let result = []
    let benchmarks = fs.readdirSync(benchmarkBaseDir).filter(function (elem) {
      return fs.lstatSync(benchmarkBaseDir + '/' + elem).isDirectory()
    })
    for (let i = 0; i < benchmarks.length; i++) {
      let benchmark = benchmarks[i]
      let benchmarkDir = benchmarkBaseDir + '/' + benchmark

      // read libInfo.json, which is required in each benchmark directory
      let rawLibraryInfo = fs.readFileSync(benchmarkDir + '/libraryInfo.json', {
        encoding: 'utf8',
      })
      let libraryInfo = JSON.parse(rawLibraryInfo)

      result.push(new Library(benchmark, libraryInfo.urls))
    }
    return result
  }

  function libraryByName(name) {
    let rawLibraryInfo = fs.readFileSync(
      benchmarkBaseDir + '/' + name + '/libraryInfo.json',
      { encoding: 'utf8' }
    )
    let libraryInfo = JSON.parse(rawLibraryInfo)
    return new Library(name, libraryInfo.urls)
  }

  exports.allLibraries = allLibraries
  exports.libraryByName = libraryByName
})()
