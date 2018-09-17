function isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object;
}
Object.isObject = isObject

function simulateRequest(data, time = 200) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, time)
    })
}
window.simulateRequest = simulateRequest