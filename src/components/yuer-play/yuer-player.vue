<template>
<div id="player-bac" class="player-bac" :style="'background-image: url(' + picUrl +')' ">
    <div class="coverplayer"></div>
    <transition name="message">
         <div v-if="ismessage" class="message-box">
            <img src="../../assets/yuer-play/message.png" alt="">
            <p>{{message}}</p>
        </div>
    </transition>
   
    <div class="audio-header overcover">
         <img class="back" src="../../assets/yuer-play/back.png"  alt="" @click="$router.go(-1)" >
         <div class="playing-name">
           <p >{{playingMusic.name}}</p> 
           <p>{{playingMusic.ar !== undefined ? playingMusic.ar[0].name : playingMusic.artists[0].name }}</p>   
         </div>
    </div>
    <div class="audio-volume overcover" id="audio-volume">
        <img src="../../assets/yuer-play/volume.png"  ref="volumeCon"  @click="muted" />
        <div class="volume-bar-bg" ref="volumeBarBg" @click="changeVol"> 
            <span id="volumeDot" ref="volumeDot"></span>
            <div class="volume-bar" ref="volumeBar" > </div>
        </div> 
    </div>
    <div  class="audio-wrapper "  >	
        <audio id="audioPlayer" ref="audioPlayer" autoplay  :src="url" >Your browser does not support the audio element.</audio>
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
            <img src="../../assets/yuer-play/single.png"  id="mode" ref="mode"  @click="changeplaymode"/>
            <img src="../../assets/yuer-play/last.png"  class="musicBtn" @click="changPlaying(-1)" />
            <img src="../../assets/yuer-play/play.png"  class="musicBtn" id="playBtn" ref="musicBtn"  @click="pause"/>
            <img src="../../assets/yuer-play/next.png"  class="musicBtn" @click="changPlaying(1)"  />
            <img src="../../assets/yuer-play/history.png"  id="history" @click="islist  =true"/>
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
    <div  v-if="islist" class="player-list-cover" @click=" islist = false ;"></div>
 
    <transition name="listinout" >
        <div v-if="islist" class="player-list" >
            <Yuerlisttop class="player-list-top" /> 
            <Yuerlistmain  class="playerlist-main" /> 
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

//引入图标
import muteicon from '../../assets/yuer-play/mute.png'
import volumeicon from '../../assets/yuer-play/volume.png'

import single from '../../assets/yuer-play/single.png'
import circle from '../../assets/yuer-play/circle.png'
import order from '../../assets/yuer-play/order.png'
import random from '../../assets/yuer-play/random.png'



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

                    由于计算属性的值会在data中数据改变时，才会自动执行,所以写在这里。如果直接改变this.$route.params.musicindex的话，监听不到，不会起作用
                */
                //点击歌单列表，传过来的歌曲的在列表中的index
                // musicindex: this.$route.params.musicindex,   


                ismessage:false,
                islist:false,
                modeicons:[
                    single,
                    circle,
                    order,
                    random
                ],
                message:''
            }
        },
        mounted () { 

            //在使用router跳转的时候，页面会重新渲染，勾子函数都会再次执行一次
            //利用这个，可以创建一个标识，判断当前是否在某个页面，在mounted中和beforeDestroy中，改变标识
            //表示跳转到了播放页
            this.$store.state.isplaying = true


            //设置初始音量
            //音量存在store中，是因为store中数据存在了sessionStroage中，这样在刷新页面后，这个volume数据也不会丢失
            this.$refs.audioPlayer.volume = this.$store.state.volume
            //添加歌词滚动的监听事件
            scrollLyric()
            //获取歌曲url和歌词
            this.getUrlLyric()
            //设置初始音量，更新音量进度条显示
            this.refVolBar()
            //添加歌曲播放监听事件
            progressBarInit()
            //获取当前的播放模式
            this.setmodeicon(this.$store.state.playmode)

        },
        destroyed () {
            //表示退出播放页
            this.$store.state.isplaying = false 
        }, 
        computed: {
            //这里数据从store中获取，刷新页面时，store中数据会丢失，所有刷新后会出错,存入sessionStorage
            playingMusic(){

               
                //从传过来的参数中获取歌曲在数组中的下标，然后从数组中取出
                let music = this.$store.state.playingmusic =  this.$store.state.allmusic[this.musicindex-1]
                
                //当歌曲为vip歌曲时，跳过这首歌,这个值的类型为string
                if(music.cd =='1'){
                    this.messagebox('该歌曲为VIP歌曲，请登录后再试')
                    setTimeout(()=>{
                        // this.musicindex ++
                        // this.getUrlLyric()
                    },1000)
                }
                return music
            }, 
           
            url(){
                let url = this.$store.state.playingurl
                //可能为vip歌曲，此时不登录获取不到url
                return isEmpty(url) ? '': url
            },
            picUrl(){
                //这个属性是惰性求值得到的，可能因为这样所以才会报undefined,(al和a.picUrl都是惰性求值)
                return this.$store.state.playingpic
            },
            musicindex:{
                get(){
                     return  this.$store.state.musicindex
                },
                set(val){
                    this.$store.state.musicindex = val
                }
            }  
        },
        watch: {
            /*
                修改$route.params中的数据,data中的数据不会改变，所以需要使用监听
                这里不能直接监听 this.$route.params.musicindex ,因为即使使用deep，也监听不到params中的数据变化
                只能把数据放到store中，然后在computed中获取，再用watch监听这个computed
            */
           //当播放的歌曲改变时，重新获取歌曲信息
            musicindex(){
                this.getUrlLyric()
            },
               
        },
    
        methods: {
            
            //再任何切换歌曲的操作进行后，都需要进行这一步，也就是这个函数一定要跟在musicindex改变后执行一次
            async getUrlLyric(){
                let id = this.playingMusic.id
                await this.$store.dispatch('getUrlLyric',id)
                //在异步请求结束后再初始化歌词
                initLyric(this.$store.state.playinglyric)
            },
            pause(){
                pauseOrPlay()
            },

            //显示提示消息
            messagebox(message){
                this.message = message
                this.ismessage = true
                setTimeout(() => {
                    this.ismessage = false
                },2000)
            },

            //切换歌曲
            changPlaying(num){
                if(this.musicindex === 1 && num === -1){
                    // 弹窗“已经是第一首了”
                    this.messagebox('已经是第一首了')
                }else if(this.musicindex === this.$store.state.allmusic.length && num === 1){
                    // 弹窗“已经是最后一首了”
                     this.messagebox('已经是最后一首了')
                }else{
                    this.musicindex += num
                    //重新获取歌曲信息
                    
                }
               
            },
            //改变音量
           changeVol(e){
                if(audioPlayer.muted ){
                    audioPlayer.muted = false 
                    this.$refs.volumeCon.src = volumeicon
                }
                let per = e.offsetX / this.$refs.volumeBarBg.offsetWidth
                this.$store.state.volume = this.$refs.audioPlayer.volume =  per.toFixed(1)
                this.refVolBar()
            },

            //更新音量进度条显示
            refVolBar(){
                let per = this.$refs.audioPlayer.volume * this.$refs.volumeBarBg.offsetWidth * 1 + 'px'
                this.$refs.volumeBar.style.width = per 
                this.$refs.volumeDot.style.left = per   
            },
            //静音
            muted(){
                let audioPlayer = this.$refs.audioPlayer
                if(!audioPlayer.muted){
                    audioPlayer.muted = true   
                    audioPlayer.volume = 0
                    this.$refs.volumeCon.src = muteicon
                }else{
                    audioPlayer.muted = false 
                    audioPlayer.volume = this.$store.state.volume
                    this.$refs.volumeCon.src = volumeicon
                }
                this.refVolBar()
            },



            //切换播放模式
            changeplaymode(){
                let playmode = this.$store.state.playmode
                playmode < 4 ? this.setmodeicon( playmode + 1 ) : this.setmodeicon(1)
            },

            setmodeicon(n){
                let modeicon = this.$refs.mode
                this.$store.state.playmode = n
                //改变图标n
                modeicon.src = this.modeicons[n-1]
                this.dosetmode(n)
            },

            dosetmode(n){
                let audioPlayer = this.$refs.audioPlayer
                if( n === 1 ){    
                    audioPlayer.removeEventListener('ended',this.random)
                    audioPlayer.loop = true
                }else if( n === 2 ){
                    audioPlayer.loop = false
                    audioPlayer.addEventListener('ended',this.circle)
                }else if( n === 3 ){
                    audioPlayer.removeEventListener('ended',this.circle)
                    audioPlayer.addEventListener('ended',this.order)
                }else if( n === 4 ){
                    audioPlayer.removeEventListener('ended',this.order)
                    audioPlayer.addEventListener('ended',this.random)
                }
            },

            //列表循环播放
            circle(){
                this.musicindex === this.$store.state.allmusic.length ? this.musicindex = 1 : this.musicindex ++
              
            },
            //列表随机播放
            random(){
                let length = this.$store.state.allmusic.length
                //随机获取歌曲的index
                this.musicindex = Math.floor(Math.random() * length ) + 1
             
            }, 
            //列表顺序播放
            order(){
                let audioPlayer = this.$refs.audioPlayer
                this.musicindex === this.$store.state.allmusic.length ? audioPlayer.pause() : this.musicindex ++
           
            }
        }
   }
</script>

<style>

@import '../../css/yuer-play.css';

</style> 