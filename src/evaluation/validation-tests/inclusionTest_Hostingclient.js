/**
 * Created by Jibesh Patra on 03-Apr-2017.
 */
function checkMessages() {
  if (messages.size > 0) {
    messages.forEach(function (_, key) {
      if (key === 'ERROR') {
        result_content = key
      }
    })
  }
  sendBackToServer()
}
