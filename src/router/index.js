import Vue from 'vue'
import Router from 'vue-router'

import Main from '../views/main.vue'
import Mv from '../views/mv.vue'
import Musiclist from '../views/musicList.vue'
import Player from '../views/player.vue'
import Search from '../views/search.vue'
import mainSearch from '../views/mainSearch.vue'

import ResultList from '../components/yuer-result/result-list.vue'
import ResultMusic from '../components/yuer-result/result-music.vue'
import ResultMv from '../components/yuer-result/result-mv.vue'
import Playlists from '../components/yuer-more/yuer-playlists.vue'
import Mvs from '../components/yuer-more/yuer-Mvs.vue'
import Types from '../components/yuer-more/alltypes.vue'
import ListByType from '../components/yuer-more/listByType.vue'

Vue.use(Router)

/*
    重写路由push和replace方法
    
*/
const routerReplace = Router.prototype.replace
Router.prototype.replace = function replace(loaction){
    return routerReplace.call(this,loaction).catch(error => error)
}

export default new Router({
    routes:[
        //主界面
        { 
            path: '/main', 
            name:'main',
            component: Main 
        },
        //mv界面
        {   //使用name + params的方式传参的话，path必须给参数留一个占位符，并且参数名要保持一致
            path: '/main/mv/:mvid', 
            //命名路由
            name:'mv',
            component: Mv ,
        },
         //更多歌单
        {   
            path: '/main/playlists', 
            name:'playlists',
            component: Playlists ,
        },
        //更多mvp
        {   
            path: '/main/mvs', 
            name:'mvs',
            component: Mvs ,
        },  //更多歌单
        {   
            path: '/main/playlists/types', 
            name:'types',
            component: Types ,
        },
        {   
            path: '/main/playlists/types/:type', 
            name:'listByType',
            component: ListByType ,
        },
        //歌单
        { 
            path: '/main/musiclist/:musiclistid', 
            name:'musiclist',
            component: Musiclist,
           
        },
        //播放
        { 
            path: '/main/musiclist/:musiclistid/player/:musicindex', 
            name:'player',
            component: Player,
           
        },
        //搜索
        { 
            path: '/main/search', 
            name:'mainSearch',
            component: mainSearch,
            //重定向需要再路由内进行配置
            redirect: '/main/search/music',
            children:[
                {
                    path: '/main/search/music', 
                    name:'ResultMusic',
                    component: ResultMusic,
                },
                {
                    path: '/main/search/list', 
                    name:'ResultList',
                    component: ResultList,
                }, 
                {
                    path: '/main/search/mv', 
                    name:'ResultMv',
                    component: ResultMv,
                },
            ]
        },
        //歌单内搜索
        { 
            path: '/main/musiclist/:musiclistid/search', 
            name:'search',
            component: Search 
        },

        { 
            path: '/', 
            redirect: '/main' 
        },
    ]
            
        
})
