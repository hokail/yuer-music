<template>
<div id="playlists">
    <Topback/>
    <Tabs/>
    <div class="all-playlists" @scroll="getmore" >
        <SinglePlaylist  v-for="(playlist,index) in $store.state.recommends" :playlist="playlist" :key="index" />
        <Yuerloading  v-if="$store.state.isbottom && !$store.state.nomore"/>   
        <p  class="nomoreResult" v-else-if=" $store.state.isbottom && $store.state.nomore" > ~ 到底啦，别拖啦 ~</p>
    </div>
</div>
</template>

<script>

import Topback from './topback'
import Tabs from './tabs' 
import SinglePlaylist from './singleplaylist'
import Yuerloading from '../yuer-loading'

export default {
    data () {
        return {
            
        }
    },
    components: {
        Topback,
        Tabs,
        SinglePlaylist,
        Yuerloading
    },
    mounted () {
        this.$store.state.type = '全部歌单'
        this.$store.dispatch('getRecommends',{limit:30,type:'全部歌单',offset:0})
        this.$store.dispatch('getTypes')
        this.$store.state.nomore = false
        this.$store.state.isbottom = false       
        this.$store.state.page = 1

    },
    methods: {
        getmore(e){
            this.$store.dispatch('getmore',e)
        }
    }
}
</script>

<style>
#playlists{
    position: absolute;
    height: 100%;
    width: 100%;
    /* overflow: hidden; */
}
.all-playlists{
    /* 头部的高度为17.2,所以要设置绝对定位，top:17.2% */
    position: absolute;
    top: 17.2%;
    display: flex;
    flex-wrap: wrap;
    /* flex: 1; */
    height: 82.8%;
    width: 100%;
    overflow-y: scroll;
}
</style>