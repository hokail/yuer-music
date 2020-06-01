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

@import '../css/yuer-miiddle.css';

</style>
