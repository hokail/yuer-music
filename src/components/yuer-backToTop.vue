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
    right:  10px;
    bottom:  60px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 5px rgb(232, 240, 245) ;
}
#backToTop > img{
    height: 20px;
    width: 20px;
}
</style>