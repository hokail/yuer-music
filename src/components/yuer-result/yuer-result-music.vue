<template>
    <Yuerlistmain  class="result-music"/>
</template>

<script>
const Yuerlistmain = () => import('../yuer-musicList/yuer-listmain');

   export default {
       components: {
           Yuerlistmain
       },
        mounted () {
          this.$store. state.nomore = false  
        },
   }
</script>

<style>
#main-result > .result-music{
    width: 100%;
    top: 0;
}
</style>