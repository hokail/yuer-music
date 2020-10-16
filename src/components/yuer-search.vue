<template>
<div class="search-header">
    <img class="backto" src="../assets/yuer-musiclist/back.png" @click="$router.go(-1)">
    <input placeholder="请输入关键字" type="text" class="search-input"  @keyup.enter="search" v-model="$store.state.keyword">
    <img class="search-main" src="../assets/yuer-musiclist/searchinlist.png" alt="" @click="search">
</div>
</template>

<script>
/*
 搜索的流程：
    1.点击搜索按钮，进入搜索界面
    主界面按钮会清空allmusic数组。歌单内搜索会清空searchresult数组
    2.存放搜索结果
    yuer-search组件中，主界面搜索结果存放在allmuisc中，歌单内搜索结果存放在searchresult中
    3.结果显示
    如果是歌单内搜索，那么显示的是searchresult，其余清空显示的都是allmusic。
    
    因为主页面搜索的结果和歌单列表，其实是一样的结果类型，都是很多的歌曲，但歌单内搜索一般只会搜索到某一首歌曲，
    因此把歌单内的结果放在了searchresult中，做短暂的显示

    当推出歌单搜索界面时，包括开始播放歌曲，搜索结果会清空
    但主界面的搜索结果，只有在完全推出搜索，回到主界面时，才清空


    在点击历史记录中的歌曲后，播放列表变为历史记录表，直接把计算属性获取歌曲的那个allmusic，改为history
*/
const Yuerlistmain = () => import('../components/yuer-musicList/yuer-listmain');

   export default {
       components: {
           Yuerlistmain,
       },
       data(){
            return{
               
            }
        },
        mounted () {
            this.$store.state.issearch = true 
        },
        methods: {
            search(){
                if(!this.$store.state.isMainSearch){
                    this.searchInList()
                }else{
                    this.searchInMain()
                    this.$router.replace('/main/search/music')
                }
            },
            //歌单中搜索
            searchInList(){
                
                //正则表达式中有变量，此时只能用新建RegExp对象的方法，不能用带正则表达式的字符串，否则无法添加变量

                //歌单中搜索的结果，暂时存放在searchresult数组中
                if(this.keyword !== null){
                    let conditon = new RegExp(this.keyword,'i')
                    this.$store.state.allmusic.forEach( music => {
                        if(conditon.test(music.name) ||conditon.test(music.ar[0].name) ){
                            this.$store.state.searchresult.push(music)
                        }
                    })
                    // this.$store.state.allmusic = this.$store.state.searchresult
                }
            },
            searchInMain(){

                //主页面的搜索歌曲，搜索结果会存放再allmusic数组中
                this.$store.dispatch('getResultByKey',{offset:0,type:1})
                this.$store.dispatch('getResultByKey',{offset:0,type:1004})
                this.$store.dispatch('getResultByKey',{offset:0,type:1000})
                
            }
        },
        //这个会在新组件的渲染后才执行
        destroyed(){
            this.$store.state.issearch = false
        } 
   }
</script>

<style>
@import '../css/yuer-search.css';
</style>

