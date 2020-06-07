<template>
<div id="yuer-list">
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
        Yuerlistmain
    }
}
</script>

<style>
#yuer-list{
    width: 100%;
    overflow: hidden;
}
</style>