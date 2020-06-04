//歌曲时间转换为分秒的形式
export function  timeformat(length){

    //转换为int
    length = parseInt(length)
    //分
    let middle = 0

    if(length > 60) {
        middle = parseInt(length / 60)
        length = parseInt(length % 60)
    }
    
    let result = parseInt(length)

    if(length > 0 && length < 10){
        result = "0" + parseInt(length)
    }else if(length == 0){
        result = "00";
    }
    
    if(middle >= 10) {
        result = ""+parseInt(middle) + ":"+result
    }else if(middle > 0 && middle < 10){
        result = "0"+parseInt(middle)+":"+result
    }else{
        result = "00:"+result
    }
    return result
}