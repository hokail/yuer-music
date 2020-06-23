<template>
<div>
    <div v-for="(tags,index) in mvtags" :key="index">
        <p class="tags-name">{{tags.name}}</p>
        <div>
            <p class="tags" v-for="(tag,i) in tags.tag" :key="i"  :class=" ((tag === mvtypes.area && tags.name === '地区')  ||(tag === mvtypes.type && tags.name === '类型') || tag === mvtypes.order) ? 'bechosed' : ''  " @click="changeType(tags,tag)">{{tag}}</p>
        </div>
    </div>
</div>
</template>

<script>
   export default {
       data(){
            return{
               mvtags: [
                    {
                        name:'地区',
                        tag:[
                            '全部',
                            '港台',
                            '内地',
                            '欧美',
                            '日本',
                            '韩国'
                        ],
                    },
                    {
                        name:'类型',
                        tag: [
                            '全部',
                            '官方版',
                            '原生',
                            '现场版',
                            '网易出品',
                        ],
                    },
                    {
                        name:'排序',
                        tag:[
                            '上升最快',
                            '最热',
                            '最新'
                        ]
                    }
                 ],
            }
        },
        computed: {
            mvtypes(){
                return this.$store.state.mvtypes
            }  
        },
        methods: {
            changeType(tags,tag){
                console.log(tags.name);
                console.log(tag);
                if( tags.name === '地区'){
                     this.$store.state.mvtypes.area = tag
                }else if( tags.name === '类型'){
                     this.$store.state.mvtypes.type = tag
                }else if( tags.name === '排序'){
                     this.$store.state.mvtypes.order = tag
                }
            },
          
        }
   }
</script>

<style>

.tags-name{
    font: .36163rem/.72325rem "微软雅黑";
    margin: .36163rem;
}
.tags{
    display: inline-block;
    padding: .12054rem .36163rem;
    margin: .24108rem;
    font: .33752rem "微软雅黑";
    background-color: rgb(238, 238, 238);
    border-radius: .36163rem;
    text-align: center;
}
.tags > a{
    color: black;
}
.tags > a:active{
    color: black;
}
.bechosed{
    background-color: rgb(248, 13, 13);
    color: white;
}
</style>