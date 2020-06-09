import Vue from 'vue'
import Router from 'vue-router'

import Main from '../views/main.vue'
import Mv from '../views/mv.vue'
import Musiclist from '../views/musicList.vue'
import Player from '../views/player.vue'

Vue.use(Router)

export default new Router({
    routes:[
        { 
            path: '/main', 
            name:'main',
            component: Main 
        },
        {   //使用name + params的方式传参的话，path必须给参数留一个占位符，并且参数名要保持一致
            path: '/main/mv/:mvid', 
            //命名路由
            name:'mv',
            component: Mv ,
        },
        { 
            path: '/main/musiclist/:musiclistid', 
            name:'musiclist',
            component: Musiclist,
           
        },
        { 
            path: '/main/musiclist/:musiclistid/player/:musicindex', 
            name:'player',
            component: Player,
           
        },
        { 
            path: '/', 
            redirect: '/main' 
        },

    ]
            
        
})
