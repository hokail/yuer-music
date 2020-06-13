<template>
<div id="comments" @scroll="scrollToBottom">
        <p class="comments-title">精彩评论</p>
        <ul>
            <li v-for="(comment,index) in mvcomments" :key="index">
                <div id="comment-box">
                    <div id="comment-top">
                        <img :src="comment.user.avatarUrl" alt="" class="userPic">
                        <div id="nick">
                            <p class="nickname">{{comment.user.nickname}}</p>
                            <img v-if=" isvip(comment) === 'isvipy'" src="../../assets/imgs/vipy.png"  class="vip">
                            <img v-else-if="isvip(comment) === 'isvip'" src="../../assets/imgs/vip.png"  class="vip">
                            <p class="commentTime">{{dateformat(comment.time)}}</p>
                        </div>
                        <div id="comment-thumb">
                            <span>{{comment.likedCount}}</span>
                            <img src="../../assets/imgs/thumbno.png" alt="">
                        </div>
                    </div>
                    <p class="comment-content">{{comment.content}}</p>
                </div>
            </li>  
        </ul>
        <div class="comments-loading">
            <Yuerloading v-if=" isbottom && !$store.state.nomore"/>
            <p  class="loading" v-else-if=" isbottom && $store.state.nomore" > ~ 到底啦，别拖啦 ~</p>
        </div> 
        
    </div> 
</template>

<script>

import Yuerloading from '../yuer-loading'
   export default {
       
       components: {
           Yuerloading
       },
       data(){
            return{
                page:0,
                isbottom:false
            }
        },
        mounted () {
           this.$store.state.nomore = false  
        },
        computed: {
            mvcomments(){
                return this.$store.state.mvcomments
            }
        },
        methods: {
            mvCount(Count){
                return Count > 10000 ?  String(Count).slice(0,-4)+'万' : Count
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
            },

            //也可以使用第三方库moment.js来处理
            dateformat(val) {
                let date = new Date(Number(val))
                let currentdate = new Date()
                let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
                let muinte = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()	

                //同年的话就不显示年份了
                if (date.getFullYear() === currentdate.getFullYear()){
                    return  month + "月" +  date.getDate() + '日 ' + hour + ":" + muinte 	  
                }
                //不同年不显示时分秒
                return date.getFullYear() + "年" + month + "月" + date.getDate() + '日 ' 
            },
            scrollToBottom(e){
              
                //内容高度
                let cont = e.target.scrollHeight
                //可见高度（显示在页面上的高度，外层容器的高度）
                let warp = e.target.offsetHeight
                //滚动的距离
                let scroll = e.target.scrollTop
                //内容高度 = 滚动高度 + 可见高度 ，就说当滚动到底时，scroll = cont + warp
                //这里一开始没理解，以为滚动的距离就应该是内容的高度。然后想了想，其实这就好比做电梯，从3楼到1楼，移动的距离其实只有2层楼高，但3楼的高度，是移动的高度，在加上一层楼的高度，这里一层楼高，就是一个视窗的高度
                if(Math.round(scroll) >= cont - warp){
                    this.isbottom = true
                    setTimeout(() => {
                        let mvid = this.$route.params.mvid
                        let offset = 20 * (  ++ this.page)
                        this.ismore(offset,mvid)
                    }, 300);
                   
                }
            },
            async ismore(offset,mvid){
                await this.$store.dispatch('getNextPage',{offset,mvid}) 
                if(!this.$store.state.nomore){
                    this.isbottom = false
                }
               
            }
        }
   }
</script>

<style>

@import '../../css/yuer-comments.css';
</style>