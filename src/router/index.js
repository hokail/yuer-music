import Vue from 'vue'
import Router from 'vue-router'

// 路由懒加载
const Main = () => import('../views/main.vue')
const Mv = () => import('../views/mv.vue')
const Musiclist = () => import('../views/musicList.vue')
const Player = () => import('../views/player.vue')
const Search = () => import('../views/search.vue')
const MainSearch = () => import('../views/mainSearch.vue')

const ResultList = () => import('../components/yuer-result/yuer-result-list.vue')
const ResultMusic = () => import('../components/yuer-result/yuer-result-music.vue')
const ResultMv = () => import('../components/yuer-result/yuer-result-mv.vue')
const Playlists = () => import('../components/yuer-more/yuer-playlists/yuer-playlists.vue')
const Mvs = () => import('../components/yuer-more/yuer-mvs/yuer-mvs.vue')
const Types = () => import('../components/yuer-more/yuer-playlists/yuer-playlists-all-category.vue')
const ListByType = () => import('../components/yuer-more/yuer-playlists/yuer-playlists-tag-all.vue')


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
        //搜索
        { 
            path: '/main/search', 
            name:'mainSearch',
            component: MainSearch,
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
            component: MainSearch,
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
