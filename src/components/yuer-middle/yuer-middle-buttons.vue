<template>
    <div id="middle-buttons">
        <div class="btn-type" v-for="(type,index) in types" :key="index" @click="getRecommendsByType(type.name)">
            <img :src="type.icon" alt="">
        </div>
    </div>
</template>

<script>

import huayu from   '../../assets/imgs/huayu.png'
import liuxing from '../../assets/imgs/liuxing.png'
import yaogun from  '../../assets/imgs/yaogun.png'
import minyao from  '../../assets/imgs/minyao.png'
import dianzi from  '../../assets/imgs/dianzi.png'


   export default {
       data(){
            return{
                types:[
                    {
                        name:'华语',
                        icon:huayu
                    },
                    {
                        name:'流行',
                        icon:liuxing
                    },
                    {
                        name:'摇滚',
                        icon:yaogun
                    },
                    {
                        name:'民谣',
                        icon:yaogun
                    },
                    {
                        name:'电子',
                        icon:dianzi
                    },
                ]
            }
        },
       
        methods: {
            getRecommendsByType(name){
                this.$store.dispatch('getRecommends',{lmit:6,type:name,offset:0})
            }
        }
   }
</script>

<style>
#middle-buttons{
    position: relative;
    display: flex;
    /* border: 1px solid black; */
    height:  70px;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    /* box-shadow:  .04822rem .07233rem .12054rem  rgb(205, 204, 204); */
}
.btn-type p{
    text-align: center;
    font-size:10px;
}
#middle-buttons img{
    height: 42px;
    width: 42px;
    border-radius: 50%;
    box-shadow:  0 0 5px  rgb(226, 155, 155); 
}
</style>