/**
 * Created by Jibesh Patra on 03-Apr-2017.
 */

sendMessage()
// window.setTimeout(sendMessage, 1000)
function sendMessage() {
  window.parent.postMessage(message, '*')
}
