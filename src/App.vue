<template>
  <div id="app">
    <yuerHeader/>
    <yuerMiddle/>
    <yuerBottom/>
    <yuerCards/>
  </div>
</template>

<script>

import yuerHeader from './components/yuer-header'
import yuerMiddle from './components/yuer-middle'
import yuerBottom from './components/yuer-bottom'
import yuerCards from './components/yuer-cards'

export default {
  components: {
    yuerHeader,
    yuerMiddle,
    yuerBottom,
    yuerCards
  },
  
}
</script>

<style>
#app{
  width: 100%;
}
</style>
