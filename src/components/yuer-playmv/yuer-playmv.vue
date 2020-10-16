<template>
<div id="player-mv" >
    <div id="playing">
        <!-- 
            在一些安卓浏览器播放视频时，不能在H5页面播放视频，系统会自动接管视频，所以要加上 webkit-playsinline playsinline
            可能由于被接管的原因，视频有时无法直接播放或播放卡顿。启动H5内核H5播放器 x5-video-player-type="h5"
        -->
        <div v-show="mvheader" class="player-mv-header" >
            <img src="../../assets/yuer-musiclist/back.png" @click="$router.go(-1)"> 
            <p>{{mv.name}}</p>
        </div>
        <video @touchstart="showHaeder" @click="showHaeder" ref="video"  webkit-playsinline playsinline x5-video-player-type="h5" controls :src="mvurl" :poster="mv.cover" ></video>
    </div>
    <transition name="mvhide">
        <div id="mv-hide" v-show="$store.state.mvhide">
            <div id="title">
                <img src="../../assets/imgs/recommend.png" alt="">
                <!-- 这里是子路由组件之间的传值，不是父组件向子组件串子，不能直接用props来接收，因为这个组件之间没有联系，所以不能直接传递参数 -->
                <span class="mvtitle">{{mv.name}}</span>
            </div>
            <div id="infoOfMv">  
                <span>{{mvCount(mv.playCount)}}次播放</span>
                <span>发布日期：{{mv.publishTime}}</span>
            </div>
            <Yuermvbtns/>
            </div>  
        </transition> 
    
    <div id="author">
        <img :src="mvartist.picUrl" alt="">
        <span class="author-name">{{mv.artistName}}</span>   
        <div class="author-right">
            <img src="../../assets/yuer-musiclist/add-list.png" alt="">
            <p>关注</p>
        </div>
    </div>
</div>
</template>


<script>
const Yuermvbtns = () => import('./yuer-mvbtns');

export default {
    data () {
        return {
            mvheader:false
        }
    },
    components: {
        Yuermvbtns
    },
    computed: {
        mv(){
            return this.$store.state.mv
        },  
        mvurl(){
            return this.$store.state.mvurl
        }, 
        mvartist(){
            return this.$store.state.mvartist
        } 
      
    },
    //当路由相同，只有传递的参数不同时，点击跳转后，页面不会刷新，这时需要监听$route，当它改变时，进入新的页面
    watch: {
      '$route':{
        deep:true,
        handler(){
            this.$router.go()
        }
      }  
    },
    mounted () {
        
        this.$store.state.mvhide = true

        this.getAllOfMv()
        this.videoControl()
    },
    methods: {
        mvCount(Count){
            return Count > 10000 ?  String(Count).slice(0,-4)+'万' : Count
        },
        async getAllOfMv(){
            let mvid = this.$route.params.mvid
            //mv的热评类型为 1
            let type = 1
            this.$store.dispatch('getHotComments',{mvid,type})
            await this.$store.dispatch('getPlayingMV',mvid)

            //获取到作者名，根据作者名找到作者信息
            let artistName = this.$store.state.mv.artistName
            this.$store.dispatch('getmvartist',artistName)
        },
        //显示mv头部的header
        showHaeder(){
            setTimeout(() => {
                 this.mvheader = true
            }, 400);
            setTimeout(() => {
                 let video = this.$refs.video
                 //如果mv暂停了，那么就不再自动让header隐藏,不暂停时才让header自动隐藏
                 if( video.paused === false ){
                    this.mvheader = false
                 }
            }, 3000);
        },
        //控制mv的header的显示隐藏
        videoControl(){
            let video = this.$refs.video
            //mv暂停时，显示header
            video.addEventListener('pause',() => {
                this.mvheader = true
            })
            //mv加载完成时（首次进入页面），显示header
             video.addEventListener('canplay',() => {
                this.mvheader = true
            })
            //mv开始播放时，隐藏header
            video.addEventListener('play',() => {
                setTimeout(() => {
                    this.mvheader = false
                }, 300);
            })
        }
    }
    
}
</script>

<style>

@import '../../css/yuer-playmv.css';

/* .mvhide-enter,.mvhide-leave-to{
    top: -35%;
}
.mvhide-enter-active,.mvhide-leave-to-active{
    transition: all 1s;
} */
</style>