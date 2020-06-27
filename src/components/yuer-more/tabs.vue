<template>
    <div id="tabs">
        <div id="tab">
            <p v-for="(type,index) in types" :key="index"  :class=" ($store.state.type === type ||  (type ==='热门' && $store.state.type === '全部歌单' ) ) ? 'heightlight':''" @click="listByType(type)">{{type}}</p>                     
        </div> 
    </div>
</template>

<script>
export default {
    data(){
        return{
            types:[
                '热门',
                '华语',
                '流行',
                '摇滚',
                '民谣',
                '电子',
            ],
        }
    },
    methods: {
        listByType(type){
            type = type == '热门' ? '全部歌单' : type
            this.$store.state.type = type
            this.$store.dispatch('getRecommends',{limit:30,type,offset:0})
        }
    }
}
</script>

<style>

/* 
    横向滚动效果：
    1.两个容器
    2.内层容器宽度大于外层容器（内层必须是一个容器，因为文档流默认向下，没有内容容器的话，里面的子元素不会回自动向下排列）
*/

#tabs{
    position: relative;
    top: 8.2%;
    height: 6%;
    /* border: 1px solid black; */
    overflow-x: scroll;
    box-shadow: 0  1px 1px rgb(235, 239, 253);
    margin:  1.5% 0 ;
}
#tabs::-webkit-scrollbar {
	width: 0;     
	height: 0;	
}
#tab{
    display: flex;
    align-items: center;
    justify-content: space-around; 
    flex: 1;
    height: 100%;
    width:  520px;
}
/* #tab > a{
    
    height: 100%;
    text-decoration: none;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
}   */
#tab  > p { 
    text-align: center;
    color: gray;
    font-size:  13px;
    height: 100%;
    display: flex;
    align-items: center;
}

#tab  > .heightlight{
    font-size:  16px;
    color: black;
    border-bottom: 2px solid red;
}

</style>