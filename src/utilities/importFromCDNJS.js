// Author: Michael Pradel

;(function () {
  let baseDir = require("process").cwd()
  let cdnJSFile = baseDir + "/cdnjs_libraries_20160620.json"
  const config = require("../config")
  const benchmarkDirName = config.benchmarkDir
  let fs = require("fs")

  function importAsBenchmarks(maxLibraries) {
    let cdnLibraries = JSON.parse(
      fs.readFileSync(cdnJSFile, { encoding: "utf8" })
    ).results
    let imported = 0
    for (let i = 0; i < cdnLibraries.length; i++) {
      let library = cdnLibraries[i]
      let libraryDir = baseDir + benchmarkDirName + "/" + library.name
      if (library.latest.match(/.js$/) !== null) {
        console.log("Importing " + library.name)
        fs.mkdirSync(libraryDir)
        let libraryInfo = {
          name: library.name,
          urls: [library.latest],
        }
        fs.writeFileSync(
          libraryDir + "/libraryInfo.json",
          JSON.stringify(libraryInfo, 0, 2)
        )
        imported++
      } else {
        console.log("Won't import non-JS library" + library.name)
      }
      if (imported >= maxLibraries) return
    }
  }

  importAsBenchmarks(999999)
})()
