<template>
<div id="playerBottom">
    <img class="playerBottom-left" :src="picUrl" alt="">
    <div class="playerBottom-middle">
        <p>{{name}}</p>
        <p>{{artist}}</p>   
    </div>
    <img id="playBtnBto" class="playerBottom-right" src="../assets/yuer-play/playb.png" @click.stop="pause">
</div>
</template>

<script>

import {pauseOrPlay} from '../js/pauseOrPlay'
import MusicTemp from '../assets/imgs/music-temp.png';

   export default {
       data(){
            return{

            }
        },
        computed: {
            picUrl(){
                //这个属性是惰性求值得到的，可能因为这样所以才会报undefined,(al和a.picUrl都是惰性求值)
                return this.$store.state.playingmusic.id === undefined ? MusicTemp : this.$store.state.playingpic
            },
            name(){
                // console.log(object);
                return this.$store.state.playingmusic.id === undefined ? "一首好听的歌" : this.$store.state.playingmusic.name
            },
            artist(){
                if(this.$store.state.playingmusic.id === undefined){
                    return '...'
                }
                return this.$store.state.playingmusic.ar !== undefined ? this.$store.state.playingmusic.ar[0].name : this.$store.state.playingmusic.artists[0].name   
            }
        },
        methods: {
            pause(){
                pauseOrPlay()
            }
        }
   }
</script>

<style>
#playerBottom{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    z-index: 12;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.playerBottom-left{
    height: 40px;
    width: 40px;
    border-radius: 20px;
}
.playerBottom-middle{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 250px;
}
.playerBottom-middle p{
    margin: 2px 0;
}
.playerBottom-middle p:nth-child(1){
    font-size: 15px;
}
.playerBottom-middle p:nth-child(2){
    font-size: 10px;
    color: gray;
}
.playerBottom-right{
    height: 30px;
    width: 30px;
}
</style>