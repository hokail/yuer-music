
import {GETBANNERS,GETRECOMMENDS,GETRECOMMENDMVS,GETINFOOFMVS} from './mutationType'

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

export default {


    //actions中，使用commit需要声明形参，并且需要以对象的形式，接收dipatch的参数是，则写在commit对象外
     getBanner({commit}){
        //使用axios需要先引入axio
        axios.get(getBannerByTpye).then((response) => {
            let banners = response.data.banners
            //用commit传参数，需要以对象的形式传，在mutations接收时，也要以对象形式接收
            commit(GETBANNERS,{banners})
        }),(error) => {

        }
    
    },
    
    getRecommends({commit},type){
        axios.get(getRecommendsByType + type).then((response) =>{
            let recommends = response.data.playlists
            commit(GETRECOMMENDS,{recommends})
        },(error) => {

        })
    },

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
    getInfoOfMVs({commit,state},type){
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
}