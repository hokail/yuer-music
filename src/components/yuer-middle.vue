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
    }
}
</script>

<style>

#yuer-middle{
    overflow: hidden;
    width: 100%;
    box-shadow: 0.04822rem 0.07233rem 0.12054rem #cdcccc;
}
</style>
