<template>
<div id="player-mv">
    <div id="playing">
        <!-- 
            在一些安卓浏览器播放视频时，不能在H5页面播放视频，系统会自动接管视频，所以要加上 webkit-playsinline playsinline
            可能由于被接管的原因，视频有时无法直接播放或播放卡顿。启动H5内核H5播放器 x5-video-player-type="h5"
        -->
         <video  webkit-playsinline playsinline x5-video-player-type="h5" controls :src="mvurl" :poster="mv.cover" ></video>
    </div>
    <div id="title">
        <img src="../../assets/imgs/recommend.png" alt="">
        <!-- 这里是子路由组件之间的传值，不是父组件向子组件串子，不能直接用props来接收，因为这个组件之间没有联系，所以不能直接传递参数 -->
        <span class="mvtitle">{{mv.name}}</span>
    </div>
    <div id="infoOfMv">
        <span>{{mvCount(mv.playCount)}}次播放</span>
        <span>发布日期：{{mv.publishTime}}</span>
    </div>
    <Yuermvbtns/>
    <hr class="splitline">
    <div id="author">
        <img src="http://p1.music.126.net/is_DVa4LXsiXUGDVopqNlQ==/109951164352818210.jpg?param=180y180" alt="">
        <span class="author-name">{{mv.artistName}}</span>   
        <div class="author-right">
            <img src="../../assets/yuer-musiclist/add-list.png" alt="">
            <p>关注</p>
        </div>
    </div>
    <hr class="boline">
</div>
</template>


<script>

import Yuermvbtns from './yuer-mvbtns'

export default {
    components: {
        Yuermvbtns
    },
    computed: {
        mv(){
            return this.$store.state.mv
        },  
        mvurl(){
            return this.$store.state.mvurl
        },  
      
    },
    mounted () {
        let mvid = this.$route.params.mvid
        //mv的热评类型为 1
        let type = 1
        this.$store.dispatch('getPlayingMV',mvid)
        this.$store.dispatch('getHotComments',{mvid,type})

    },
    methods: {
        mvCount(Count){
            return Count > 10000 ?  String(Count).slice(0,-4)+'万' : Count
        }
    }
    
}
</script>

<style>

@import '../../css/yuer-playmv.css';

</style>