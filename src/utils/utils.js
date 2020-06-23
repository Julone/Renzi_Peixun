export const dateFormat =  function (time ,fmt) { 
    time = typeof time  == 'string'? new Date(time): time;
    var o = {
        "M+": time.getMonth() + 1, //月份 
        "d+": time.getDate(), //日 
        "h+": time.getHours(), //小时 
        "m+": time.getMinutes(), //分 
        "s+": time.getSeconds(), //秒 
        "q+": Math.floor((time.getMonth() + 3) / 3), // 季度
        "S": time.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)){ 
        fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o){
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return fmt;
}
export function timeAgo(time) {
    var currentTime = Date.parse(new Date());
    var dateTime = time.toString();
    var d_day = Date.parse(new Date(dateTime.replace(/-/g, "/"))) || dateTime;
    var day = Math.abs(parseInt((d_day - currentTime) / 1000 / 3600 / 24));
    var hour = Math.abs(parseInt((d_day - currentTime) / 1000 / 3600));
    var minutes = Math.abs(parseInt((d_day - currentTime) / 1000 / 60));
    var seconds = Math.abs(parseInt((d_day - currentTime) / 1000));
    if (day > 367) {
        return parseInt(day / 365) + "年前".toString();
    } else if (day > 31) {
        return parseInt(day / 30) + "月前".toString();
    } else if (day >= 2) {
        return parseInt(day) + "天前".toString();
    } else if (day > 0 && day < 2) {
        return "昨天".toString();
    } else if (hour > 0 && hour < 24) {
        return parseInt(hour) + "小时前".toString();
    } else if (minutes > 0 && minutes < 60) {
        return parseInt(minutes) + "分钟前".toString();
    } else if (seconds >= 0 && seconds < 60) {
        return parseInt(seconds) + "秒前".toString();
    }
}