<template>
    <div id="middle-rotchare" ref="middleRotchare" style="left:-100%;">     
            <img v-for="(item,index) in pics"  :key="index"  :src="item !== undefined ? item.imageUrl :'' " alt="" class="rotchartPic" @touchstart="touchChart($event,index+1)" @touchmove="touchmove" @touchend="touchend">
    </div>
</template>

<script>
   export default {
       data () {
           return {
               //图片数组序号
               index:1,              
               //touchmove开始时的点击位置
               ortouchX:0,
               //touchmove结束时的点击位置，但是如果没有拖拽的话，这个值为0
               entouchX:0,
               //拖动前的位置
               orileft:0,
               //定时器的id
               chartid:"",
               //轮播图长度
               Clength:9
           }
       },
        
       mounted () {
            //开启定时器
            this.autoChart()
            
       },
       beforeDestroy () {
           //组件销毁之前，清除轮播图定时器
            clearInterval(this.chartid)
       },
       computed: {
            pics(){
                let banners = this.$store.state.banners
                banners.push(banners[0])
                banners.unshift(banners[this.Clength-1])
                return banners
            }
       },
       methods: {
           //设置定时器
            autoChart(){
                this.chartid = setInterval(this.callback, 3000)
            },

            //定时器回调函数
            callback(){
                this.$refs.middleRotchare.style.transition = '1s'
                    if( this.index < this.Clength + 1){
                        this.index ++
                    }else{
                        this.index = 1
                    }
                    
                //滚动到下一张图
                this.toNextPic()

                //滚动到第1张图时，清除定时器，不然在第一张图会等待两倍的事件，(最后一张占位图的等待时间加上第一张图的等待时间)
                if(this.index == 1){
                    clearInterval(this.chartid)
                    this.chartid = setInterval(this.callback,0)
                }else{
                    clearInterval(this.chartid)
                    this.chartid = setInterval(this.callback,3000)
                }
                        
            },
            
            //滚动到下一张图
            toNextPic(){
                this.$refs.middleRotchare.style.left = `-${100*(this.index)}% ` 
                //当图片轮播到位于两边的占位图片时，等1s后（等待过渡动画执行完），跳到占位图片对应的原本的位置
                if( this.index == this.Clength + 1 ){
                    setTimeout(()=>{
                        this.jumpToPic(1)
                    },1000) 
                }else if(this.index == 0){
                    setTimeout(()=>{
                        this.jumpToPic(this.Clength)
                    },1000) 
                }
            },

            //跳到第一张或最后一张图片
            jumpToPic(n){
                this.$refs.middleRotchare.style.transition = '0s'
                this.$refs.middleRotchare.style.left = `-${100*n}% ` 
                this.index = n 
            },
        
            //触摸事件开始
            touchChart(e,id){
            //判断点击时长，如果长时间点击就触发拖拽事件，短时间点击就触发点击事件
                //触发点击事件后，必须先把this.istouchend变为false 因为这时一个新的事件开始了。还未执行touchend，所以要保证this.istouchend为false
                //不在这里设置的话，上一次事件结束之时执行的 touchend() 会把this.istouchend变为true，那么判断就始终在true里了
                
                /*
                    这个判断存在的目的是，当手动拖动到位于div两边的占位图片时，再次拖动时，瞬间回到占位图对应的图片原本的位置，而不时等1s
                    id为index+1,表示图片的序号
                */
                if(id == this.Clength + 2){
                    this.jumpToPic(1)
                }
                else if(id == 1){
                    this.jumpToPic(this.Clength)
                }else{
                     this.$refs.middleRotchare.style.transition = '1s'
                }


                //获取触摸时的位置，用于判断是否进行了拖动
                this.entouchX = this.ortouchX = e.touches[0].clientX
                //获取轮播图移动前的left值
                this.orileft = this.$refs.middleRotchare.offsetLeft
                //去掉拖拽时的过渡效果
                this.$refs.middleRotchare.style.transition = '0s'

                //清除定时器，取消自动轮播
                clearInterval(this.chartid)
                
            },

            //触摸移动事件
            touchmove(e){
                let tempX = this.orileft + this.entouchX - this.ortouchX
                this.entouchX = e.touches[0].clientX
                this.$refs.middleRotchare.style.left = tempX + 'px'
            },

            //点击触摸事件
            shortTouch(e){

            },
            //拖拽事件
            dragTouch(){  
                //判断是向左拖动还是向右拖动
                let oriindex = this.index
                // this.$refs.middleRotchare.style.transition = '1s'
                //向右拖动
                if(this.entouchX > this.ortouchX ){
                    if( this.index <= 0 ){
                        this.index = this.Clength
                    }else{
                        this.index--
                    }
                }
                //向左拖动
                else{
                    if( this.index < this.Clength + 1 ){
                       this.index ++
                    }else{
                        this.index = 1
                    }
                    
                }
                this.toNextPic()
                
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
                    this.$refs.middleRotchare.style.transition = '1s'              
                }else{
                    console.log("点击了");
                }

                //触摸事件结束。恢复定时器
                this.autoChart()
            },
            //删除数组的第一个元素，并添加到尾部，把数组变成一个循环，让轮播图头尾相连      
       }
   }
</script>

<style>
@import '../../css/yuer-middle-rotchart.css';

</style>