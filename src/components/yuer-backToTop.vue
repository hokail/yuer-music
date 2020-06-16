<template>
<div id="backToTop">
    <img  src="../assets/imgs/totop.png" alt="">
</div>
</template>

<script>
   export default {
       data(){
            return{

            }
        }
   }
</script>

<style>
#backToTop{
    position: fixed;
    z-index: 10;
    right: .24108rem;
    bottom: .24108rem;
    height: 1.20542rem;
    width: 1.20542rem;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 .12411rem rgb(232, 240, 245) ;
}
#backToTop > img{
    height: .48217rem;
    width: .48217rem;
}
</style>