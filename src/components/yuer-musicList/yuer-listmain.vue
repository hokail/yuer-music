<template>
<div class="listmain" @click.stop="">
    <ul>
        <li v-for="(music,index) in allmusic" :key="index">
            <div class="list-music">
                <span class="num">{{index + 1}}</span>
                <!-- <router-link :to="{ name:'player', params:{musicindex: index + 1}}" class="toplay"> -->
                   <div class="music-name " @click="gotoplay(index + 1)" >
                        <p>{{music.name}}</p>
                        <div class="tag-author">
                           
                            <img class="tag" src="../../assets/yuer-musiclist/dujia.png" alt=""> 
                            <img v-if="music.cd === '1'" class="tag" src="../../assets/yuer-musiclist/vip.png" alt=""> 
                            <!-- <img class="tag" src="../../assets/yuer-musiclist/sq.png" alt=""> -->
                            <p>{{music.ar[0].name}}</p>
                        </div>
                    </div>
                <!-- </router-link> -->
                <img v-if=" music.mv !== 0" class="mv-list" src="../../assets/yuer-musiclist/mv-list.png" alt="">
                <img class="option" src="../../assets/yuer-musiclist/option.png" alt="">
            </div>
        </li>
    </ul>
</div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = '/api'

   export default {
       data(){
            return{

            }
        },
        computed: {
          allmusic(){

              return  this.$store.state.issearch ? this.$store.state.searchresult : this.$store.state.allmusic

          }  
        },
        mounted () {
            
        },
        methods: {
            //编程式导航
            gotoplay(musicindex){
                console.log( this.$store.state.isplaying);
                // 
                //如果不再播放页，那么就跳转到播放页，否则的话，就只改变播放的歌曲
                if( this.$store.state.isplaying === false ){
                    this.$router.push({
                            name:'player',
                            params:{
                                musicindex
                            }
                    })
                }
                this.$store.state.musicindex = musicindex
            }
        }
     
   }
</script>

<style>
@import '../../css/yuer-listmain.css';
</style>