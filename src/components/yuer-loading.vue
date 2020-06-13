<template>
<div id="loading-box">
    <div id="loading-dots">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    </div>
    <p> 努力加载中 ···</p>
</div>

</template>

<script>
export default {
    data(){
        return{

        }
    },
    mounted () {
        this.loadinit()
    },
    methods: {
        loadinit(){
            let dots = document.querySelectorAll('.dot')
		    dots.forEach((dot,index) => {
			//animation的总时间
			let total = .8
			//每个点的延迟时间
			let delay = .1
			dot.style.transform = `translate(${Math.sin(Math.PI*index/4)*10}px,${-Math.cos(Math.PI*index/4)*10}px)`
			dot.style.animation = `wave ${total}s ${delay*(index-1)}s linear infinite both`
		}) 
        }
    }
}
</script>

<style>
#loading-box{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
#loading-dots {		
    background-color: transparent;	
    height: 40px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.dot{
    position: absolute;
    border-radius: 50%;
    height: 3px; 
    width: 3px;
    background-color: red;
}

@keyframes wave{
    0%{
        opacity: 0;
    }
    50%{
        opacity: 1;
    }
    100%{
        opacity: 0;
    }
}
</style>