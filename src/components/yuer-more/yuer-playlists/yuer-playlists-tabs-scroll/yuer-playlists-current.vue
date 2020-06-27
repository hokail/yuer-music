<template>
<div class="all-playlists" @scroll="getmore" >
        <SinglePlayList  v-for="(playlist,index) in $store.state.recommends" :playlist="playlist" :key="index" />
        <Yuerloading  v-if="$store.state.isbottom && !$store.state.nomore"/>   
        <p  class="nomoreResult" v-else-if=" $store.state.isbottom && $store.state.nomore" > ~ 到底啦，别拖啦 ~</p>
</div>
</template>

<script>
import SinglePlayList from '../yuer-playlists-single'
import Yuerloading from '../../../yuer-loading' 

export default {
    data () {
        return {
            
        }
    },
    components: {
        SinglePlayList,
        Yuerloading
    },
    methods: {
        getmore(e){
            this.$store.dispatch('getmore',e)
        }
    }
}
</script>

<style>
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