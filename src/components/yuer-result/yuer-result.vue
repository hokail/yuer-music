<template>
<div id="main-search">
    <Yuersearch/>
    <div id="tags">
      <router-link :to="{name:'ResultMusic'}" replace><p :class=" $route.path === '/main/search/music' ? 'chosed':'' ">歌曲</p></router-link>                             
      <router-link :to="{name:'ResultList'}" replace><p @click="searchLists" :class=" $route.path === '/main/search/list' ? 'chosed':'' ">歌单</p></router-link>                             
      <router-link :to="{name:'ResultMv'}" replace><p @click="searchMvs" :class=" $route.path === '/main/search/mv' ? 'chosed':'' ">MV</p></router-link>                                 
    </div>
    
    <div id="main-result"  ref="mainResult" >
        <transition :name="slide" >
            <router-view class="child-view"></router-view>  
        </transition>   
        <Yuerloading v-if=" isbottom && !$store.state.nomore" class="inMainSearch" />   
        <p  class="nomoreResult" v-else-if=" isbottom && $store.state.nomore" > ~ 到底啦，别拖啦 ~</p>
    </div>            
</div>
</template>

<script> 
const Yuerloading = () => import('../yuer-loading');
const Yuersearch = () => import('../yuer-search');

import {setHeight} from '../../js/setBodyHeight'

export default {
    components: {
        Yuersearch,
        Yuerloading
    },
    data(){
        return{
            pageMusic:1,
            pageList:1,
            pageMv:1,
            slide:'ltr',
            isbottom: false,
            
        }
    },
    mounted () {

        setHeight()

        this.$store.state.isMainSearch = true
        this.$store.state.nomore = false
    },
    methods: {
        
        searchMvs(){
          
        },
        searchLists(){
          
        },

        //不同的切换动画效果
        changeTransition(to,from){
            to = to.path.slice(13)
            from = from.path.slice(13)

            if(to === 'music' || (to === 'list' && from === 'mv' )){
                this.slide = 'rtl'
            }else if(to === 'mv' || ((to === 'list' && from === 'music' ))){
                this.slide = 'ltr'
            }
        },
        getMore(e){
            //未搜索前，不触发下拉事件
                let cont = e.target.scrollHeight
                let wrap = e.target.offsetHeight
                let scroll = e.target.scrollTop
                if( Math.round(scroll) >= cont - wrap - 1){
                    this.isbottom = true
                    console.log(this.isbottom);
                    console.log(this.$store.state.nomore);
                    setTimeout(() => {
                         let path = this.$route.path.slice(13)
                    let offset = 0
                    let type = 0
                    if( path ==='music'){
                        offset = 20 * (this.pageMusic ++)
                        type = 1
                    }else if(path === 'list'){
                        offset = 20 * (this.pageList ++)
                        type = 1000
                    }else if(path === 'mv'){
                        offset = 20 * (this.pageMv ++)
                        type = 1004
                    }
                    this.getMoreCont(offset,type)
                    },1000);
                   
                } 
        },
        async getMoreCont(offset,type){
            await  this.$store.dispatch('getResultByKey',{offset,type}) 
            if(!this.$store.state.nomore){
                 this.isbottom = false
            }
        }   
    },
    destroyed () {
        this.$store.state.isMainSearch = false 
    },
    //这样在条转到相同path的路由中时，页面也会刷新了
    watch: {
        //在监听中，this指向的依然是vue实例
        '$route'(to,from){
           this.changeTransition(to,from)
           console.log('...');
        } 
    },
}
</script>

<style>
#main-search{
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
#main-result{
    position: absolute;
    width: 100%;
    height: 85%;
    overflow-y: scroll;
    overflow-x: hidden;
    top: 16%;
}
#tags{
    position: absolute;
    top: 8.2%;
    width: 100%;
    height: 6.8%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 1px rgb(207, 207, 207);
}
#tags > a{
    flex: 1;
    text-align: center;
    color: gray;
    font-size: 15px;
    height: 100%;
    text-decoration: none;
   
}
#tags > a > p{
    display: flex;
    align-items: center;
    justify-content: center;
    /* 这里居中如果设置ling-height，只能设置固定值，而这里需要高度为100%，所有居中使用了flex */
    height: 100%;
}

.chosed{
    color: black;
    font-size: 17px;
    border-bottom: 1px solid red;
}


.nomoreResult{
    height:  40px;
    text-align: center;
}

.child-view{ 
    position: absolute !important;
    left: 0;
}

.ltr-enter, .rtl-leave-to{
    left: 100%;
}
.ltr-leave-to,.rtl-enter{
    left: -100%;
}
.ltr-enter-active,.rtl-enter-active{
    transition: all .2s ;
}
.ltr-leave-active,.rtl-leave-active{
    transition: all .2s ; 

}
</style>