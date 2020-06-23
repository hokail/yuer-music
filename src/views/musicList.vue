<template>
<div id="musiclist">
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

        }
    },
    components: {
        Yuerlistheader,
        Yuerlistmain,
    },
    mounted () {
      
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