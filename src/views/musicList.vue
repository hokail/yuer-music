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
        Yuerlistmain
    }
}
</script>

<style>

</style>