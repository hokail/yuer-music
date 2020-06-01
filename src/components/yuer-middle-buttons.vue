<template>
    <div id="middle-buttons">
        <div class="btn-type">
            <img src="../assets/imgs/huayu.png" alt="">
            <p>华语</p>
        </div>
        <div class="btn-type">
            <img src="../assets/imgs/liuxing.png" alt="">
            <p>流行</p>
        </div>
        <div class="btn-type">
            <img src="../assets/imgs/yaogun.png" alt="">
            <p>摇滚</p>
        </div>
        <div class="btn-type">
             <img src="../assets/imgs/minyao.png" alt="">
            <p>民谣</p>
        </div>
        <div class="btn-type">
             <img src="../assets/imgs/dianzi.png" alt="">
            <p>电子</p>
        </div>
    </div>
</template>

<script>
   export default {
       data(){
            return{

            }
        }
   }
</script>

<style>
#middle-buttons{
    position: relative;
    display: flex;
    /* border: 1px solid black; */
    height: 1.68759rem;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    /* box-shadow:  .04822rem .07233rem .12054rem  rgb(205, 204, 204); */
}
.btn-type p{
    text-align: center;
    font-size: .24108rem;
}
#middle-buttons img{
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    box-shadow:  .04822rem .12054rem .12054rem  rgb(214, 209, 209); 
}
</style>