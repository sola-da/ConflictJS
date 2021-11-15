/**
 * Created by Jibesh Patra on 04-Apr-2017.
 */

window.setTimeout(sendMessage, 1000)
function sendMessage() {
  window.parent.postMessage(message, '*')
}

window.addEventListener('message', receiveMessage, true)
//      Receive message from iframes
function receiveMessage(event) {
  try {
    /*if (event.data.length === 0) {
         message = 'ERROR';
         }*/
    console.log(event.data)
    eval(event.data)
  } catch (err) {
    console.log(err)
    message = 'ERROR'
  }
  window.setTimeout(sendMessage, 100)
}
