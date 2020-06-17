<template>
<div id="yuer-mvs">
    <ul>
        <li v-for="(mv,index) in mvs" :key="index">
            <div id="mvs-mv" @click="toplaymv(mv.id,mv.likedCount)">
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
            return  this.$store.state.isMainSearch ?  this.$store.state.mvs : this.$store.state.simvs
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
#mvs-mv{
    margin: .36163rem;
    width: 100%;
    display: flex;
    align-items: center;
}
.mvs-cover{
    position: relative;
    height: 90px;
}
.mvs-cover > img{
    margin-right: .48217rem;
    height: 90px;
    width: 3.85736rem;
    border-radius: .12054rem;
}
.mvs-playcount{
    position: absolute;
    top: .12054rem;
    right: .60271rem;
    display: flex;
    align-items: center;
    color: white;
}
.mvs-playcount img{
    width: .24108rem;
    height: .24108rem;
    margin-right: .04822rem;
}
.mvs-mvName{
    font: .31341rem "微软雅黑";
    width: 4.33952rem;
    word-break: break-all;
}
.mvs-artistName{
    font-size: .24108rem;
    color: gray;
}
</style>