<template>
<div class="player-bac">
    <div  class="audio-wrapper"  >	
        <audio id="audioPlayer" ref="audioPlayer"  autoplay  >Your browser does not support the audio element.</audio>
        <div class="audio-left"> 
            <img src="../../"  class="musicBtn" />
            <img src="../assets/imgs/play.png"  class="musicBtn" id="playBtn" ref="musicBtn" @click="pause"/>
            <img src="../assets/imgs/next.png"  class="musicBtn"  />
        </div>
        <div class=" audio-middle ">
            <p  id="playingname">musicname</p>
            <p  id="author">&nbsp;singername</p>
            <div class="progress-bar-bg" id="progressBarBg">
                <span id="progressDot"></span>
                <div class="progress-dotbar" id="progressBar">
                </div>
            </div>
            <div class="audio-time">
                <span class="audio-length-total" id="audioTotTime">/00:00</span>
                <span class="audio-length-current" id="audioCurTime">00:00</span>
            </div> 
        </div> 
        <div class="audio-right" id="volume">
            <img src="../assets/imgs/single.png"  id="single"/>
        </div>
            <img src="../assets/imgs/history.png"  id="history" />
        <div id="audio-volume" >
            <img src="../assets/imgs/volume.png"  ref="volumeCon" @click="muted" />
            <div class="volume-bar-bg" v-show="!$store.state.openHeaderPhone" @mousedown="changeVol" ref="volumeBarBg"> 
                <span id="volumeDot" ref="volumeDot"></span>
                <div class="volume-bar" ref="volumeBar" >
                </div>
            </div>
        </div>  
    </div>	
</div>
</template>


<script>


// //时间格式
// import {timeformat} from '../../js/timeFormat'

// // vue组件中引入外部js，需要使用es6模块导入的方法，不要直接引入js文件
// import {progressBarInit} from '../../js/progressBar';

// //引入按钮图片路径
// // import mutedBtn from '../../assets/imgs/mute.png'
// // import volumeBtn from '../../assets/imgs/volume.png'

// //引入歌词滚动方法
// import {scrollLyric} from '../../js/scrollLyric.js'

// import {isEmpty} from '../../js/isEmpty'

// //引入外部js控制音乐播放暂停
// import {pauseOrPlay} from '../../js/pauseOrPlay'

// //初始化歌词状态
// import {initLyric} from '../../js/initLyric'

// export default {
//      data() {
//         return {
//             isMultiSelect:false
//         }
//       },
  
//     mounted () {
//         //歌曲进度条状态变化监听
//         progressBarInit()
//         //更新音量进度条显示
//         this.refVolBar()

//         //歌词滚动变化的监听
//         //歌词滚动一共分为两个部分，第一部分是初始化歌词滚动条的状态（initLyric.js），第二部分是给audio加监听，使歌词滚动起来（scrollLyric.js）
//         scrollLyric()
//     },
//     computed: {
//         musicurl(){
//           return   this.$store.state.musicurl
//         },
//         singername(){
//             return  isEmpty(this.$store.state.singer) ? '' :  `  --   ` + this.$store.state.singer
//         },
//         CheckedAllOfHistory:{
//                 get(){
//                     //get方法是获取这个值，当和这个值有关的数据发生改变时，就通过以下的方法来获取到这个值，这里选择单个歌曲选满时，自动把全选给勾上
//                     return this.$store.getters.selectedCountOfHistory == this.$store.state.historyList.length 
//                 },
//                 //这里的value是CheckedAllOfHistory改变后的值
//                 set(value){
//                     //set方法是对这个值进行监听，当这个值发生改变时，就进行以下的操作 
//                     //监听checkedbox的值，当它的值发生改变时，就进行以下的操作
//                     this.$store.state.historyList.forEach(item => item.isSelected = value) 
//                 }
//         },
//         windowWidth(){
//                 return document.body.clientWidth
//         }

//     },
//     methods: {
//         //点击调音量
//         changeVol(e){
//             let per = e.offsetX / this.$refs.volumeBarBg.offsetWidth
//             this.$refs.audioPlayer.volume = per.toFixed(1)
//             this.refVolBar()
//         },

//         //更新音量进度条显示
//         refVolBar(){
//             let per = this.$refs.audioPlayer.volume * this.$refs.volumeBarBg.offsetWidth * 1 + 'px'
//             this.$refs.volumeBar.style.width = per 
//             this.$refs.volumeDot.style.left = per   
//         },

//         //播放暂停
//         pause(){
//            pauseOrPlay()
//         },

//         //静音
//         muted(){
//             let audioPlayer = this.$refs.audioPlayer
//             if(!audioPlayer.muted){
//                 audioPlayer.muted = true   
//                 this.$refs.volumeCon.src = mutedBtn
//             }else{
//                 audioPlayer.muted = false 
//                 this.$refs.volumeCon.src = volumeBtn
//             }
//         },

//         //点击按钮，播放下一首或上一首
//         playNextMusic( index ){
                
                
//                 let musicList = this.$store.state.musicList
 
//                 if(index < 0 || index > musicList.length - 1){
//                     return 
//                 }
//                 let musicid = musicList[index].id

//                 //记录当前播放的歌曲在搜索结果中的index，用于点击上一首和下一首按钮切换歌曲
//                 this.$store.state.musicindex = index

//                 //清空上一首歌曲的地址
//                 this.$store.state.musicurl = ''

//                 //歌曲是否正在播放
//                 this.$store.state.isPlaying = true

//                 //当前正在播放的歌曲的index，用于找到歌曲所在的li标签
//                 this.$store.state.currentPlaying = index

//                 //把歌曲添加到历史记录
//                 // this.$store.dispatch('pushInHistory',musicList[index])
               
//                 console.log(musicList[index]);
//                 this.getmusic(musicid, musicList[index])    
                
//         },

//         async getmusic(musicid,music)
//         {
//             //console.log('二二二')
//             await this.$store.dispatch('playThisMusic', musicid)
//             //console.log('三三三')
            

//             //在每次播放歌曲前，初始化歌词滚动的状态
//             initLyric(this.$store.state.musiclyric)

//             //把歌曲添加到历史记录
//             let flag = 0
//             this.$store.dispatch('pushInList',{music,flag})
//         },

//         //多选
//          multiSelect(){
//                     this.isMultiSelect = !this.isMultiSelect
//          },

//          //删除历史记录中某一条
//          deleteFromHistory(index){
//                 this.$store.state.historyList.splice(index,1)
//          },
//          //删除选中的
//          deleteAllChecked(){
//                this.$store.state.historyList = this.$store.state.historyList.filter( item => !item.isSelected)
//          },
//          //历史记录中的歌曲添加到播放列表
//          addToMyList(music){
//              let flag = 1
//              this.$store.dispatch('pushInList',{music,flag})
//          }
//     }
    
// }
</script>

<style>

@import '../css/progressbar.css';
hr{
    margin: 0;
   
}

.player-bac{
    height: 100px;
}

/* input[type=checked]自带了一些样式，类的优先级较低，不能覆盖它，因此使用id选择器覆盖它 */
#all-history  .check-history{
    height: 12px;
    width: 12px;
    border: 1px gray solid;
    margin: 0 5px 15px 15px;
}

.list-history{
	height: 500px;
	overflow-y: scroll;
}

.list-history ul li {
    height: 40px;
    border: 1px solid;
    border-image: linear-gradient(transparent,rgb(56, 55, 55),transparent) 5 0 5 0 ;
    
}

.item-history{
    display: inline-block;
    width: 200px;
    /* 文本超出时用省略号表示，需要带上overflow:hidden */
    text-overflow: ellipsis;
    overflow: hidden;
    /*让文本不会换行 */
    white-space: nowrap;
    line-height: 40px;
}

#singer-name{
    width: 100px;
    margin: 0  70px;
}

.options-history{
    position: relative;
    height: 25px;
    border: none;
    cursor: pointer;
    margin: 5px  0;
    user-select: none;
    
}

.options-history:hover{
    border: 2px solid  transparent
}

.options-history:active{
   background-image: linear-gradient(90deg,transparent,rgba(182, 180, 186, 0.6),transparent); 
}

.options-history img{
    margin-right: 5px;
}

.options-history span{
    position: relative;
    top: 1px;
    text-align: center;
    font-size: 15px;
    line-height: 20px;
}

#deleteAll-history{
    right: 20px;
    top: 10px;
    background: transparent;
}

.to-right{
    position: absolute;
    right: 0px;
    cursor: pointer;
}

.headeOfrHistory{
    position: relative;
    top: -13px;
    left: -13px;
    height: 50px;
    width: 550px;
    background: red;
    color: white;
    line-height: 50px;
    border-radius: 3px 3px 0 0;
}
.header-history{
    
    display: inline-block;
    margin: 0px 20px;
}


.footer-history{
    bottom: -13px;
    top: auto;
    line-height: 30px;
    border-radius: 0px 0px 3px 3px;
}


#checkedAll-history{
    position: relative;
    top: 2px;
    left: 27px;
}

.list-history ul li:hover {
    background-color: rgb(219, 219, 219);
}   

.list-history ul li:hover .delete-history{
    display: inline;
}
.checkedText{
    position: relative;
    left: 30px;
    line-height: 50px;
}

.activeMultiSelect{
    color: rgb(0, 0, 0);
}
.el-popper[x-placement^=top]  .popper__arrow,.el-popper[x-placement^=top] .popper__arrow::after{
  
    border-top-color: red;

}

.options{
    position: relative;
    border: none;
    background: none;
    font-size: 20px;
    transform:rotate(90deg);
    left: 10px;
    bottom: 14px;
}
.el-popover{
    min-width: 0px;
    user-select: none;
}

#audio-volume{
    display: inline;
}

@media screen and (max-width: 768px) {
    .player-bac{
        position: absolute;
        bottom: 10%;
    }
    .audio-wrapper{
        width: 18.515rem;
       
        left: .121rem;
    }
    /* .audio-wrapper::after{
        content: "";
        position: relative;
        top: -45px;
        left: -5px;
        display: block;
        width: 414px;
        height: 1px;
        background-image:linear-gradient(90deg,transparent,white,transparent);
        
    } */
   .audio-left img{
       position: relative;
        height: .844rem;
        width: .844rem;
        padding: 0rem;
        margin: 0 .482rem;
        z-index: 10;
    }
    .audio-left{
        width: 7.233rem;
        position: absolute;
        top: .723rem;
        left: .964rem;
    }
    .audio-middle{
        position: absolute;
        top: -0.723rem;
        left: .844rem;
        width: 6.509rem;
    }
    .audio-middle #playingname{
       margin-left: .844rem;
    }
    

    #progressBarBg{
        left: .844rem;
    }
   
    .audio-right #single{
        position: absolute;
        height: .482rem;
        width:.723rem;
        top: .241rem;
        left: .048rem;
        z-index: 1;
    }

    .audio-right #history{
        position: absolute;
        height: .482rem;
        width: .482rem;
        right: -3.978rem;
        top: .241rem;
    }
    #audio-volume{
        position: absolute;
        top: -14.224rem;
        left: -0.121rem;
    }
    #audio-volume .volume-bar-bg{
        position: absolute;
        top: .241rem;
        height: .048rem;
        width: 7.233rem;
        
    }
    #audio-volume .volume-bar{
        position: relative;
        top: -0.048rem;
    }
    .audio-time{
        position: relative;
        font-size: .362rem;
        top: -0.241rem;
        left: -0.482rem;
        z-index: -1;
        width: 9.041rem;
        
    }
    .audio-time span:nth-child(1){
        position: relative;
        right: 0;
    }
     .audio-time span:nth-child(2){
        position: absolute;
        left: 0;
    }
    #playBtn{
        height: 1.205rem;
        width: 1.205rem;
    }

}
</style>