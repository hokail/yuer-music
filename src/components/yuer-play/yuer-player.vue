<template>
<div class="player-bac" :style="'background-image: url(' + picUrl +')' ">
    <div class="coverplayer"></div>
    <div class="audio-header overcover">
         <img src="../../assets/yuer-play/back.png" alt="" @touchstart="$router.go(-1)" >
         <div class="playing-name">
            <p>{{playingMusic.name}}</p>
            <p>{{playingMusic.ar[0].name}}</p>
         </div>
    </div>
    <div class="audio-volume overcover" id="audio-volume">
        <img src="../../assets/yuer-play/volume.png"  ref="volumeCon"  />
        <div class="volume-bar-bg" ref="volumeBarBg"> 
            <span id="volumeDot" ref="volumeDot"></span>
            <div class="volume-bar" ref="volumeBar" >
            </div>
        </div> 
    </div>
    <div  class="audio-wrapper "  >	
        <audio id="audioPlayer" ref="audioPlayer"  autoplay :src="url" >Your browser does not support the audio element.</audio>
        <div class=" audio-progress ">
            <div class="audio-time">
                <span class="audio-length-current" id="audioCurTime">00:00</span>
                 <div class="progress-bar-bg" id="progressBarBg" >
                    <span id="progressDot"></span>
                    <div class="progress-bar" id="progressBar"></div>
                </div>
                <span class="audio-length-total" id="audioTotTime">00:00</span>
            </div> 
        </div> 
        <div class="audio-btns " id="audio-btns"> 
            <img src="../../assets/yuer-play/single.png"  id="single"/>
            <img src="../../assets/yuer-play/last.png"  class="musicBtn" />
            <img src="../../assets/yuer-play/play.png"  class="musicBtn" id="playBtn" ref="musicBtn"  @touchstart="pause"/>
            <img src="../../assets/yuer-play/next.png"  class="musicBtn"  />
            <img src="../../assets/yuer-play/history.png"  id="history" />
        </div>
    </div>	 
    <YuerPlayInfo class="overcover"/>
</div>
</template>
<script>

import {isEmpty} from '../../js/isEmpty'

import {initLyric} from '../../js/initLyric'
import {scrollLyric} from '../../js/scrollLyric'

import {pauseOrPlay} from '../../js/pauseOrPlay'
import {progressBarInit} from '../../js/progressBar'

import YuerPlayInfo from './yuer-playInfo'
   export default {
       data(){ 
            return{
               
            }
        },
        mounted () {
            //添加歌词滚动的监听事件
            scrollLyric()

            this.getUrlLyric()
            progressBarInit()
        },
        components: {
            YuerPlayInfo
        },
        computed: {
            //这里数据从store中获取，刷新页面时，store中数据会丢失，所有刷新后会出错
            playingMusic(){
                //从传过来的参数中获取歌曲在数组中的下标，然后从数组中取出
                let musicindex = this.$route.params.musicid
                return this.$store.state.playingmusic = this.$store.state.allmusic[musicindex-1];
            
            }, 
            url(){
                let url = this.$store.state.playingurl
                //可能为vip歌曲，此时不登录获取不到url
                return isEmpty(url) ? '': url
            },
            picUrl(){
                let al = this.$store.state.playingmusic.al
                //这个属性是惰性求值得到的，可能因为这样所以才会报undefined,(al和a.picUrl都是惰性求值)
                return al === undefined ? '' : al.picUrl
            }

        },
        methods: {
            async getUrlLyric(){
                let id = this.playingMusic.id
                await this.$store.dispatch('getUrlLyric',id)
                //在异步请求结束后再初始化歌词
                initLyric(this.$store.state.playinglyric)
            },
            pause(){
                pauseOrPlay()
            },
          
           
        }
   }
</script>

<style>

@import '../../css/yuer-play.css';

</style> 