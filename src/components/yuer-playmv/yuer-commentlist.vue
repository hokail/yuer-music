<template>
<div>
<ul v-if="comments.length !== 0" class="commentslist">
    <li  v-for="(comment,index) in comments" :key="index">
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
<p class="no-comments"  v-else >暂时没有更多评论</p>
</div>
</template>

<script>
   export default {
       props: {
           comments:Array
       },
        methods: {

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
        }
   }
</script>

<style>
@import '../../css/yuer-commentslist.css';
</style>