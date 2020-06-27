<template>
<div class="listmain" @click.stop="">
    <ul>
        <li v-for="(music,index) in allmusic" :key="index">
            <div class="list-music">
                <span class="num">{{index + 1}}</span>
                <!-- <router-link :to="{ name:'player', params:{musicindex: index + 1}}" class="toplay"> -->
                   <div class="music-name " @click="gotoplay(index + 1)" >
                        <p>{{music.name}}</p>
                        <div class="tag-author">
                           
                            <img class="tag" src="../../assets/yuer-musiclist/dujia.png" alt=""> 
                            <img v-if="music.cd === '1'" class="tag" src="../../assets/yuer-musiclist/vip.png" alt=""> 
                            <!-- <img class="tag" src="../../assets/yuer-musiclist/sq.png" alt=""> -->
                            <p class="author-name">{{ music.ar ? music.ar[0].name :music.artists[0].name}}</p>
                        </div>
                    </div>
                <!-- </router-link> -->
                <img v-if=" music.mv !== undefined ? music.mv !== 0 : music.mvid !== 0" class="mv-list" src="../../assets/yuer-musiclist/mv-list.png" alt="" @click.stop="musicMv(music.mv ? music.mv  : music.mvid)">
                <img class="option" src="../../assets/yuer-musiclist/option.png" alt="">
            </div>
        </li>
    </ul>
</div>
</template>

<script>

   export default {
       data(){
            return{

            }
        },
        computed: {
          allmusic(){
              
              //渲染列表时，进行判断，当在搜索界面并且是在歌单搜索界面时，显示歌单搜索结果，其余清空都显示所有歌曲
              return  this.$store.state.issearch && !this.$store.state.isMainSearch ? this.$store.state.searchresult : this.$store.state.tempAllMusic
          }  
        },
        methods: {
            //编程式导航
            gotoplay(musicindex){
                //如果不再播放页，那么就跳转到播放页，否则的话，就只改变播放的歌曲
                if( this.$route.path.search('player') === -1){
                   
                      //当歌曲为歌单外的歌曲时，让参数使用搜索关键词
                    if(this.$route.params.musiclistid === undefined){
                        this.$route.params.musiclistid = this.$store.state.keyword
                    }
                    this.$router.push({
                            name:'player',
                            params:{
                                musicindex,
                            }
                    })

                }

                //当播放歌单和播放歌曲都没有改变时               
                this.$store.state.isChanged = ((this.$store.state.musiclistid != this.$route.params.musiclistid) || (musicindex !== this.$store.state.musicindex) ? true : false) 
                //更新播放歌曲的index
                this.$store.state.musicindex = musicindex
                //更新播放歌曲列表的名称
                this.$store.state.musiclistid = this.$route.params.musiclistid
                //开始播放时，更新播放列表
                this.$store.state.allmusic = this.$store.state.tempAllMusic
            },
            musicMv(mvid){
                this.$router.push({
                    name:'mv',
                    params:{
                        mvid 
                    }
                })
            }
        }
     
   }
</script>

<style>
@import '../../css/yuer-listmain.css';
</style>