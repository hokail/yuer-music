<template>
  <div>
    <YuerHeader/>
    <YuerMiddle/>
    <YuerBottom/>
    <YuerCards/>
  </div>
</template>

<script>

import YuerHeader from '../components/yuer-header'
import YuerMiddle from '../components/yuer-middle'
import YuerBottom from '../components/yuer-bottom'
import YuerCards from '../components/yuer-cards'

export default {
  components: {
    YuerHeader,
    YuerMiddle,
    YuerBottom,
    YuerCards
  },
  
}
</script>

<style>

</style>