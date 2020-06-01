<template>
<div id="yuer-bottom">
    <p>热门歌单</p>
    <hr>
    <div id="yuer-recomends">
        <recommendItem/>
        <recommendItem/>
        <recommendItem/>
        <recommendItem/>
        <recommendItem/>
        <recommendItem/>
    </div>
    
</div>
</template>

<script>
import recommendItem from './yuer-recommendItem'

export default {
    data(){
        return{

        }
    },
    components: {
        recommendItem
    }
}
</script>

<style>
#yuer-bottom{
    margin-top: .36163rem;
    height: 8.53796rem;
    width: 100%; 
}
#yuer-bottom > p{
    font: .48217rem "微软雅黑";
    margin-left: .40984rem
    ;
}
#yuer-bottom > hr{
    margin: .24108rem 0;
    height: .02411rem;
    border: 0;
    background-image: linear-gradient(90deg,transparent,red,transparent);
}
#yuer-recomends{
    width: 100%;
    box-shadow: 0 .12054rem .22054rem #cdcccc;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 5px;
}
</style>
