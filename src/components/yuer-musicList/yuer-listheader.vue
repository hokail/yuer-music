<template>  
<div id="yuer-listheader"  ref="listheader" :style="'background-image: url('+ musiclist.coverImgUrl+')'">
    <div class="cover"></div>
        <div  class="header-top overcover"> 
            <img class="backto" src="../../assets/yuer-musiclist/back.png" @click="$router.go(-1)">
            <div id="list-title">  
                <p>歌单</p> 
                <p>编辑推荐：我说吼，你们说吼不吼啊</p>
            </div> 
        <router-link :to="{name:'search'}">
            <img class="searchinlist" src="../../assets/yuer-musiclist/searchinlist.png" alt="">
        </router-link> 
        </div>
        <div  class="header-middle overcover">
            <img class="list-cover" :src="musiclist.coverImgUrl" alt="">
            <div id="middle-right">
                <p>{{musiclist.name}}</p>
                <div id="list-author">
                    <img :src="creator.avatarUrl" alt="">
                    <span>{{creator.nickname}}</span>
                </div>
                <p class="introduce">{{musiclist.description}}</p>
            </div>
        </div>
        <div class="header-btns overcover">
            <div class="header-btn">
                <img src="../../assets/yuer-musiclist/commentslist.png" alt="">
                <p>{{mvCount(musiclist.commentCount)}}</p>
            </div>
            <div class="header-btn">
                <img src="../../assets/yuer-musiclist/share.png" alt="">
                <p>{{mvCount(musiclist.shareCount)}}</p>
            </div>
            <div class="header-btn">
                <img src="../../assets/yuer-musiclist/download.png" alt="">
                <p>下载</p>
            </div>
            <div class="header-btn">
                <img src="../../assets/yuer-musiclist/selectmore.png" alt="">
                <p>多选</p>
            </div>
        </div>
        <Yuerlisttop/>
    </div>
</template>

<script>



import Yuerlisttop from './yuer-listtop';

export default {
    components: {
        Yuerlisttop,
    },
    data(){
        return{

        }
    },
    computed: {
      musiclist(){
          return this.$store.state.musiclist
      },
      creator(){
          let creator = this.$store.state.musiclist.creator
          //这个属性是惰性求值得到的，可能因为这样所以才会报undefined
          return creator === undefined ? '' : creator
      },
     
    },
    mounted () {
        this.getThisMusicList()
    },
    methods: {
        mvCount(Count){
            return Count > 10000 ?  String(Count).slice(0,-4)+'万+' : Count
        },
        async getThisMusicList(){
            await this.$store.dispatch('getMusicList',this.$route.params.musiclistid)
            //保证先获取到歌单信息，再去获取歌单内的歌曲，这样刷新时才不会出错
            this.$store.dispatch('getAllMusic')   
        },
       
    }
}
</script>

<style>
 @import '../../css/yuer-listheader.css';
</style>