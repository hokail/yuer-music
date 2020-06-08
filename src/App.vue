<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>

  export default {

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
      }
  }
</script>

<style>
#app{
  width: 100%;
}
</style>
