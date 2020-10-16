<template>
    <div id="yuer-middle" >
        <Rotchart/>
        <Buttons/>
    </div>
</template>

<script>
const Rotchart = () => import("../components/yuer-middle/yuer-middle-rotchart");
const Buttons = () => import("../components/yuer-middle/yuer-middle-buttons");

export default {
    components: {
        Rotchart,
        Buttons
    },
    mounted () {
        //获取轮播图数据
        this.$store.dispatch('getBanner')
    },
    
}
</script>

<style>

#yuer-middle{
    /* margin: 0 1.1%; */
    overflow: hidden;
    width: 100%;
    box-shadow: 0 5px .2px rgb(232, 240, 245);
}
</style>
