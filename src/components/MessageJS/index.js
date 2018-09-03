export default function message(msg, timeout = 5000) {
    let rootNode = document.querySelector('#root')
    let messageWarpNode = document.createElement('div')
    let messageNode = document.createElement('div')
    messageWarpNode.appendChild(messageNode)
    rootNode.appendChild(messageWarpNode)
    let msgNode = document.createTextNode(msg);
    messageNode.appendChild(msgNode)
    messageWarpNode.setAttribute('class', 'message-component')
    messageNode.setAttribute('class', 'message')
    setTimeout(() => { messageNode.style.opacity = 1 }, 100)
    setTimeout(() => {
        messageNode.style.opacity = 0
        setTimeout(() => {
            messageWarpNode.parentNode.removeChild(messageWarpNode)
        }, 1000)
    }, timeout - 1000)
}
