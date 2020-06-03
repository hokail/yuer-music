<template>
    <div id="yuer-middle">
        <rotchart/>
        <buttons/>
    </div>
</template>

<script>

import rotchart from "../components/yuer-middle-rotchart"
import buttons from "../components/yuer-middle-buttons"

export default {
    components: {
        rotchart,
        buttons
    },
    mounted () {
        //获取轮播图数据
        this.$store.dispatch('getBanner')
    },
    
}
</script>

<style>

#yuer-middle{
    overflow: hidden;
    width: 100%;
    box-shadow: 0 .032054rem .22054rem #cdcccc;
}
</style>
