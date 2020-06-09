import store from '../store'

export function initLyric(value) {

    //在外部js中，可以获取到组件中的标签，不过要保证在标签渲染之后获取
    const lyricscroll = $('#lyricscroll')
    const bac = $('.bac')


    function init(){
        //重新开始播放时，初始化当前播放位置
        store.state.currentIndex = 0
        
        //歌词滚动条回到最上边
        lyricscroll.scrollTop(0)
        store.state.currentPosition = 0
    }
   

    
    //分割歌词，得到歌词的时间数组
    //因为有的歌的歌词格式不同，时间可以占的位数不同，因此分割不能用只用从a到b的方法，要根据字符串来分割，
    //可以用string的findIndex方法，找到"]"的位置，然后进行分割
    function splitLyric( ){
        let arr = new Array()
        arr = value.split('\n')
        for(let i=0;i<arr.length;i++){
            //获取某一句歌词中，时间在字符串中的位置
            let p = arr[i].indexOf(']')
            let time = arr[i].substring(1,p)
            time = time.split(':')
            arr[i] = time[0] *60 +time[1] * 1
        }
        store.state.arrTimeOfLyric = arr
    }

    //初始话滚动条状态
    init()
    //分割歌词
    splitLyric( )
}