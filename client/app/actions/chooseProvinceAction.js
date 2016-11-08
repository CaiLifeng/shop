

//根据定位获取所在城市
export const getCity = () => dispatch => {
    if ("geolocation" in navigator) {
        function success(position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            jsonp('http://api.map.baidu.com/geocoder/v2/?output=json&ak=' + config.baiduKey + '&pois=0&location=' + latitude + ',' + longitude, null, function (err, data) {
                if (err) {
                    alert(err.message);
                } else {
                    if (data.status == 0) {
                        dispatch(getCitySuccess(data.result.addressComponent.city));
                    }
                    else {
                        alert('定位失败');
                    }
                }
            });
        }
        function error() {
            alert('定位失败');
        }
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert('您的浏览器不支持定位');
    }
};