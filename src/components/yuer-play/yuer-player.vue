<template>
<div id="player-bac" class="player-bac" :style="'background-image: url(' + picUrl +')' ">
    <div class="coverplayer"></div>
    <transition name="message">
         <div v-if="ismessage" class="message-box">
            <img src="../../assets/yuer-play/message.png" alt="">
            <p>别点啦，到头啦!</p>
        </div>
    </transition>
   
    <div class="audio-header overcover">
         <img class="back" src="../../assets/yuer-play/back.png"  alt="" @click="$router.go(-1)" >
         <div class="playing-name">
           <p >{{playingMusic.name}}</p> 
           <p>{{playingMusic.ar[0].name}}</p>   
         </div>
    </div>
    <div class="audio-volume overcover" id="audio-volume">
        <img src="../../assets/yuer-play/volume.png"  ref="volumeCon"   />
        <div class="volume-bar-bg" ref="volumeBarBg" @click="changeVol"> 
            <span id="volumeDot" ref="volumeDot"></span>
            <div class="volume-bar" ref="volumeBar" > </div>
        </div> 
    </div>
    <div  class="audio-wrapper "  >	
        <audio id="audioPlayer" ref="audioPlayer"  :src="url" >Your browser does not support the audio element.</audio>
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
            <img src="../../assets/yuer-play/last.png"  class="musicBtn" @click="changPlaying(-1)" />
            <img src="../../assets/yuer-play/play.png"  class="musicBtn" id="playBtn" ref="musicBtn"  @click="pause"/>
            <img src="../../assets/yuer-play/next.png"  class="musicBtn" @click="changPlaying(1)"  />
            <img src="../../assets/yuer-play/history.png"  id="history" @click="islistcover = islist  =true"/>
        </div>
    </div>	 
    <YuerPlayInfo class="overcover infoheight"/>

    <!-- 
        问题1： 给组件标签设置top过渡动画不生效

        问题2： 外层和内层都在点击后出现，外层不设过渡效果，只给内层设过渡效果，此时内层的过渡效果不生效，只有内层外层都有过渡时才生效
     -->


    <!-- 
        实现了抽屉效果

        其实就是改变元素的top值，由top:100% 变成 top:50%，再加上过渡效果 

        并且添加一层遮罩（抽屉元素显示再遮罩上，其他原本的元素显示再遮罩下），让抽屉可以通过点击遮罩层关闭

        注意：遮罩层和抽屉元素是兄弟关系，不能把抽屉写在遮罩层标签内。
        写在遮罩层标签内，会出现两种情况：
        1.不给遮罩层过渡效果，只给抽屉过渡效果。这时抽屉的过渡效果不会生效，而是跟着遮罩层一起出现，不会有动画
        2.给遮罩层过渡效果，此时抽屉给不给都一样。这样的或遮罩层也会有过渡效果，但是抽屉效果是改变top，left，right，bottom
        的值产生效果的，如果遮罩层也有过渡的话，看起来就很不舒服。遮罩层应该是瞬间出现，而没有过渡效果的。
     -->
    <div  v-if="islistcover" class="player-list-cover" @click=" islistcover = islist = false ;"></div>
 
    <transition name="listinout" >
        <div v-if="islist" class="player-list" >
            <Yuerlisttop class="player-list-top" /> 
            <Yuerlistmain  class="playerlist" /> 
        </div> 
    </transition>


   
</div>
</template>
<script>

import {isEmpty} from '../../js/isEmpty'

import {initLyric} from '../../js/initLyric'
import {scrollLyric} from '../../js/scrollLyric'

import {pauseOrPlay} from '../../js/pauseOrPlay'
import {progressBarInit} from '../../js/progressBar'

import YuerPlayInfo from './yuer-playInfo'

import Yuerlistmain from '../yuer-musicList/yuer-listmain';

import Yuerlisttop from '../yuer-musicList/yuer-listtop';


   export default { 
        components: {
            YuerPlayInfo,
            Yuerlistmain,
            Yuerlisttop
        },
       data(){ 
            return{
                /*
                    写在data中，这样点击按钮改变这个index就可以改变playingmusic。
                    因为计算属性中playingmuisc的值，与这个值有关，所以这个值改变playingmusic的值也会改变

                    由于计算属性的值只会在data中数据改变时，才会自动执行。所以如果直接改变this.$route.params.musicindex的话，不会起作用
                */
                //点击歌单列表，传过来的歌曲的在列表中的index
                musicindex:Number(this.$route.params.musicindex),   
                ismessage:false,
                islistcover:false,
                islist:false
            }
        },
        mounted () { 
            //设置初始音量
            //音量存在store中，是因为store中数据存在了sessionStroage中，这样在刷新页面后，这个volume数据也不会丢失
            this.$refs.audioPlayer.volume = this.$store.state.volume
            //添加歌词滚动的监听事件
            scrollLyric()
            //获取歌曲url和歌词
            this.getUrlLyric()
            //更新音量进度条显示
            this.refVolBar()
            //添加歌曲播放监听事件
            progressBarInit()
        },
        
        computed: {
            //这里数据从store中获取，刷新页面时，store中数据会丢失，所有刷新后会出错
            playingMusic(){
                //从传过来的参数中获取歌曲在数组中的下标，然后从数组中取出
                console.log(this.$store.state.playingmusic);
                return this.$store.state.playingmusic = this.$store.state.allmusic[this.musicindex-1];
            
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
            messagebox(){
                this.ismessage = true
                setTimeout(() => {
                    this.ismessage = false
                },2000)
            },
            changPlaying(num){
                if(this.musicindex === 1 && num === -1){
                    // 弹窗“已经是第一首了”
                    this.messagebox()
                }else if(this.musicindex === this.$store.state.allmusic.length && num === 1){
                    // 弹窗“已经是最后一首了”
                     this.messagebox()
                }else{
                    this.musicindex += num
                    //重新获取歌曲信息
                    this.getUrlLyric()
                }
               
            },

           changeVol(e){
                let per = e.offsetX / this.$refs.volumeBarBg.offsetWidth
                this.$store.state.volume =  this.$refs.audioPlayer.volume = per.toFixed(1)
                this.refVolBar()
            },

            //更新音量进度条显示
            refVolBar(){
                let per = this.$refs.audioPlayer.volume * this.$refs.volumeBarBg.offsetWidth * 1 + 'px'
                this.$refs.volumeBar.style.width = per 
                this.$refs.volumeDot.style.left = per   
            },

           
        }
   }
</script>

<style>

@import '../../css/yuer-play.css';

</style> 