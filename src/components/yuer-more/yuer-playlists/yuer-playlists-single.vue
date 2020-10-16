<template>
 <div id="single-playlist">
    <router-link :to="{name:'musiclist',params:{musiclistid:playlist.id}}">
    <div class="playlist-cover">
        <img v-lazy="playlist.coverImgUrl" alt="" class="playlist-img">
        <div class="playlist-playcount">
            <img src="../../../assets/imgs/mvPlayCount.png" alt="">
            <span>{{count(playlist.playCount)}}</span>
        </div>
    </div>    
    <p class="playlist-name">{{playlist.name}}</p>
    </router-link>
 </div>
</template>
<script>
export default {
    props: {
        playlist:Object
    },
    data(){
        return{

        }
    },
    methods: {
        count(playCount){
           return  playCount > 10000 ? String(playCount).slice(0,-4) + '万' : playCount
        }
    }
}
</script>

<style>
@import '../../../css/singleplaylist.css';
</style>