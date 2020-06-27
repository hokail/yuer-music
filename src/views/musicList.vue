<template>
<div id="musiclist" @scroll="getmore">
    <Yuerlistheader/>
    <Yuerlistmain/>
</div>
</template>

<script>


import Yuerlistheader from '../components/yuer-musicList/yuer-listheader';
import Yuerlistmain from '../components/yuer-musicList/yuer-listmain';


export default {
    data(){
        return{
              page:1,
        }
    },
    components: {
        Yuerlistheader,
        Yuerlistmain,
    },
    mounted () {

    },
    methods: {
        getmore(e){
            let cont = e.target.scrollHeight
            let wrap = e.target.offsetHeight
            let scroll = e.target.scrollTop
            // -1的目的是排除四舍五入的误差
            if( Math.round(scroll) >= cont - wrap -1){
                console.log('1111111');
                let length = this.$store.state.musiclist.trackIds.length  
                //当此次请求的起始下标已经大于歌曲数量数组的长度，就是已经全部取出了，那么就不再进行请求了
                if(20*this.page <= length){  
                    let page = ++ this.page 
                    this.$store.dispatch('getAllMusic',{page})
                }
             
            }
        },
    }

}
</script>

<style>
#musiclist{
    position: absolute;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
}
</style>