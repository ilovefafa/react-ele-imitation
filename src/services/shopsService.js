import request from '../utils/request'

function get(limit = 5, skip = 0) {
    return request({
        url: '/api/shops/get',
        methods: 'get',
        params: {
            skip,
            limit
        }
    })
}

const shopsService = { get }

export default shopsService