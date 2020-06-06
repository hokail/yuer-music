<template>
<div id="playmv">
    <div id="playing">
        <!-- 
            在一些安卓浏览器播放视频时，不能在H5页面播放视频，系统会自动接管视频，所以要加上 webkit-playsinline playsinline
            可能由于被接管的原因，视频有时无法直接播放或播放卡顿。启动H5内核H5播放器 x5-video-player-type="h5"
        -->
         <video  webkit-playsinline playsinline x5-video-player-type="h5" controls :src="mvurl" :poster="mv.cover" ></video>
    </div>
    <div id="title">
        <img src="../../assets/imgs/recommend.png" alt="">
        <!-- 这里是子路由组件之间的传值，不是父组件向子组件串子，不能直接用props来接收，因为这个组件之间没有联系，所以不能直接传递参数 -->
        <span class="mvtitle">{{mv.name}}</span>
    </div>
    <div id="infoOfMv">
        <span>{{mvCount(mv.playCount)}}次播放</span>
        <span>发布日期：{{mv.publishTime}}</span>

    </div>
    <hr class="splitline">
    <div id="author">
        <img src="http://p1.music.126.net/is_DVa4LXsiXUGDVopqNlQ==/109951164352818210.jpg?param=180y180" alt="">
        <span>{{mv.artistName}}</span>   
    </div>
    <hr class="boline">
    <div id="comments">
        <p class="comments-title">评论</p>
        <ul>
            <li v-for="(comment,index) in mvcomments" :key="index">
                <div id="comment-box">
                    <div id="comment-top">
                        <img :src="comment.user.avatarUrl" alt="" class="userPic">
                        <div id="nick">
                            <p class="nickname">{{comment.user.nickname}}</p>
                            <img v-if=" isvip(comment) === 'isvipy'" src="../../assets/imgs/vipy.png"  class="vip">
                            <img v-else-if="isvip(comment) === 'isvip'" src="../../assets/imgs/vip.png"  class="vip">
                            <p class="commentTime">2020年1月1日</p>
                        </div>
                        <div id="comment-thumb">
                            <span>{{comment.likedCount}}</span>
                            <img src="../../assets/imgs/thumb.png" alt="">
                        </div>
                    </div>
                    <p class="comment-content">{{comment.content}}</p>

                </div>
            </li>  
        </ul>
    </div>
</div>
</template>

<script>

import axios from 'axios'
axios.defaults.baseURL = '/api'

//获取Mv相关信息
const getAllOfMV = "/mv/detail?mvid="
//获取mv播放地址
const getMvById = "/mv/url?id="
//获取mv评论
const getCommentsOfMV = "/comment/mv?id="



export default {
    data () {
        return {
            //mv
            mv:{},
            //mv地址
            mvurl:'',
            //mv评论
            mvcomments:[]
            
        }
    },
    mounted () {
        let mvid = this.$route.params.mvid
        this.getPlayingMV(mvid)  
    },
    methods: {
        mvCount(Count){
            return Count > 10000 ?  String(Count).slice(0,-4)+'万' : Count
        },
        getPlayingMV(mvid){
            let that = this
            axios.all([
                axios.get(getAllOfMV  + mvid),
                axios.get(getMvById + mvid),
                axios.get(getCommentsOfMV  + mvid),
            ]).then(axios.spread(function(response1,response2,response3){
                that.mv = response1.data.data
                that.mvurl = response2.data.data.url;
                that.mvcomments = response3.data.comments
                console.log(that.mv);
                console.log(that.mvurl);
                console.log(that.mvcomments);
            }))
        },
        //判断用户是否是vip
        isvip(comment){
            let vip = comment.user.vipRights
             if( vip !== null && vip.associator !== null && vip.associator.rights === true){
                 if( vip.redVipAnnualCount === 1){
                     return 'isvipy'
                 }else if(vip.redVipAnnualCount === -1){
                    return 'isvip'
                 }
             }else{
                return 'notvip'
             }
        }
    }
    
}
</script>

<style>

@import '../../css/yuer-playmv.css';

</style>