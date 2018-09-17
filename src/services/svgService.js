import request from '@/utils/request'

export default async function getSvg(url, name) {
    if (document.querySelector(`div[name=dynamic-import-svg-${name}]`)) {
        return
    }
    let res = await request({
        url: url,
        method: 'get',
        header: {
            'Accept': 'image/*'
        }
    })
    let headNode = document.querySelector('head')
    let divNode = document.createElement('div')
    divNode.innerHTML = res
    divNode.setAttribute('name', `dynamic-import-svg-${name}`)
    headNode.appendChild(divNode)
}


