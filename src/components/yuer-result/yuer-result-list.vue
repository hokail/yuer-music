<template>
    <div id="yuer-playlists">
        <div id="playlists-item" v-for="(list,index) in playlists" :key="index">
            <router-link :to="{name:'musiclist',params:{musiclistid:list.id}}">
                <img :src="list.coverImgUrl" alt="" class="musicList">
            </router-link>
            <div class="list-info">
                <p class="describeOfList" >{{list.name}}</p>
                <p class="describeOfauthor" > by. {{list.creator.nickname}}</p>
                <span>播放数：{{list.playCount}}</span>
                <!-- <span>收藏数：{{list.bookCount}}</span> -->
            </div>
        </div>
    </div>
</template>
<script>


   export default {
      
      
        mounted () {
          this.$store. state.nomore = false  
        },
        computed: {
            playlists(){
                return this.$store.state.playlists
            }
        }
   }
</script>

<style>
@import '../../css/result-list.css';
</style>