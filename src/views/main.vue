<template>
  <div id="main" ref="main" @scroll="getCards">
    <YuerHeader/>
    <YuerMiddle/>
    <YuerBottom/>
    <YuerCards/>
    <Yuerloading v-if="$store.state.isbottom" class="mainLoading" />
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
    this.$store.state.isbottom = false
    this.$store.state.nomore = false
  },
  methods: {
     getCards(e){ 
        this.$store.dispatch('getCards',e)
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