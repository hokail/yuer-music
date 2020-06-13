<template>
<div class="search-list">
    <div class="search-header">
        <div  class="header-top "> 
            <img class="backto" src="../assets/yuer-musiclist/back.png" @click="$router.go(-1)">
            <input placeholder="请输入关键字" type="text" class="search-input" v-model="keyword">
            <img class="searchinlist" src="../assets/yuer-musiclist/searchinlist.png" alt="" @click="search">
        </div>
    </div>
    <div class="search-result">
        <Yuerlistmain class="result-list"/>
    </div>
</div>
</template>

<script>
import Yuerlistmain from '../components/yuer-musicList/yuer-listmain'
   export default {
       components: {
           Yuerlistmain
       },
       data(){
            return{
                keyword:''
            }
        },
        mounted () {
              this.$store.state.issearch = true
        },
        methods: {
            search(){
                //正则表达式中有变量，此时只能用新建RegExp对象的方法，不能用带正则表达式的字符串，否则无法添加变量
                
                console.log(this.keyword);
                if(this.keyword !== null){
                    let conditon = new RegExp(this.keyword,'i')
                     this.$store.state.allmusic.forEach( music => {
                        if(conditon.test(music.name) ||conditon.test(music.ar[0].name) ){
                           this.$store.state.searchresult.push(music)
                        }
                    })
                }
               
            }
        },
        destroyed () {
             this.$store.state.issearch = false
             this.$store.state.searchresult = []
        } 
   }
</script>

<style>

@import '../css/yuer-search.css';

.search-list{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: white;
}
.search-header{
    
    width: 100%;
    height: 8.2%;
    background-color: black;
}

.search-input{
    background-color: rgb(17, 17, 17);
    width: 70%;
    height: 90%;
    font-size: 20px;
    letter-spacing: 2px;
    color: white;
    padding: 0 15px;
    border: none;
    border-bottom: 1px solid white;
}
.search-result{
    width: 100%;
    height: 91.8%;
    overflow-y: scroll;
}
.search-result > .result-list{
    top: 0;
}
</style>