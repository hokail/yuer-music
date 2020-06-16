<template>
  <div id="main" ref="main" @scroll="getCards">
    <YuerHeader/>
    <YuerMiddle/>
    <YuerBottom/>
    <YuerCards/>
    <Yuerloading v-if="isbottom" class="mainLoading" />
    <BackToTop @click.native="toTop"/>
  </div>
</template>

<script>

import YuerHeader from '../components/yuer-header'
import YuerMiddle from '../components/yuer-middle'
import YuerBottom from '../components/yuer-bottom'
import YuerCards from '../components/yuer-cards'
import Yuerloading from '../components/yuer-loading'
import BackToTop from '../components/yuer-backToTop'

export default {
  data () {
    return {
      isbottom:false,
      page:1,
      //每页获取几个
      limit:6  
    }
  },
  components: {
    YuerHeader,
    YuerMiddle,
    YuerBottom,
    YuerCards,
    Yuerloading,
    BackToTop
  },
  mounted () {
    this.$store.state.nomore = false
  },
  methods: {
     getCards(e){ 
          //内容高度
          let cont = e.target.scrollHeight
          //可见高度（显示在页面上的高度，外层容器的高度）
          let warp = e.target.offsetHeight
          //滚动的距离
          let scroll = e.target.scrollTop
          //内容高度 = 滚动高度 + 可见高度 ，就说当滚动到底时，scroll = cont + warp
          //这里一开始没理解，以为滚动的距离就应该是内容的高度。然后想了想，其实这就好比做电梯，从3楼到1楼，移动的距离其实只有2层楼高，但3楼的高度，是移动的高度，在加上一层楼的高度，这里一层楼高，就是一个视窗的高度
          if(Math.round(scroll) >= cont - warp){
              this.isbottom = true
              let mvid = this.$route.params.mvid
              let offset = this.limit * (this.page ++)
              console.log(offset);
              this.getMoreCards(this.limit,offset)
          }
      },
      async getMoreCards(limit,offset){
          await this.$store.dispatch('getRecommendMVs',{limit,offset}) 
         if(!this.$store.state.nomore){
              this.isbottom = false
          }
      },
      toTop(){
        this.$refs.main.scrollTop = 0
      }
  }
  
}
</script>

<style>
#main{
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

</style>