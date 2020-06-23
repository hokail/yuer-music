<template>
<div id="listbytype">
    <div  class="top-back"> 
        <img class="backto" src="../../assets/yuer-more/back-black.png" @click="$router.go(-1)">
        <p>{{$route.params.type}}</p> 
    </div>
    <div class="type-playlists" @scroll="getmore">
        <SinglePlaylist  v-for="(playlist,index) in $store.state.recommends" :playlist="playlist" :key="index" />
        <Yuerloading v-if=" isbottom && !$store.state.nomore" />   
        <p  class="nomoreResult" v-else-if=" isbottom && $store.state.nomore" > ~ 到底啦，别拖啦 ~</p>
    </div>
</div>

</template>

<script>
import Yuerloading from '../yuer-loading'

import SinglePlaylist from './singleplaylist'

export default {
    components: {
        SinglePlaylist,
        Yuerloading
    },
    data(){
        return{
            isbottom:false,
            page:1
        }
    },
    mounted () {
        let type = this.$route.params.type
        this.$store.dispatch('getRecommends',{limit:30,type,offset:0})
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
#listbytype{
    position: absolute;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
}
.top-back{
    width: 100%;
    height: 8.2%;
    display: flex;
    width: 100%;
    align-items: center;
}
.backto{
    height: .8438rem;
    width: .8438rem;
    margin: 0 .36163rem;
}
.top-back > p{
    font-size: .36163rem;
}
.type-playlists{
    position: absolute;
    top: 8.2%;
    display: flex;
    flex-wrap: wrap;
    /* flex: 1; */
    height: 91.8%;
    width: 100%;
    overflow-y: scroll;
}
</style>