<template>
<div id="yuer-cards">
    <div id="cards-header">
        <p class="title">精彩MV</p> <p class="title refresh">获取新内容</p> 
    </div> 
    <hr class="splitline">
    <div class="card" v-for="(mv,index) in recommendMVs" :key="index">
        <div id="mv">
            <div id="mv-main">
                <!-- 使用hash的路由方式 :to 中写js表达式，按照js的语法写 -->
                <!-- <router-link :to="'/mv/'+ mv.id "><img :src="mv.picUrl"  class="mvPic"></router-link> -->
                <!-- 

                    使用name params的方式,这种写法必须要在路由配置中，给参数写占位符，否则只有第一次跳转页面可以拿到数据
                    刷新一次就没有了

                    占位符就是路由配置的path中，用 : 动态绑定的内容
                -->
               
                <router-link :to="{name:'mv',params:{mvid: mv.id}}"><img :src="mv.cover"  class="mvPic"></router-link> 
               <!-- <img :src="mv.cover"  class="mvPic" @click="toplaymv(mv.id,mv.likedCount)"> -->
                <!-- 
                    使用 path query 的方式传参的话，就不需要写占位符了可以直接传递

                    使用query的话，参数会直接拼接在url上

                    <router-link :to="{path:'Mv',query:{mvid: mv.id}}"><img :src="mv.picUrl"  class="mvPic"></router-link>
                 -->
                   
                
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
        <div id="about">
            <!-- 
                {{getInfoOfMv(mv.id)}} 
                因为每次for循环渲染时，需要根据每次的不同mv.id来获取mv相关信息，所以想要每次渲染时执行一次getInfoOfMv(mv.id)函数。因此写在了这里
                但经过验证，写在这里会导致函数无限被调用

                猜测原因：把methods里的方法，写在查值表达式中，实际上就相当于当作计算属性来使用了。
                    也就是说，如果和这个方法的有关的值改变了，那么这个函数就会自动调用一次。

                    在这里，getInfoOfMv(mv.id)执行一次后，改变了data中likedCount的值，而因为getInfoOfMv(mv.id)被当作计算属性使用，
                    它的值又与likedCount有关，likedCount改变又会让函数调用一次，这样就陷入了死循环，函数被无限调用
            -->
            <img src="../assets/imgs/thumb.png" alt="" class="thumb cardIcon" >
            <span>{{mvCount(mv.likedCount)}}</span>
            <img src="../assets/imgs/comment.png" alt="" class="commends cardIcon">
            <span>{{mvCount(mv.commentCount)}}</span> 
        </div>
    </div>
</div>
</template>

<script>

//这里是解构赋值，因此函数名要和源文件中的函数名相同
import {timeformat} from '../js/timeFormat.js'

import axios from 'axios'
   export default {
       data(){
            return{
             
            }
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
            
            async getMVs(){
                //获取推荐mv
                await this.$store.dispatch('getRecommendMVs',{limit:6,offset:0})

                /*
                    这里原本是想在渲染的时候，通过v-for 的数组  recommendMVs ，直接获取mv.id,作为参数，调用一个函数来获取信息，把信息作为返回值传回去，
                    这样就可以通过查值表达式来获取数据了
                    但是由于获取信息是异步的，无法获取结果。使用promise虽然可以保证得到结果，但却不能使用返回值返回结果，这就不能通过查值表达式
                    的方式来调用这个函数了

                    所以这里使用了其他方法，就是在获取到 mv 数组后，对每个 mv 进行ajax，获取对应的信息。
                    然后直接把信息作为属性动态的添加到 v-for 的数组  recommendMVs 中去，这样就可以和其他内容一样，通过 v-for 来取出信息了

                    1.使用ajax获取推荐mv---（就是上面的那一行代码）
                    2.对每个mv使用ajax，获取相关信息
                    3.把相关信息直接作为属性，添加回这个mv对象中

                    但是 recommendMVs 是由第一个ajax获取到的，算是已经存在的数组对象了，所以直接添加属性的话，是不能反映到视图上的，因此
                    要使用 Vue.set 的方法，给 mv 对象添加属性
                */
                this.$store.dispatch('getInfoOfMVs')
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