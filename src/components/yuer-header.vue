<template>
    <div id="yuer-header">
        <img src="../assets/imgs/title.png" alt="" class="header-title">
        <img src="../assets/imgs/yuer-search.png" alt=""  class="header-pic" @click="toMainSearch">
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    mounted () {
        //进入主页面时，把所有搜索结果清空
        this.$store.state.allmusic = []
        this.$store.state.mvs = []
        this.$store.state.playlists = []
    },
    methods: {
        toMainSearch(){
            this.$router.push({
                name:'mainSearch'
            })
            this.$store.state.isMainSearch = true
        }
    }
    
}
</script>

<style>

@import "../css/yuer-header.css";

</style>
