<template>
    <div id="middle-rotchare">
        <img :src="pics[index]" alt="" class="rotchartPic" @touchstart="touchChart" @touchmove="touchmove" @touchend="touchend">
    </div>
</template>

<script>
   export default {
       data () {
           return {
               pics:[
                  'http://p1.music.126.net/-aeHKeigf-Gla7oCYEsaEw==/109951165026366650.jpg?imageView&quality=89',
                  'http://p1.music.126.net/n94CKw4gcYNNGSI7llV9fw==/109951165025157472.jpg?imageView&quality=89',
                  'http://p1.music.126.net/Yrolzvo7u-J1S8u4m_C6rA==/109951165027148841.jpg?imageView&quality=89',
                  'http://p1.music.126.net/FqmhhrvFN0nYifZOvOKKkA==/109951165025154727.jpg?imageView&quality=89',
                  'http://p1.music.126.net/MiYZ9fBvai7WVzFnnwibAw==/109951165025147291.jpg?imageView&quality=89'
               ],
               index:0,
               //touch是否结束，用于判断是点击还是拖拽
               istouchend:false,
               //touchmove开始时的点击位置
               ortouchX:0,
               //touchmove结束时的点击位置，但是如果没有拖拽的话，这个值为0
               entouchX:0,
               //定时器
               chart:""
           }
       },
       mounted () {
            //开启定时器
            this.autoChart()
       },
       methods: {
           //设置定时器
            autoChart(){
                this.chart = setInterval(() => {
                    if( this.index < this.pics.length-1){
                        this.index ++
                    }else{
                        this.index = 0
                    }
                },5000)
            },
            //触摸事件开始
            touchChart(e){
            //判断点击时长，如果长时间点击就触发拖拽事件，短时间点击就触发点击事件
                //触发点击事件后，必须先把this.istouchend变为false 因为这时一个新的事件开始了。还未执行touchend，所以要保证this.istouchend为false
                //不在这里设置的话，上一次事件结束之时执行的 touchend() 会把this.istouchend变为true，那么判断就始终在true里了
                this.entouchX = this.ortouchX = e.touches[0].clientX
                //touchmove中获取一个移动后的值，然后把start的值还有move的值，都传给end在end
                clearInterval(this.chart)
            },
            //触摸移动世界
            touchmove(e){
                this.entouchX = e.touches[0].clientX
            },
            //点击触摸事件
            shortTouch(e){

            },
            //拖拽事件
            dragTouch(){  
                if(this.entouchX > this.ortouchX ){
                    if( this.index-1 < 0 ){
                        this.index = this.pics.length-1
                    }else{
                        this.index--
                    }
                }else{
                    if( this.index < this.pics.length-1){
                       this.index ++
                    }else{
                        this.index = 0
                    }
                }
            },
            //触摸事件结束
            touchend(e){
                /*
                    这个判断必须在touchmouve之后进行，不能再touchstart里进行

                    如果再touchstart里执行的话，会在判断为拖拽（即长时间点击）后执行拖拽时的动作。
                    但点击的一瞬间，利用定时器判断为拖拽后，会立即执行函数。而不是在move之后才去执行函数，
                    这就导致还没有执行move事件，this.entouchX的值不能正确的获取到，还是初始值
                    
                    这里不用定时器来判断是拖拽还是点击，使用定时器根据点击时间长短判断的话，要注意在touchend事件中时设置标记istouchend,根据istouchend为true的发生时间
                    判断touch时间长短，并且在时间touchstart中进行判断前，要注意把先把istouchend初始化为false。否则的化，第一次touchend结束后，istouchend始终为true
                    不能再touchstart事件结束时设置istouchend为false，因为touchend在touchstart之后，它执行后就又把istouchend变为true了。
                */
                if(this.entouchX !== this.ortouchX ){
                    this.dragTouch()
                }else{
                    console.log("点击了");
                }

                //触摸事件结束。恢复定时器
                this.autoChart()
            }         
       }
   }
</script>

<style>
#middle-rotchare{
    height: 4.82169rem;
}
.rotchartPic{
    height: 4.33952rem;
    width: 95%;
    margin: .24108rem 2.5%;
    border-radius: .12054rem;
}
</style>