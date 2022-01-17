/**
 * Created by Jibesh Patra on 03-Apr-2017.
 */
function checkMessages() {
  let types = new Set()
  if (messages.size > 1) {
    messages.forEach(function (val, key) {
      let ap = val[accessPath]
      types.add(myType(ap))
    })
  }
  if (types.size > 1) {
    result_content = 'ERROR ' + [...types]
  }

  sendBackToServer()
  // window.setTimeout(sendBackToServer, 100)
}

function myType(value) {
  if (_.isArray(value)) return 'Array'
  else if (_.isFunction(value)) return 'Function'
  else if (_.isBoolean(value)) return 'Boolean'
  else if (_.isNumber(value)) return 'Number'
  else if (_.isDate(value)) return 'Date'
  else if (_.isRegExp(value)) return 'RegExp'
  else if (_.isNull(value)) return 'null'
  else if (_.isUndefined(value)) return 'undefined'
  else if (_.isString(value)) return 'String'
  else if (_.isArguments(value)) return 'Arguments'
  else if (value instanceof Map) return 'Map'
  else if (value instanceof Set) return 'Set'
  else return typeof value // If none of above then probably 'object'
}
