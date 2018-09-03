import BMap from 'BMap'
import request from '../utlis/request'

let geolocation = new BMap.Geolocation();
let getLocationAuto = () => {
    return new Promise((resolve, reject) => {
        geolocation.getCurrentPosition(function (r) {
            if (r.point.lat === 0) return resolve(false)
            if (this.getStatus() === 0) {
                var gc = new BMap.Geocoder();
                gc.getLocation(r.point, function (rs) {
                    let location = {
                        city: rs.surroundingPois[0].city,
                        title: rs.surroundingPois[0].title,
                    }
                    resolve(location)
                });
            }
            else {
                alert('failed' + this.getStatus());
                reject()
            }
        });
    })
}

function placeSuggestion(keywords, region) {
    return request({
        url: 'https://restapi.amap.com/v3/assistant/inputtips',
        methods: 'get',
        params: {
            keywords,
            ouput: 'JSON',
            city: region,
            city_limit: true,
            key: '620a9880be9de263ef4b4fea4bdce3a2',
        },
        withCredentials: false
    })
}

// function placeSuggestion(query, region) {
//     return request({
//         url: 'http://api.map.baidu.com/place/v2/suggestion',
//         methods: 'get',
//         params: {
//             query,
//             region,
//             ouput: 'json',
//             city_limit: true,
//             ak: 'T0Asl66m5GBMCODS5GHnko0Ah5awCfEG',
//             callback: 'showLocation'
//         }
//     })
// }


const mapService = { placeSuggestion, getLocationAuto }

export default mapService