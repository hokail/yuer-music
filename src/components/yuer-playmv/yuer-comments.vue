<template>
<div id="comments" ref="comments" name="comments" @scroll="scrollToBottom">
    <hr class="boline">
    <p  class="comments-title">相似MV</p>
    <Yuermvs/>
    <hr class="boline">
    <div v-if="hotcomments.length !== 0" >
        <p  ref="hotComments" class="comments-title">热门评论</p>
        <YuerCommentsList :comments="hotcomments"/>
    </div>  
    <p ref="newComments" class="comments-title">最新评论</p>
    <YuerCommentsList :comments="newcomments"/>
    <div  class="comments-loading">
        <Yuerloading v-if=" isbottom && !$store.state.nomore"/>
        <p  class="loading" v-else-if=" isbottom && $store.state.nomore" > ~ 到底啦，别拖啦 ~</p>
    </div>  
    <BackToTop @click.native="toTop"/> 
    </div>
</template>

<script>

import YuerCommentsList from './yuer-commentlist'
import Yuerloading from '../yuer-loading'
import Yuermvs from './yuer-mvs'
import BackToTop from '../yuer-backToTop'

   export default {
       
       components: {
           Yuerloading,
           YuerCommentsList,
           Yuermvs,
           BackToTop
       },
       data(){
            return{
                page:1,
                isbottom:false
            }
        },
        mounted () {
            //把dom对象存到store中，使得其他组件可以得到这个对象，并对其进行操作
            this.$store.state.eventComment = this.$refs.hotComments !== undefined ? this.$refs.hotComments  : this.$refs.newComments 
            
            this.$store.state.nomore = false  

            this.$refs.comments.scrollTop = 0
        },
        computed: {
            newcomments(){
                return this.$store.state.newcomments
            },
            hotcomments(){
                return this.$store.state.hotcomments
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

            scrollToBottom(e){
              
                //内容高度
                let cont = e.target.scrollHeight
                //可见高度（显示在页面上的高度，外层容器的高度）
                let warp = e.target.offsetHeight
                //滚动的距离
                let scroll = e.target.scrollTop
                //内容高度 = 滚动高度 + 可见高度 ，就说当滚动到底时，scroll = cont + warp

                if(scroll !== 0){
                    this.$store.state.mvhide = false
                    e.target.style.top = '-22.7%'
                    e.target.style.height = '57.7%' 
                }else{
                    this.$store.state.mvhide = true 
                    e.target.style.top = '0' 
                    e.target.style.height = '35%'
                }
                
               if(Math.round(scroll) >= cont - warp - 1){
                    this.isbottom = true
                    let mvid = this.$route.params.mvid
                    let offset = 20 * ( this.page ++ )
                    console.log(offset);
                    this.ismore(offset,mvid)
                }   
            },
            async ismore(offset,mvid){
                await this.$store.dispatch('getNextPage',{offset,mvid}) 
                if(!this.$store.state.nomore){
                    this.isbottom = false
                }
               
            },
            toTop(){
                this.$refs.comments.scrollTop = 0
            },
            destroyed () {
                 this.$store.state.eventComment = {}
            }
        }
   }
</script>

<style>

@import '../../css/yuer-comments.css';
</style>