
import {GETBANNERS,GETRECOMMENDS,GETRECOMMENDMVS,GETINFOOFMVS,GETMUSICLIST,GETALLMUSIC,GETURLLYRIC} from './mutationType'

import axios from 'axios'


//给所有axios请求都加上前缀，即请求的接口，在config/index.js prosyTable中配置，用于解决跨域请求的问题
axios.defaults.baseURL = '/api'
//获取轮播图
const getBannerByTpye = "/banner?type=0"
//获取推荐歌单
const getRecommendsByType = "/top/playlist/?limit=6&order=hot&cat="
//获取推荐mv
const getRecommendMVs = "/personalized/mv"
//获取mv相关信息
const getInfoOfMVs = "/mv/detail/info?mvid="
//获取歌单详情
const getMusicList = "/playlist/detail?id="
//获取歌单内的歌曲
const getAllmusic = "/song/detail?ids="
//获取歌曲url
const getMusicUrlById = "/song/url?id="
//获取歌曲歌词
const getMusicLyricById = "/lyric?id="

export default {


    //actions中，使用commit需要声明形参，并且需要以对象的形式，接收dipatch的参数是，则写在commit对象外
    //获取轮播图
     getBanner({commit}){
        //使用axios需要先引入axio
        axios.get(getBannerByTpye).then((response) => {
            let banners = response.data.banners
            //用commit传参数，需要以对象的形式传，在mutations接收时，也要以对象形式接收
            commit(GETBANNERS,{banners})
        }),(error) => {

        }
    
    },
    //获取推荐歌单
    getRecommends({commit},type){
        axios.get(getRecommendsByType + type).then((response) =>{
            let recommends = response.data.playlists
            console.log(recommends);
            commit(GETRECOMMENDS,{recommends})
        },(error) => {

        })
    },
    //获取推荐mv
    async getRecommendMVs({commit}){
        return new Promise((resolve,reject) => {
             axios.get(getRecommendMVs).then((response) =>{
                let recommendMVs = response.data.result
                commit(GETRECOMMENDMVS,{recommendMVs})
                resolve()
            },(error) => {

            })
        })
    },

    //获取mv相关信息
    getInfoOfMVs({commit,state}){
        //对每个得到的mv，获取它的相关信息
        state.recommendMVs.forEach( (mv,index) => {
            axios.get(getInfoOfMVs + mv.id ).then((response) =>{
                let likedCount = response.data.likedCount
                let commentCount =  response.data.commentCount
                commit(GETINFOOFMVS,{likedCount,commentCount,index})
            },(error) => {

            })
        })
        
    },

    //获取歌单详情
    async getMusicList({commit},listid){
        return new Promise((resolve,reject) => {
            axios.get(getMusicList + listid).then((response) => {
                let musiclist = response.data.playlist
                // console.log(musiclist);
                commit(GETMUSICLIST,{musiclist})
                resolve()
            }),(error) => {

            }
        })
        
    },
    getAllMusic({commit,state}){
        //获取歌单内所有歌曲id
        let allMusicIds = ''
        state.musiclist.trackIds.forEach((music,index) => {
            allMusicIds = allMusicIds +','+ String(music.id)
        })
        allMusicIds = allMusicIds.slice(1)

        //通过id获取歌单内所有歌曲信息
        axios.get(getAllmusic + allMusicIds).then((response) => {
            let allmusic = response.data.songs
            console.log(allmusic);
            commit(GETALLMUSIC,{allmusic})
        }),(error) => {

        }
    },
    //获取播放歌曲的url和歌词
    async getUrlLyric({commit},id){

        return new Promise((resolve,reject) => {
             axios.all([
                axios.get(getMusicUrlById + id),
                axios.get(getMusicLyricById + id),
            ]).then(axios.spread((response1,response2) => {
                let playingurl = response1.data.data[0].url
                let playinglyric = response2.data.lrc.lyric
                commit(GETURLLYRIC,{playingurl,playinglyric})
                resolve()
            }))
        })
       
    }
}