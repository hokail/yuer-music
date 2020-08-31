<template>
  <div id="app">
    <!-- 使用keep-alive缓存播放页面，这样切换出播放页面时，播放页面的监听事件动画等依然可以正常执行 -->
    <keep-alive include="player">
      <router-view></router-view>
    </keep-alive>
    <audio id="audioPlayer" ref="audioPlayer" autoplay  :src="url" >Your browser does not support the audio element.</audio>
    <PlayerBottom @click.native="toplayer" v-show=" $route.path.search('player') == -1" />
  </div>
</template>
<script>

import {isEmpty} from './js/isEmpty'

import PlayerBottom from './components/yuer-playerBottom'

  export default {
    components: {
      PlayerBottom
    },

      //解决刷新页面时，store中数据消失的问题
      created () {
          //从sessionStorage中取出存储的store内容
          if(sessionStorage.getItem('store')){
            this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem('store'))))
          }
          //刷新页面时，store存入sessioStorage
          window.addEventListener('beforeunload',() => {
            sessionStorage.setItem('store',JSON.stringify(this.$store.state))
          })
      },

      computed: {
          url(){
              let url = this.$store.state.playingurl
              //可能为vip歌曲，此时获取不到url
              return isEmpty(url) ? '' : url
          },
      },
      methods: {
        toplayer(){
          if(this.$store.state.playingmusic.id !== undefined){
            this.$router.push({
              name:'player',
              params:{
                musiclistid:this.$store.state.musiclistid,
                musicindex:this.$store.state.musicindex
              }
            })
          }
        }
      }
      
  }
</script>

<style>
#app{
  width: 100%;
}
</style>
