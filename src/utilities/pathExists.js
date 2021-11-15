/**
 * Created by jibesh on 09.09.16.
 */
;(function () {
  const fs = require("fs")

  function pathExists(path) {
    let fileExists = true
    try {
      /* Check if the file exists.
       * Using this, since fs.existsSync is deprecated.
       * fs.accessSync throws if the file does not exist
       *
       * Need node ~= 6.5.0
       * */
      fs.accessSync(path, fs.constants.F_OK)
    } catch (err) {
      fileExists = false
    }
    return fileExists
  }

  exports.pathExists = pathExists
})()
