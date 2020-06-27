<template>
 <!-- 
                {{getInfoOfMv(mv.id)}} 
                因为每次for循环渲染时，需要根据每次的不同mv.id来获取mv相关信息，所以想要每次渲染时执行一次getInfoOfMv(mv.id)函数。因此写在了这里
                但经过验证，写在这里会导致函数无限被调用

                猜测原因：把methods里的方法，写在查值表达式中，实际上就相当于当作计算属性来使用了。
                    也就是说，如果和这个方法的有关的值改变了，那么这个函数就会自动调用一次。

                    在这里，getInfoOfMv(mv.id)执行一次后，改变了data中likedCount的值，而因为getInfoOfMv(mv.id)被当作计算属性使用，
                    它的值又与likedCount有关，likedCount改变又会让函数调用一次，这样就陷入了死循环，函数被无限调用
            -->
 <div id="about">
    <img src="../../assets/yuer-mv/mv-thumbs.png" alt="" class="thumb cardIcon" >
    <span>{{mvCount(likedCount)}}</span>
    <img src="../../assets/yuer-mv/mv-comment.png" alt="" class="commends cardIcon">
    <span>{{mvCount(commentCount)}}</span> 
</div>
</template>

<script>

import axios from 'axios'
axios.defaults.baseURL = 'https://autumnfish.cn/'
const getInfoOfMVs = "/mv/detail/info?mvid="

   export default {
       props: {
           mvid:Number
       },
       data(){
            return{
                likedCount:0,
                commentCount:0
            }
        },
        computed: {
          
        },
        mounted () {
            this.getInfoOfMVs()
        },
        methods: {
            mvCount(Count){
                return Count > 10000 ?  String(Count).slice(0,-4)+'万' : Count
            },
            /*
                这个ajax要放在这里
                
                这个组件在card组件中使用了，

                card中v-for生成了卡片，这个是卡片组件的一部分

                不同卡片的数据是不同的，如果把ajax放在action里，得到的结果放在state中，那么所有卡片都会用那个结果，所有卡片的数据源都是相同的。
                而之后ajax获得的结果，会覆盖掉上一次查询的结果，最后导致所有卡片的结果都是最后一次查询得到的结果
                
                把这个ajax写在这里，得到的数据也写在data中，那么不同卡片的数据就存放在了一个个独立的组件中，数据就不会被覆盖了
            */
            getInfoOfMVs(){
                axios.get(getInfoOfMVs + this.mvid ).then((response) =>{
                    this.likedCount = response.data.likedCount
                    this.commentCount =  response.data.commentCount
                },(error) => {

                })
            }
        }
   }
</script>

<style>
#about{
        margin-left: 5%;
        height: 17%;
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 12px;
}
#about > .cardIcon{
    height: 20px;
}
</style>