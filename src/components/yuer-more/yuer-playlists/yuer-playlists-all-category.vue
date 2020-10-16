<template>
<div id="alltypes">
    <Topback/>
    <div class="categories" v-for="(category,index) in alltypes.categories" :key="index">
        <p class="category">{{category}}</p>
        <Samekind :index="index"/>
    </div>
</div>
</template>

<script>
const Samekind = () => import('./yuer-playlists-category-tags');
const Topback = () => import('../ThetTopBack');

export default {
    components: {
        Samekind,
        Topback  
    },
    data(){
        return{

        }
    },
    computed: {
        alltypes(){
            return this.$store.state.alltypes
        },
        
    },
    mounted () {
        this.$store.dispatch('getTypes')
    },
    methods: {
       subs(i){
            this.$store.state.alltypes.sub.fliter( sub => {

            } )
        }
    }
}
</script>

<style>
#alltypes{
    position: absolute;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
}
.categories{  
    position: relative;
    top: 8.2%;
    width: 100%;
}
.category{
    font: 15px/30px"微软雅黑";
    margin: 15px;
}

</style>