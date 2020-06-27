<template>
<div id="yuer-mvs">
    <ul id="list-mvs">
        <li v-for="(mv,index) in mvs" :key="index" >
            <div  id="mvs-mv" @click="toplaymv(mv.id,mv.likedCount)">
                <div class="mvs-cover">
                    <img  :src="mv.cover" alt="">   
                    <div class="mvs-playcount">
                        <img src="../../assets/imgs/mvPlayCount.png" alt="">
                        <p>{{mvCount(mv.playCount)}}</p>
                    </div>
                </div>
                <div class="mvs-info">
                    <p class="mvs-mvName">{{mv.name}}</p>
                    <p class="mvs-artistName">{{mvDuration(mv.duration)}}  by.{{mv.artistName}}</p>
                </div>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
import {timeformat} from '../../js/timeFormat.js'


export default {
    data(){
        return{

        }
    },
    computed: {
        mvs(){
            if(this.$route.path == '/main/mvs'){
                return this.$store.state.recommendMVs
            }else{
                return  this.$store.state.isMainSearch ?  this.$store.state.mvs : this.$store.state.simvs
            }
    
        } 
    },
    methods: {
        mvDuration(duration){
            duration = String(duration).slice(0,3)
            return timeformat(duration)
        }, 
        mvCount(Count){
            return Count > 10000 ?  String(Count).slice(0,-4)+'万' : Count
        },
        toplaymv(mvid,likedCount){
            this.$router.push({
                name:'mv',
                params:{
                    mvid
                }
            })
            this.$store.state.mvlikedCount = likedCount
        }
    }
}
</script>

<style>
#yuer-mvs{
    /* overflow-x: hidden; */
}
#list-mvs{
    list-style: none;
}
#mvs-mv{
    margin: 15px;
    width: 100%;
    display: flex;
    align-items: center;
}
.mvs-cover{
    position: relative;
    height: 90px;
}
.mvs-cover > img{
    margin-right: 20px;
    height: 90px;
    width: 160px;
    border-radius: 5px;
}
.mvs-playcount{
    position: absolute;
    top: 5px;
    right: 25px;
    display: flex;
    align-items: center;
    color: white;
    font-size: 12px;
}
.mvs-playcount img{
    width: 10px;
    height: 10px;
    margin-right: 2px;
}
.mvs-mvName{
    font:  13px "微软雅黑";
    width:  180px;
    word-break: break-all;
}
.mvs-artistName{
    font-size: 10px;
    color: gray;
}
</style>