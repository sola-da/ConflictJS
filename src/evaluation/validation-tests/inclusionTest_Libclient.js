/**
 * Created by Jibesh Patra on 03-Apr-2017.
 */

window.onerror = function (e) {
  message = "ERROR";
};
window.setTimeout(sendMessage, 1000);
function sendMessage() {
  window.parent.postMessage(message, "*");
}
