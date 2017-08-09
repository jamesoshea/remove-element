//content script
let classList = ''
let collection = null

//save classList when right-click anywhere on page
document.addEventListener("contextmenu", (event) => {
  classList = event.target.classList.value
  collection = document.getElementsByClassName(classList)
}, true)

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == 'clicked') {
      //create array from collection and process it
      let collectionArr = formatCollection(collection)
      let message = {
        greeting: "selection",
        classList: classList,
        collection: collectionArr,
        url: request.url
      }
      chrome.runtime.sendMessage(message, (response) => {
      })
    }
})

//outputs an array ready to send to background.js
function formatCollection(collection) {
  let result = []
  for (var i = 0; i < collection.length; i++){
    if (collection[i].nodeName == 'IMG') {
      result.push({
        type: 'img',
        src: collection[i].src
      })
    } else if (collection[i].nodeName == 'A') {
      result.push({
        type: 'a',
        url: collection[i].href
      })
    } else if (collection[i].nodeName == 'DIV') {
      result.push({
        type: 'div',
        contents: collection[i].innerHTML
      })
    } else if (collection[i].nodeName == 'SPAN') {
      result.push({
        type: 'span',
        contents: collection[i].innerHTML
      })
    } else if (collection[i].nodeName == 'P') {
      result.push({
        type: 'p',
        text: collection[i].innerHTML
      })
    } else if (collection[i].nodeName == 'H1') {
      result.push({
        type: 'h1',
        contents: collection[i].innerHTML
      })
    } else if (collection[i].nodeName == 'H2') {
      result.push({
        type: 'h2',
        contents: collection[i].innerHTML
      })
    } else if (collection[i].nodeName == 'H3') {
      result.push({
        type: 'h3',
        contents: collection[i].innerHTML
      })
    } else if (collection[i].nodeName == 'H4') {
      result.push({
        type: 'h4',
        contents: collection[i].innerHTML
      })
    } else if (collection[i].nodeName == 'H5') {
      result.push({
        type: 'h5',
        contents: collection[i].innerHTML
      })
    } else if (collection[i].nodeName == 'H6') {
      result.push({
        type: 'h6',
        contents: collection[i].innerHTML
      })
    } else {
      result = ''
    }
  }
  return result
}
