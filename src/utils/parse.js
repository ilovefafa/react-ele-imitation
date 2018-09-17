export function eleImg(path, size = '300x', options = []) {
    let format = path.indexOf('jpeg') !== -1 ? 'jpeg' : 'png'
    let joinOptions = []
    if (options.length !== 0) {
        joinOptions = options.join['/']
    } else {
        joinOptions = ''
    }
    let parsePath = `//fuss10.elemecdn.com/${path[0]}/${path[1]}${path[2]}/${path.slice(3)}.${format}?imageMogr/format/webp/thumbnail/${size}/${joinOptions}`
    return parsePath
}
export function formatRespone(data) {
    let parseData = {}
    Object.keys(data).forEach((item) => {
        parseData[item] = JSON.parse(data[item].body)
    })
    return parseData
}
//图片需要传参数，一次解析不合适
export function iterator(inComingData) {
    if (Object.isObject(inComingData)) {
        Object.keys(inComingData).forEach((item) => {
            if (Object.isObject(inComingData[item]) || Array.isArray(inComingData[item])) {
                iterator(inComingData[item])
            }
            if (item === 'image_path') {
                inComingData[item] = eleImg(inComingData[item])
            }
        })
    }
    if (Array.isArray(inComingData)) {
        inComingData.forEach(item => {
            iterator(item)
        })
    }
}


