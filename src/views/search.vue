<template>
<div id="search">
    <Yuersearch/>
     <div class="search-result">
        <Yuerlistmain class="result-list"/>
    </div>
</div>
</template>

<script>
import Yuerlistmain from '../components/yuer-musicList/yuer-listmain'
import Yuersearch from '../components/yuer-search'
   export default {
       components: {
            Yuersearch,
            Yuerlistmain 
       },
       data(){
            return{

            }
        }
   }
</script>

<style>
#search{
    position: absolute;
    width: 100%;
    height: 100%;
}
.search-result{
    position: absolute;
    width: 100%;
    height: 91.8%;
    top: 8.2%;
    overflow-y: scroll;
}
.search-result > .result-list{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
}
</style>