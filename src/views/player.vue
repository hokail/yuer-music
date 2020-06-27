<template>
<div id="player">
    <YuerPlayer/>
</div>
</template>

<script>

import YuerPlayer from '../components/yuer-play/yuer-player'

   export default {
       name:'player',
       data(){
            return{

            }
        },
        components: {
            YuerPlayer,
        },
        mounted () {
            
        }
   }
</script>

<style>
#player{

    width: 100%;
    overflow: hidden;
}
</style>