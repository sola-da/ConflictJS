/**
 * Created by Jibesh Patra on 03-Apr-2017.
 */

window.onerror = function (e) {
  message = 'ERROR'
}

window.parent.postMessage(message, '*')
