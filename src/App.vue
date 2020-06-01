<template>
  <div id="app">
    <yuerHeader/>
    <yuerMiddle/>
    <yuerBottom/>
  </div>
</template>

<script>

import yuerHeader from './components/yuer-header'
import yuerMiddle from './components/yuer-middle'
import yuerBottom from './components/yuer-bottom'


export default {
  components: {
    yuerHeader,
    yuerMiddle,
    yuerBottom
  }
  
}
</script>

<style>
#app{
  width: 100%;
}
</style>
