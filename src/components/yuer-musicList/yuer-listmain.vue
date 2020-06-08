<template>
<div class="listmain">
    <ul>
        <li v-for="(music,index) in allmusic" :key="index">
            <div class="list-music">
                <span class="num">{{index + 1}}</span>
                <router-link :to="{ name:'player', params:{musicid: index + 1}}" class="toplay">
                   <div class="music-name">
                        <p>{{music.name}}</p>
                        <div class="tag-author">
                            <img class="tag" src="../../assets/yuer-musiclist/dujia.png" alt="">
                            <img class="tag" src="../../assets/yuer-musiclist/hq.png" alt="">
                            <img class="tag" src="../../assets/yuer-musiclist/sq.png" alt="">
                            <p>{{music.ar[0].name}}</p>
                        </div>
                    </div>
                </router-link>
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
              return this.$store.state.allmusic
          }  
        },
        mounted () {
            // this.$store.dispatch('getAllMusic')   
        }
     
   }
</script>

<style>
@import '../../css/yuer-listmain.css';
</style>