<template>
<div id="yuer-bottom">
    <div id="cards-header">
        <p class="title">热门歌单</p>
        <router-link to="/main/playlists"><p class="title ground">歌单广场</p></router-link>
    </div> 
    <hr class="splitline">
    <div id="yuer-recomends">
       <div id="recommend-item" v-for="(recommend,index) in recommends" :key="index">
            <router-link :to="{name:'musiclist',params:{musiclistid:recommend.id}}"><img :src="recommend.coverImgUrl" alt="" class="musicList"></router-link>
            <p class="describeOfList" >{{recommend.name}}</p>
            <p class="describeOfauthor" > by. {{recommend.creator.nickname}}</p>
        </div>
    </div>
</div>
</template>

<script>


export default {
    data(){
        return{

        }
    },
    mounted () {
        this.$store.dispatch('getRecommends',{limit:6,type:'华语',offset:0})
    },
    computed: {
        recommends(){
            return this.$store.state.recommends
        }
    }
} 
</script>

<style>
@import '../css/yuer-bottom.css';
#yuer-bottom > .title{
    display: inline-block;
}

</style>
