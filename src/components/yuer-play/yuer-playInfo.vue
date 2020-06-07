<template>
    <div id="info">
            <div id="detail"  @click="hideself()" >
                <img :src = picurl alt="歌曲图片" class="musicPic" id="musicPic">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <p>歌曲名：佚名</p>
                <p>歌手名：佚名</p>
                <p>专辑名：佚名</p>
            </div>
           
            <!-- <div id="doc"   @click="hideself()">
                    <p>歌词</p>
                    <div id="lyricscroll">
                        <ul >
                            <li v-for="(lyric,index) in  musiclyric" :key="index">
                                <p :class="$store.state.currentIndex === index+1  ? 'lineHight' : ''">{{thelyric(lyric,index)}}</p>
                            </li>
                        </ul>
                    </div>
            </div> -->
    </div>
</template>

<script>

import defPicUrl from '../assets/imgs/huaji.jpg'
import {isEmpty} from '../js/isEmpty'



   export default {
      
       data () {
           return {
               picOrLyric:true 
           }
       },
     
        computed: {
            picurl(){
                // console.log( 111+ this.$store.state.singer);
                return !isEmpty(this.$store.state.picurl) ? this.$store.state.picurl : defPicUrl
            },
             musicname(){
                return !isEmpty(this.$store.state.musicname) ? this.$store.state.musicname : '佚名'
            },
             singer(){
                return !isEmpty(this.$store.state.singer) ? this.$store.state.singer : '佚名'
            },
             album(){
                return !isEmpty(this.$store.state.album) ? this.$store.state.album : '佚名'
            },
            //获取歌词并按句分割成数组，数组元素中包含了每一句的时间和内容
            musiclyric(){
                let alllyrics = this.$store.state.musiclyric
                return alllyrics.split('\n')
            },
            windowWidth(){
                return document.body.clientWidth
            }
            
            
        },
        methods: {
            //把歌词中的时间和内容分开,从而获取到每一句歌词的内容，因为函数有参数，而计算属性方法不能带参数，因此写在metbhods中
            thelyric(lyric){
                let p = lyric.indexOf(']')
                return  lyric.substring(p+1)
            },
            //在手机屏幕上点击隐藏封面显示歌词
            hideself(){
                if(this.windowWidth <= 768){
                    this.$store.state.picOrLyric = !this.$store.state.picOrLyric
                }
            },
           
        }
        //当druation小于下一个时间时，去掉transfroms动画，当相等时，加上动画，移动一行，然后index + 1 ，继续和下一句比较
   }
</script>

<style>
#info{
    
    height: 680px;
    width: 400px;
    text-align: center;
    position: relative;
}

#info > #detail{
    position: relative;
    top:70px
}

#info > #detail > .musicPic{
    height: 200px;
    width: 200px;
    margin: 10px;
}

#info > #doc{
    position: relative;
    top: 150px;
    text-align: center;
    height: 200px;
}
#info > #doc > #lyricscroll{
    height: 180px;
    overflow-y: scroll;
}

#doc > ul > li{
    list-style: none;
}
.lineHight{
    color: red;
}

#detail > p{
    margin: 0 0 10px;
    font-size: 14px;
}

@media screen and (max-width: 768px) {
    #info{
        width: 100%;
    }
    #info > #detail{
        width: 100%;
        top: 17%;
        
    }
    #info > #detail > .musicPic{
        height: 4.822rem;
        width: 4.822rem;
        margin: .241rem;
        
    }
    #detail > p{
        display: none;
    }
     #info > #doc{
        position: absolute;
        text-align: center;
        width: 9.981rem;  
        top: 2.411rem;
        height: 7.233rem;
        left: -0.362rem;
    }
    #info > #doc > #lyricscroll{
        height: 6.363rem;
    }
    #info > #doc   p{
        margin: 0 0 10px;
        font-size: 14px;
    }
    .musicPic{
        border-radius: 50%;
    }
    #detail > span{
        position: absolute;
        height: 4.822rem;
        width: 4.822rem;
        margin: .241rem auto;
        border-radius: 50%;
        left: 0;
        right: 0;
        background-color: rgba(65, 56, 56, 0.8);
        /* animation: wavelet 3s infinite  linear  ; */
        z-index: -1;
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
}
</style>