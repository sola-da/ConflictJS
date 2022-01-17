/**
 * Created by Jibesh Patra on 03-Apr-2017.
 */

// window.setTimeout(sendMessage, 1000)

sendMessage()
function sendMessage() {
  window.parent.postMessage(message, '*')
}
