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
            e.scrollIntoView()
        }
    }
}
</script>

<style>
.mv-btns{
    margin-top:5%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 35%;
}
.mv-btn{
    width: 30px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
} 
.mv-btn  img{
    height: 60%;
}
.mv-btn  p{ 
    font-size: 12px;
    text-align: center;
    width: 30px;
    line-height: 20px;
}
</style>