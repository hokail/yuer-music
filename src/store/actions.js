
import {GETBANNERS,GETRECOMMENDS,GETRECOMMENDMVS,GETINFOOFMVS} from './mutationType'
import axios from 'axios'


const getBannerByTpye = "https://autumnfish.cn/banner?type=0"
const getRecommendsByType = "https://autumnfish.cn/top/playlist/?limit=6&order=hot&cat="
const getRecommendMVs = "https://autumnfish.cn/personalized/mv"
const getInfoOfMVs = " https://autumnfish.cn/mv/detail/info?mvid="

export default {


    //actions中，使用commit需要声明形参，并且需要以对象的形式，接收dipatch的参数是，则写在commit对象外
     getBanner({commit}){
        //使用axios需要先引入axio
        axios.get(getBannerByTpye).then(function(response){
            let banners = response.data.banners
            //用commit传参数，需要以对象的形式传，在mutations接收时，也要以对象形式接收
            commit(GETBANNERS,{banners})
        }),function(error){

        }
    
    },
    
    getRecommends({commit},type){
        axios.get(getRecommendsByType + type).then(function(response){
            let recommends = response.data.playlists
            commit(GETRECOMMENDS,{recommends})
        }).then(function(error){

        })
    },

    async getRecommendMVs({commit}){
        return new Promise((resolve,reject) => {
             axios.get(getRecommendMVs).then(function(response){
                let recommendMVs = response.data.result
                commit(GETRECOMMENDMVS,{recommendMVs})
                resolve()
            }).then(function(error){

            })
        })
    },
    getInfoOfMVs({commit,state},type){
        //对每个得到的mv，获取它的相关信息
        state.recommendMVs.forEach( (mv,index) => {
            axios.get(getInfoOfMVs + mv.id ).then(function(response){
                let likedCount = response.data.likedCount
                let commentCount =  response.data.commentCount
                commit(GETINFOOFMVS,{likedCount,commentCount,index})
            }).then(function(error){

            })
        })
        
    },
}