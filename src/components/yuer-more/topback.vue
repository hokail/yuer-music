<template>
<div  class="top-back"> 
    <img class="backto" src="../../assets/yuer-more/back-black.png" @click="$router.go(-1)">
    <p v-if="istype">歌单分类</p> 
    <p v-else-if="ismvs">MV分类</p>
    <p v-else >歌单广场</p> 
    <router-link to="/main/playlists/types"  v-if=" !istype && !ismvs "> <img class="more"  src="../../assets/yuer-more/more.png" alt="" ></router-link>
    <img class="more" src="../../assets/yuer-more/more.png" alt="" v-else-if="ismvs" @click="$store.state.mvcover = true">
</div>
</template>

<script>
 export default {
        data () {
            return {
                istype:false,
                ismvs:false
            }
        },
        mounted () {
             this.istype = this.$route.path == '/main/playlists/types'
             this.ismvs = this.$route.path == '/main/mvs'
        },
        methods: {
            
        }   
   }
</script>

<style>
.top-back{
    position: absolute;
    width: 100%;
    height: 8.2%;
    display: flex;
    width: 100%;
    align-items: center;
}
.backto{
    height: .8438rem;
    width: .8438rem;
    margin: 0 .36163rem;
}
.top-back > p{
    font-size: .36163rem;
}
.more{
    position: absolute;
    top: .36163rem;
    right: .24108rem;
    width: .8438rem;
    box-shadow: 0 0 .24108rem rgb(235, 239, 253);
}  
</style>