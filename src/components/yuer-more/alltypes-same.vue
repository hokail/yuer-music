<template>
<div id="type">
    <p class="types" v-for="(sub,i) in subs" :key="i" @click="getListByType(sub.name)"><router-link :to="{name:'listByType',params:{type:sub.name}}">{{sub.name}}</router-link></p>
</div>
</template>

<script>

   export default {
       props:['index'],
        components: {
        },
        computed: {
            alltypes(){
                return this.$store.state.alltypes
            },
            subs(){
                return  this.$store.state.alltypes.sub.filter( sub => 
                    sub.category == this.index
                )
            }
        },
        methods: {
            getListByType(type){ 
                this.$store.state.type = type
                this.$store.dispatch('getRecommends',{limit:30,type})
            }
        }
       
   }
</script>

<style>
#type{
    width: 100%;
    flex-wrap: wrap;
    /* 不允许换行的话，内容会超出容器外 */
}
.types{
    display: inline-block;
    padding: 5px 15px;
    margin:10px;
    font: 15px "微软雅黑";
    background-color: rgb(238, 238, 238);
    border-radius: 15px;
    text-align: center;
}
.types > a{
    color: black;
}
.types > a:active{
    color: black;
}
</style>