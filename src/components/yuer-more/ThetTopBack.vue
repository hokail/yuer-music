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
    height:35px;
    width:35px;
    margin: 0 15px;
}
.top-back > p{
    font-size: 15px;
}
.more{
    position: absolute;
    top: 15px;
    right: 10px;
    width:  35px;
    box-shadow: 0  5px rgb(235, 239, 253);
}  
</style>