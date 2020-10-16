<template>
<div id="yuer-cards" >
    <div id="cards-header">
        <p class="title">精彩MV</p> 
        <router-link  to="/main/mvs"><p class="title ground">更多MV</p></router-link>
    </div> 
    <hr class="splitline">
    <div class="card" v-for="(mv,index) in recommendMVs" :key="index">
        <router-link :to="{name:'mv',params:{mvid: mv.id}}">
            <div id="mv">
                <div id="mv-main">
                    <!-- 使用hash的路由方式 :to 中写js表达式，按照js的语法写 -->
                    <!-- <router-link :to="'/mv/'+ mv.id "><img :src="mv.picUrl"  class="mvPic"></router-link> -->
                    <!-- 

                        使用name params的方式,这种写法必须要在路由配置中，给参数写占位符，否则只有第一次跳转页面可以拿到数据
                        刷新一次就没有了

                        占位符就是路由配置的path中，用 : 动态绑定的内容
                    -->
                
                <img :src="mv.cover"  class="mvPic">
                <!-- <img :src="mv.cover"  class="mvPic" @click="toplaymv(mv.id,mv.likedCount)"> -->
                    <!-- 
                        使用 path query 的方式传参的话，就不需要写占位符了可以直接传递

                        使用query的话，参数会直接拼接在url上 

                        <router-link :to="{path:'Mv',query:{mvid: mv.id}}"><img :src="mv.picUrl"  class="mvPic"></router-link>
                    -->
                    
                    <div class="mv-middle"></div>
                    <!-- <img  class="mv-middle" src="../assets/imgs/mvPlayCount.png" alt=""> -->
                    <div class="mv-left">
                        <img src="../assets/imgs/mvPlayCount.png" alt="" class="mvIcon">
                        <span>{{mvCount(mv.playCount)}}</span>
                    </div>
                    <div class="mv-right">
                        <img src="../assets/imgs/mvDuration.png" alt="">
                        <span>{{mvDuration(mv.duration)}}</span>
                    </div>
                </div> 
                <div id="infoOfMv-card">
                    <span>{{mv.name}}</span>
                    <span>by.{{mv.artistName}}</span>
                </div>
            </div>
        </router-link> 
        <CardBottom :mvid="mv.id" />
    </div>
</div>
</template>

<script>
const CardBottom = () => import('./yuer-others/cards-bottom');

//这里是解构赋值，因此函数名要和源文件中的函数名相同
import {timeformat} from '../js/timeFormat.js' 
 
import axios from 'axios'
   export default {
       data(){
            return{
             
            }
        },
        components: {
            CardBottom  
        },
        mounted () {
            this.getMVs()
        },
        computed: {
            recommendMVs(){
                return this.$store.state.recommendMVs
            },
        },
        methods: {
            
            getMVs(){
                //获取推荐mv
                 let mvtypes = this.$store.state.mvtypes
                 this.$store.dispatch('getRecommendMVs',{mvtypes})
                
            },

            //获取mv时长
            mvDuration(duration){
                duration = String(duration).slice(0,3)
                return timeformat(duration)
            },
            mvCount(Count){
                return Count > 10000 ?  String(Count).slice(0,-4)+'万+' : Count
            },
           
        }
   }
</script>

<style>
@import '../css/yuer-cards.css';
</style>