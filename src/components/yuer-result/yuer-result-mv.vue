<template>
    <Yuermvs class="result-mvs"/>
</template>

<script>
const Yuermvs = () => import('../yuer-playmv/yuer-mvs');

   export default {
    
        components: {
            Yuermvs
        },
         mounted () {
          this.$store. state.nomore = false  
        },
   }
</script>

<style>
#main-result > .result-mvs{
    position: relative;
    width: 100%;
}
</style>