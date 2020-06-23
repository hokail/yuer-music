<template>
  <div class="mv-btns ">
            <div class="mv-btn">
                <img src="../../assets/yuer-mv/mv-thumbs.png" alt="">
                <p>{{mvCount(mv.likedCount)}}</p>
            </div>
            <div class="mv-btn">
                <img src="../../assets/yuer-mv/mv-collect.png" alt="">
                <p>{{mvCount(mv.subCount)}}</p>
            </div>
            <div class="mv-btn">
                <img src="../../assets/yuer-mv/mv-comment.png" alt="" @click="toComments">
                <p>{{mvCount(mv.commentCount)}}</p>
            </div>
            <div class="mv-btn">
                <img src="../../assets/yuer-mv/mv-share.png" alt="">
                <p>{{mvCount(mv.shareCount)}}</p>
            </div>
        </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    computed: {
        mv(){
            return this.$store.state.mv
        },
        
    },
    methods: {
         mvCount(Count){
            return Count > 10000 ?  String(Count).slice(0,-4)+'万' : Count
        },
        toComments(){
            let e = this.$store.state.eventComment
            e.scrollTop = 580
        }
    }
}
</script>

<style>
.mv-btns{
    margin-top:4.35%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 10.87%;
}
.mv-btn{
    width: .72325rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
} 
.mv-btn  img{
    height: 60%;
}
.mv-btn  p{
    font-size: .2893rem;
    text-align: center;
    width: .71325rem;
    line-height: .48217rem;
}
</style>