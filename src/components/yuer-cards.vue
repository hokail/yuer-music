<template>
<div id="yuer-cards">
    <div id="cards-header">
        <p class="title">精彩MV</p> <p class="title refresh">获取新内容</p> 
    </div> 
    <hr class="splitline">
    <div class="card" v-for="(mv,index) in recommendMVs" :key="index">
        <div id="mv">
            <img :src="mv.picUrl" >
            <div id="infoOfMv">
                <span >{{mv.name}}</span>
                <span>by.{{mv.artistName}}</span>
            </div>
        </div>
        <div id="about">
            <!-- 
                {{getInfoOfMv(mv.id)}} 
                因为每次for循环渲染时，需要根据每次的不同mv.id来获取mv相关信息，所以想要每次渲染时执行一次getInfoOfMv(mv.id)函数。因此写在了这里
                但经过验证，写在这里会导致函数无限被调用

                猜测原因：把methods里的方法，写在查值表达式中，实际上就相当于当作计算属性来使用了。
                    也就是说，如果和这个方法的有关的值改变了，那么这个函数就会自动调用一次。

                    在这里，getInfoOfMv(mv.id)执行一次后，改变了data中likedCount的值，而因为getInfoOfMv(mv.id)被当作计算属性使用，
                    它的值又与likedCount有关，likedCount改变又会让函数调用一次，这样就陷入了死循环，函数被无限调用
            -->
            <img src="../assets/imgs/thumb.png" alt="" class="thumb cardIcon" >
            <span>{{mv.likedCount}}</span>
            <img src="../assets/imgs/commend.png" alt="" class="commends cardIcon">
            <span>{{mv.commentCount}}</span> 
        </div>
    </div>
</div>
</template>

<script>



import axios from 'axios'
   export default {
       data(){
            return{
             
            }
        },
        mounted () {
            this.getMVs()
        },
        computed: {
            recommendMVs(){
                return this.$store.state.recommendMVs
            },
        },
        methods: {
            
            async getMVs(){
                //获取推荐mv
                await this.$store.dispatch('getRecommendMVs')

                /*
                    这里原本是想在渲染的时候，通过v-for 的数组  recommendMVs ，直接获取mv.id,作为参数，调用一个函数来获取信息，把信息作为返回值传回去，
                    这样就可以通过查值表达式来获取数据了
                    但是由于获取信息是异步的，无法获取结果。使用promise虽然可以保证得到结果，但却不能使用返回值返回结果，这就不能通过查值表达式
                    的方式来调用这个函数了

                    所以这里使用了其他方法，就是在获取到 mv 数组后，对每个 mv 进行ajax，获取对应的信息。
                    然后直接把信息作为属性动态的添加到 v-for 的数组  recommendMVs 中去，这样就可以和其他内容一样，通过 v-for 来取出信息了

                    1.使用ajax获取推荐mv---（就是上面的那一行代码）
                    2.对每个mv使用ajax，获取相关信息
                    3.把相关信息直接作为属性，添加回这个mv对象中

                    但是 recommendMVs 是由第一个ajax获取到的，算是已经存在的数组对象了，所以直接添加属性的话，是不能反映到视图上的，因此
                    要使用 Vue.set 的方法，给 mv 对象添加属性
                */
                this.$store.dispatch('getInfoOfMVs')
            }
        }
   }
</script>

<style>
#yuer-cards,.card{
    width: 100%;
    overflow: hidden;
    box-shadow: 0 .062054rem .1054rem #cdcccc;

}
#about{
    margin-left: .37163rem;
    height: 15%;
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.cardIcon{
    height: .47217rem;
}
.card{
    height:7.52712rem;
    margin-bottom: .36163rem;
}
#mv{
    height: 75%;
    width: 90%;
    margin: .47217rem  5% 0 5%;
    border-radius: .24108rem;
    background-color: rgb(235, 239, 253);
}
#infoOfMv{
    height: 17%;
    display: flex;
    align-items: center;
}
#infoOfMv > span{
    font-size: .36163rem;
    margin: 0 2%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
#infoOfMv > span:nth-child(1){
    width: 85%;
    font-weight: bold;
}
#infoOfMv > span:nth-child(2){
    font-size: 12px;
    color: gray;
    width: 17%;
}
#mv > img{
    height: 80%;
    width: 100%;
    border-radius: .24108rem .24108rem 0 0;
}
#cards-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#cards-header > p{
    display: inline-block;
}
.refresh{
    font-size: 15px;
}
</style>