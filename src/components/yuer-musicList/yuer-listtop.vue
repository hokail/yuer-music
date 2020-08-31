<template>
 <div class="list-top overcover" @click.stop="">
    <div class="top-left">
        <img src="../../assets/yuer-musiclist/play-list.png" alt="">
        <span>播放全部</span>
        <span v-if=" $route.path.search('player') == -1">（共{{length}}首）</span>
    </div>
    <div class="top-right" v-if=" $route.path.search('player') == -1">
        <img src="../../assets/yuer-musiclist/add-list.png" alt="">
        <span>收藏（{{mvCount(musiclist.subscribedCount)}}）</span>
    </div>
</div>
</template>

<script>
   export default {
       data(){
            return{

            }
        },
        computed: {
            musiclist(){
                return this.$store.state.musiclist
            }, 
            length(){
                let musics = this.$store.state.musiclist.trackIds
                return musics === undefined ? 0 : musics.length
                // let trackIds = this.$store.state.musiclist.trackIds
                // return trackIds === undefined ? '' : trackIds.length
            }  
        },
        methods: {
            mvCount(Count){
                return Count > 10000 ?  String(Count).slice(0,-4)+'万+' : Count
            },
        }
   }
</script>

<style>
@import '../../css/yuer-listtop.css';
</style>