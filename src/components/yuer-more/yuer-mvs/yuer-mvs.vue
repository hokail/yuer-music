<template>
<div id="mvs" >
    <Topback/>
    <div class="all-mvs" @scroll="getmore" >
        <Yuermvs/>
        <Yuerloading  v-if="$store.state.isbottom && !$store.state.nomore"/>   
        <p  class="nomoreResult" v-else-if=" $store.state.isbottom && $store.state.nomore" > ~ 到底啦，别拖啦 ~</p>
    </div>
   
    <div class="mv-cover"  v-if="$store.state.mvcover" @click="$store.state.mvcover = false"></div>
   
    <transition name="slide-in">
        <div class="mv-types-wrap" v-if="$store.state.mvcover">
            <MvTypes />
        </div>
    </transition>
</div>
</template>

<script>
import Topback from '../ThetTopBack'
import Yuerloading from '../../yuer-loading'
import Yuermvs from '../../yuer-playmv/yuer-mvs'
import MvTypes from './yuer-mv-types'

   export default {
       components: {
           Topback,
           Yuerloading,
           Yuermvs,
           MvTypes
       },
       data(){
            return{

            }
        },
        computed: {
          mvtypes(){
              return this.$store.state.mvtypes
          }  
        },
        mounted () {
            let mvtypes = this.mvtypes
            this.$store.dispatch('getRecommendMVs',{mvtypes,offset:0})
        },
        methods: {
            getmore(e){
                this.$store.dispatch('getCards',e)
            }  
        },
        watch: {
            mvtypes:{
                deep:true,
                handler(val){
                    console.log('改变了');
                    let mvtypes = this.mvtypes
                    this.$store.dispatch('getRecommendMVs',{mvtypes,offset:0})
                }
                
            }
        }
   }
</script>

<style>
#mvs{
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.all-mvs{
    position: absolute;
    width: 100%;
    height: 90%;
    top: 10%;
    overflow-x: hidden;
    overflow-y: scroll;
}
.mv-cover{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, .3);
}
.mv-types-wrap{
    position: absolute;
    background-color: white;
    height: 100%;
    width: 70%;
    z-index: 11;
    left: 30%;
}
.slide-in-enter,.slide-in-leave-to{
    left: 100%;
}
.slide-in-enter-active,.slide-in-leave-active{
    transition: all .3s ;
}
</style>