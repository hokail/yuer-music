
//引入Vue,给已有对象响应式的添加属性
import Vue from 'vue'

import {GETTYPES,GETBANNERS,GETRECOMMENDS,GETRECOMMENDMVS,GETINFOOFMVS,GETMUSICLIST,GETALLMUSIC,GETURLLYRIC,GETPLAYINGMV,GETNEXTPAGE,GETMVARTIST,GETHOTCOMMENTS,GETRESULTBYKEY,GETMVSBYKEY,GETLISTSBYKEY} from './mutationType'



export default {
    [GETTYPES](state,{alltypes}){
        state.alltypes = alltypes
    },
    [GETBANNERS](state,{banners}){
        state.banners = banners
    },
    [GETRECOMMENDS](state,{recommends,offset}){
        if( offset === 0){
            state.recommends = recommends
        }else if(recommends.length !== 0){
            recommends.forEach(recommend => {
                state.recommends.push(recommend)
            })
        }else{
            state.nomore = true
        }
    },
    [GETRECOMMENDMVS](state,{recommendMVs,offset}){
        if(offset === 0){
            state.recommendMVs = recommendMVs
        }else if(recommendMVs.length !== 0){
            recommendMVs.forEach( recommendMV => {
                state.recommendMVs.push(recommendMV)
            })
        }else{
            state.nomore = true
        }
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
    [GETPLAYINGMV](state,{mv,mvurl,newcomments,simvs,likedCount}){
        state.mv = mv
        state.mvurl = mvurl
        state.newcomments = newcomments
        state.simvs = simvs
        console.log(simvs);
        //把点赞数添加到mv对象
        Vue.set(state.mv,'likedCount',likedCount)
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