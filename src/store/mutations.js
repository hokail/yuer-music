
//引入Vue,给已有对象响应式的添加属性
import Vue from 'vue'

import {GETBANNERS,GETRECOMMENDS,GETRECOMMENDMVS,GETINFOOFMVS,GETMUSICLIST,GETALLMUSIC,GETURLLYRIC,GETPLAYINGMV,GETNEXTPAGE} from './mutationType'



export default {
    [GETBANNERS](state,{banners}){
        state.banners = banners
    },
    [GETRECOMMENDS](state,{recommends}){
        state.recommends = recommends
    },
    [GETRECOMMENDMVS](state,{recommendMVs}){
        state.recommendMVs = recommendMVs
    },
    [GETINFOOFMVS](state,{likedCount,commentCount,index}){
        /*
            这里如果用以下的方法给对象添加属性，不会更新视图，因为这是对已有的（上个ajax中获取到的）对象添加属性
            state.recommendMVs[index].likedCount = likedCount
            state.recommendMVs[index].commentCount = commentCount

            因此需要用 Vue.set 的方法给对象添加数据
        */

        Vue.set(state.recommendMVs[index],'likedCount',likedCount)
        Vue.set(state.recommendMVs[index],'commentCount',commentCount)

    },
    [GETMUSICLIST](state,{musiclist}){
        state.musiclist = musiclist
    },
    [GETALLMUSIC](state,{allmusic}){
        state.allmusic = allmusic
    },
    [GETURLLYRIC](state,{playingurl,playinglyric}){
        state.playingurl = playingurl
        state.playinglyric = playinglyric
    },
    [GETPLAYINGMV](state,{mv,mvurl,mvcomments}){
        state.mv = mv
        state.mvurl = mvurl
        state.mvcomments = mvcomments
    },
    [GETNEXTPAGE](state,{nextpage}){
        if( nextpage.length === 0 ){
            state.nomore = true
        }else{
             nextpage.forEach(comment => {
                state.mvcomments.push(comment)
            })
        }
       
    }    
}