/**
 * Created by Jibesh Patra on 19-Dec-2016.
 */

;(function () {
  /* Take an array of libraryNames and find pairs and returns in an Array */
  function libraryPairs(libraries) {
    if (libraries.length === 1) {
      return [libraries]
    }
    let pairedArray = []
    libraries.forEach((element, index, ar) => {
      for (let i = index + 1; i < ar.length; i++) {
        if (i !== index) pairedArray.push([element, ar[i]])
      }
    })
    return pairedArray
  }

  exports.libraryPairs = libraryPairs
})()
