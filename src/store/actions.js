
import {GETTYPES,GETBANNERS,GETRECOMMENDS,GETRECOMMENDMVS,GETINFOOFMVS,GETMUSICLIST,GETALLMUSIC,GETURLLYRIC,GETPLAYINGMV,GETNEXTPAGE,GETMVARTIST,GETHOTCOMMENTS,GETRESULTBYKEY,GETMVSBYKEY,GETLISTSBYKEY} from './mutationType'

import axios from 'axios'


//热门歌单 https://autumnfish.cn//top/playlist/?order=hot&cat=%E5%85%A8%E9%83%A8%E6%AD%8C%E5%8D%95


//给所有axios请求都加上前缀，即请求的接口，在config/index.js prosyTable中配置，用于解决跨域请求的问题
// axios.defaults.baseURL = 'https://autumnfish.cn/'
axios.defaults.baseURL = '/api'

//获取轮播图
const getBannerByTpye = "/banner?type=0"
//获取推荐歌单
const getRecommendsByType = "/top/playlist/?order=hot&cat="
//获取推荐mv
const getRecommendMVs = "/mv/all/?limit=6&offset="
//获取歌单详情
const getMusicList = "/playlist/detail?id="
//获取Mv信息
const getInfoOfMVs = "/mv/detail/info?mvid="
//获取歌单内的歌曲
const getAllmusic = "/song/detail?ids="
//获取歌曲url
const getMusicUrlById = "/song/url?id="
//获取歌曲歌词
const getMusicLyricById = "/lyric?id="
//获取歌曲其他信息
const getMusicInfoById = "/song/detail?ids="
//获取Mv相关信息
const getAllOfMV = "/mv/detail?mvid="
//获取mv播放地址
const getMvById = "/mv/url?id="
//获取mv作者信息
const getmvartist = "/search?type=100&keywords="
//获取mv评论
//offset可以规定从第几个开始取评论
const getCommentsOfMV = "/comment/mv?id="
//获取相似mv
const getsimimvs = "/simi/mv?mvid="

//通过关键词获取搜索结果
const getResultByKey = "/search?limit=20&keywords="

const getTypes = "/playlist/catlist"

const getMusicById = "/"

export default {

    getCards({state,dispatch},e){ 
        //内容高度
        let cont = e.target.scrollHeight
        //可见高度（显示在页面上的高度，外层容器的高度）
        let warp = e.target.offsetHeight
        //滚动的距离
        let scroll = e.target.scrollTop
        //内容高度 = 滚动高度 + 可见高度 ，就说当滚动到底时，scroll = cont + warp
        //这里一开始没理解，以为滚动的距离就应该是内容的高度。然后想了想，其实这就好比做电梯，从3楼到1楼，移动的距离其实只有2层楼高，但3楼的高度，是移动的高度，在加上一层楼的高度，这里一层楼高，就是一个视窗的高度
        if(Math.round(scroll) >= cont - warp - 1){
            state.isbottom = true     
            this.isbottom = true
            let mvtypes = state.mvtypes
            state.mvtypes.offset = state.mvtypes.limit * ( state.mvtypes.mvpage ++  )
            dispatch('getMoreCards',{mvtypes})
        
          
        }
    },
    async getMoreCards({state,dispatch},{mvtypes}){
      await dispatch('getRecommendMVs',{mvtypes}) 
        if(!state.nomore){
            state.isbottom = false
        }
    },



    //获取歌单
    getmore({state,dispatch},e){
        let cont = e.target.scrollHeight
        let wrap = e.target.offsetHeight
        let scroll = e.target.scrollTop
        if( Math.round(scroll) >= cont - wrap - 1){
            state.isbottom = true
            let type = state.type
            let limit = 30
            let offset = limit * ( state.plpage ++ )
            dispatch('getByOffset', {limit,type,offset})
        }
    },
    async getByOffset({state,dispatch},{limit,type,offset}){
        await dispatch('getRecommends', {limit,type,offset})
        if(!state.nomore){
            state.isbottom = false
        }
    },


    getTypes({commit}){
        axios.get(getTypes).then((response) => {
            let alltypes = response.data
            commit(GETTYPES,{alltypes})
        },(reject) => {

        })
    },

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
    async getRecommends({commit},{limit,type,offset}){
        return new Promise((resolve,reject) => {
            axios.get(getRecommendsByType + type + "&limit=" + limit + "&offset=" + offset).then((response) =>{
                let recommends = response.data.playlists
                commit(GETRECOMMENDS,{recommends,offset})
                resolve()
            },(error) => {

            })
        })
       
    },
    //获取推荐mv
    async getRecommendMVs({commit},{mvtypes}){
        return new Promise((resolve,reject) => {
             axios.get("/mv/all/?limit=" + mvtypes.limit + "&area="+ mvtypes.area + "&type="+ mvtypes.type + "&order="+ mvtypes.order + "&offset=" + mvtypes.offset ).then((response) =>{
                let recommendMVs = response.data.data
                let offset = mvtypes.offset
                commit(GETRECOMMENDMVS,{recommendMVs,offset})
                resolve()
            },(error) => {

            })
        })
    },
     //获取推荐mv
     async getMoreMVs({commit}){
        return new Promise((resolve,reject) => {
             axios.get(getRecommendMVs).then((response) =>{
                let recommendMVs = response.data.data
                commit(GETRECOMMENDMVS,{recommendMVs})
                resolve()
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
    async getAllMusic({commit,state},{page}){
        return new Promise((resolve,reject) => {
            //获取歌单内所有歌曲id,这个请求需要获取歌曲id进行请求，因此这里把歌曲id拼接起来，一起请求
            let allMusicIds = ''
            let length = state.musiclist.trackIds.length
            let maxLength =  20*page > length ?  length : 20*page
            for(let i = 20*(page-1) ;i < maxLength ;i ++){
                allMusicIds =  allMusicIds + ','+  state.musiclist.trackIds[i].id
            }
            allMusicIds = allMusicIds.slice(1)
        
           
            //通过id获取歌单内所有歌曲信息
            axios.get(getAllmusic + allMusicIds).then((response) => {
                let allmusic = response.data.songs
                commit(GETALLMUSIC,{allmusic,page})
                resolve()
            }),(error) => {

            }
        })
       
    },
    //获取播放歌曲的url和歌词
    async getUrlLyric({commit},id){

        return new Promise((resolve,reject) => {
             axios.all([
                axios.get(getMusicUrlById + id),
                axios.get(getMusicLyricById + id),
                axios.get(getMusicInfoById + id),
            ]).then(axios.spread((response1,response2,response3) => {
                let playingurl = response1.data.data[0].url  
                let playingpic =  response3.data.songs[0].al.picUrl;
                let playinglyric = response2.data.nolyric ? "暂无歌词" : response2.data.lrc.lyric
                commit(GETURLLYRIC,{playingurl,playinglyric,playingpic})
                resolve()
            }))
        })
       
    },
    //获取mv相关内容
    async getPlayingMV({commit},mvid){
        return new Promise((resolve,reject) => {
             axios.all([
                axios.get(getAllOfMV  + mvid),
                axios.get(getMvById + mvid),
                axios.get(getCommentsOfMV  + mvid),
                axios.get(getsimimvs  + mvid),
                axios.get(getInfoOfMVs + mvid )
            ]).then(axios.spread(function(response1,response2,response3,response4,response5){
                let mv = response1.data.data
                let mvurl = response2.data.data.url;
                let newcomments = response3.data.comments
                let simvs = response4.data.mvs
                let likedCount = response5.data.likedCount 
                commit(GETPLAYINGMV,{mv,mvurl,newcomments,simvs,likedCount})
                resolve()
            }))
        })
       
    },

    //获取mv作者相关信息
    getmvartist({commit},artistName){
        axios.get(getmvartist + artistName).then((response) => {
            let artists = response.data.result.artists
            commit(GETMVARTIST,{artists})
        },(error) => {

        })
    }, 


    //获取下一页评论
    async getNextPage({commit},{offset,mvid}){
        return new Promise((resolve,reject) => {
             axios.get("/comment/mv?offset=" + offset + "&id=" + mvid ).then((response) => {
                let nextpage = response.data.comments
                commit(GETNEXTPAGE,{nextpage})
                resolve()
            },(error) => {

            })
        })
       
    },
    //获取热门评论
    getHotComments({commit},{mvid,type}){
        axios.get("comment/hot?limit=10&id=" + mvid + "&type=" + type).then((response) => {
            let hotcomments = response.data.hotComments
            commit(GETHOTCOMMENTS,{hotcomments})
        },(error) => {

        })
    },

    //主页中搜索
    async getResultByKey({commit,state},{offset,type}){
        return new Promise((resolve,reject) => {
            let keyword = state.keyword
            axios.get( getResultByKey + keyword + "&type=" + type + "&offset=" + offset).then((response) => {
                if(type === 1){
                    //根据关键词查歌曲
                    let songs = response.data.result.songs
                    commit(GETRESULTBYKEY,{songs,offset})   
                }else if(type === 1004){
                    //根据关键词查mv
                    let mvs = response.data.result.mvs
                    commit(GETMVSBYKEY,{mvs,offset})
                }else if(type === 1000){
                    //根据关键词查歌单
                    let playlists = response.data.result.playlists
                    commit(GETLISTSBYKEY,{playlists,offset})
                }
                resolve()
            },(error) => {

            })
        })
        
    },
}