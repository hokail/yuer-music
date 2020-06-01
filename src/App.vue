<template>
  <div id="app">
    <yuerHeader/>
    <yuerTop/>
    <yuerMiddle/>
    <yuerBottom/>
  </div>
</template>

<script>

import yuerHeader from './components/yuer-header'
import yuerTop from './components/yuer-top'
import yuerMiddle from './components/yuer-middle'
import yuerBottom from './components/yuer-bottom'


export default {
  components: {
    yuerHeader,
    yuerTop,
    yuerMiddle,
    yuerBottom
  }
  
}
</script>

<style>
</style>
