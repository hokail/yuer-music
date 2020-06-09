export default {
    //轮播图
    banners:[],
    //推荐歌单
    recommends:[],
    //推荐MV
    recommendMVs:[],
    //MV相关信息
    infoOfMvs:[],
    //点击播放mv的id
    mvId:0,
    //点击的歌单
    musiclist:{},
    //点击歌单的全部歌曲
    allmusic:[],
    //正在播放的歌曲
    playingmusic:{},
    //播放歌曲的url
    playingurl:'',
    //播放歌曲的封面
    playingpic:'',
    //播放歌曲的歌词
    playinglyric:'',
    //歌词分割出来的时间数组
    arrTimeOfLyric:[],
    //当前歌词的下标
    currentIndex: 0,
    //当前歌词滚动条与歌曲时间对应时的所处位置
    currentPosition:0 ,
    //音量，因为store中数据存在了sessionStroage中，这样在刷新页面后，这个volume数据也不会丢失
    volume:0.6
}