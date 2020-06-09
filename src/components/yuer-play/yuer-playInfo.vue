<template>
<div id="info">
    <div id="detail" v-show="isPic" @touchstart="hideself()" >
        <img :src="picUrl" alt="歌曲图片" class="musicPic" id="musicPic">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div id="doc"  >
        <div id="lyricscroll" v-show="!isPic" @touchstart="hideself()">
            <ul id="lyricUl">
                <li v-for="(item,index) in lyric" :key="index">
                    <p class="lyric" :class=" $store.state.currentIndex == index + 1 ? 'lineheight':''  " >{{thelyric(item)}}</p>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>

   export default {
       data(){
            return{
                isPic:true
            }
        },
        mounted () {
            
            
        },
        computed: {
            lyric(){ 
                return this.$store.state.playinglyric.split('\n')
            },
            picUrl(){
                return this.$store.state.playingmusic.al.picUrl
            },  
        },
        methods: {     
            //把歌词中的时间和内容分开,从而获取到每一句歌词的内容，因为函数有参数，而计算属性方法不能带参数，因此写在metbhods中
            thelyric(lyric){
                let p = lyric.indexOf(']')
                return  lyric.substring(p+1)
            },
            //在手机屏幕上点击隐藏封面显示歌词
            hideself(){
                console.log('用了');
                this.isPic = !this.isPic
            }, 
        }

   }
</script>

<style>
#info{
    position: relative;
    width: 100%;
}

#detail,#doc{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
#detail{
    z-index: 2;
    height:4.82169rem;
    width: 4.82169rem;
}
#doc{
    z-index: 1;
    text-align: center;
    width: 100%;
    height: 70%;
}
#lyricscroll{
    overflow-y: scroll;
    overflow: hidden;
    height: 100%;
}
.lyric{
    color: white;
    font: 14px/30px "微软雅黑";
}
.musicPic{
    position: absolute;
    width: 4.82169rem;
    height: 4.82169rem;
    border-radius: 50%;
    z-index: 2;
}

.lineheight{
    color: red;
}


#detail > div{
    position: absolute;
    width: 4.82169rem;
    height: 4.82169rem;
    border-radius: 50%;
    background-color: rgba(65, 56, 56, 0.8);
    z-index: 1;
    /* animation: wavelet 3s infinite  linear  ; */
}
#detail > span:nth-child(2){
    animation-delay: 1.5s;
}
    #detail > span:nth-child(3){
    animation-delay: 4.5s;
}
    #detail > span:nth-child(4){
    animation-delay: 7.5s;
}

@keyframes wavelet {
    0%{
        transform: scale(1);
        opacity: 0.8;
    }
    
    100%{
        transform: scale(1.5);
        opacity: 0;
    }
}

@keyframes rotatePic {
    0%{
        transform: rotate(0);
        opacity: 0.8;
    }
    
    100%{
        transform: rotate(360deg);
        
    }
}
</style>