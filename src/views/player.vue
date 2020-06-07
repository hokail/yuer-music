<template>
<div>
    <YuerPlayInfo/>
    <YuerPlayer/>
</div>
</template>

<script>

import YuerPlayer from '../components/yuer-play/yuer-player'
import YuerPlayInfo from '../components/yuer-play/yuer-playInfo'
   export default {
       data(){
            return{

            }
        },
        components: {
            YuerPlayer,
            YuerPlayInfo
        }
   }
</script>

<style>

</style>