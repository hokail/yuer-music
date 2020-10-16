<template>
<div id="playlists">
    <Topback/>
    <Tabs/>
    <Current/>
</div>
</template>

<script>
const Topback = () => import('../ThetTopBack' );
const Tabs = () => import('../TheTabs' );

import Current from '../yuer-playlists/yuer-playlists-tabs-scroll/yuer-playlists-current'

export default {
    data () {
        return {
            
        }
    },
    components: {
        Topback,
        Tabs,
        Current
    },
    mounted () {
        this.$store.state.type = '全部歌单'
        this.$store.dispatch('getRecommends',{limit:30,type:'全部歌单',offset:0})
        this.$store.dispatch('getTypes')
        this.$store.state.nomore = false
        this.$store.state.isbottom = false       
        this.$store.state.page = 1

    },
   
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