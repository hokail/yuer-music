
//引入Vue,给已有对象响应式的添加属性
import Vue from 'vue'

import {GETBANNERS,GETRECOMMENDS,GETRECOMMENDMVS,GETINFOOFMVS,GETMUSICLIST,GETALLMUSIC,GETURLLYRIC,GETPLAYINGMV,GETNEXTPAGE,GETMVARTIST,GETHOTCOMMENTS,GETRESULTBYKEY,GETMVSBYKEY,GETLISTSBYKEY} from './mutationType'



export default {
    [GETBANNERS](state,{banners}){
        state.banners = banners
    },
    [GETRECOMMENDS](state,{recommends}){
        state.recommends = recommends
    },
    [GETRECOMMENDMVS](state,{recommendMVs,offset}){
        if(offset === 0){
            state.recommendMVs = recommendMVs
        }else{
             recommendMVs.forEach( mv => {
                state.recommendMVs.push(mv)
            })
        }
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
    [GETURLLYRIC](state,{playingurl,playinglyric,playingpic}){
        state.playingurl = playingurl
        state.playinglyric = playinglyric
        state.playingpic = playingpic
    },
    [GETPLAYINGMV](state,{mv,mvurl,newcomments,mvs,likedCount}){
        state.mv = mv
        state.mvurl = mvurl
        state.newcomments = newcomments
        state.mvs = mvs
        //把点赞数添加到mv对象
        Vue.set(state.mv,'likedCount',likedCount)
        console.log(mv);
    },
    [GETNEXTPAGE](state,{nextpage}){
        if( nextpage.length === 0 ){
            state.nomore = true
        }else{
             nextpage.forEach(comment => {
                state.newcomments.push(comment)
            })
        }
       
    },
    [GETMVARTIST](state,{artists}){
        artists.forEach( artist => {
            if(artist.id == state.mv.artistId){
                state.mvartist = artist
                return
            }
        })
    },
    [GETHOTCOMMENTS](state,{hotcomments}){
        state.hotcomments = hotcomments
    },
    [GETRESULTBYKEY](state,{songs,offset}){
        if( offset === 0){
            state.allmusic = songs
        }else if(songs.length !== 0){
            songs.forEach(song => {
                state.allmusic.push(song)
            })
        }else{
            state.nomore = true
        }
    },
    [GETMVSBYKEY](state,{mvs,offset}){
        console.log(mvs);
        if( offset === 0){
            state.mvs = mvs
        }else if(mvs !==  undefined){
            mvs.forEach(mv => {
                state.mvs.push(mv)
            })
        }else{
            state.nomore = true
        }
    },
    [GETLISTSBYKEY](state,{playlists,offset}){
        if( offset === 0){
            state.playlists = playlists
        }else if(playlists.length !== 0 ){
            playlists.forEach(playlist => {
                state.playlists.push(playlist)
            })
        }else{
            state.nomore = true
        }

    },
}