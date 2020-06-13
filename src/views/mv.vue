<template>
<div id="playmv">
    <Playmv/>
    <Comments/>
</div>
</template>

<script>

import Playmv from '../components//yuer-playmv/yuer-playmv'
import Comments from '../components/yuer-playmv/yuer-comments'
 
   export default {
     
       components: {
           Playmv,
           Comments
       }
   }
</script>

<style>
#playmv{
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>