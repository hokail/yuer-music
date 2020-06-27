import {timeformat} from './timeFormat'

//在js中使用图片资源，需要将图片作为模块导入到js中，否则webpack无法正确将资源打包
import playIcon from '../assets/yuer-play/play.png' 
import pauseIcon from '../assets/yuer-play/pause.png'

import playIconBto from '../assets/yuer-play/playb.png' 
import pauseIconBto from '../assets/yuer-play/pauseb.png'


//再歌曲播放，把歌词位置重置
import {initLyric} from '../js/initLyric'
import store from '../store'


export function progressBarInit (){
   
    // const audio = document.querySelector('audio') 
    //使用jquery获取audio需要加上[0]，否则获取到的为undefined,
    //使用 $('#audio') 获取的是一个jquery对象，加上[0]则变为dom对象，只能用dom对象的方法
    const audio = $('#audioPlayer')[0]

    const progressBar = $('#progressBar')
    const progressDot = $('#progressDot')
    const audioCurTime = $('#audioCurTime')
    const audioTotTime = $('#audioTotTime')
    const progressBarBg = $('#progressBarBg')
    const playBtn = $('#playBtn')
    const playBtnBto = $('#playBtnBto')

    //音乐播放时的涟漪效果
    const wavelet = $('#detail > div')
    //歌曲封面图
    const musicPic = $('#musicPic')

    
    //播放结束进度条回到原点
    function musicEnd(){
        progressBar.width(0)
        progressDot.css('left',0)
        audioCurTime.html(timeformat(0))

    }

    //歌曲被删除时，重置进度条状态
    audio.addEventListener('emptied',function(){
        musicEnd()

        //歌曲播放完毕，删除动画
        wavelet.each(function (index) {
            $(this).css('animation',' ')
        })
        musicPic.css('animation',' ')
    })
    
    audio.addEventListener("canplay",function(){
        $('.musicBtn').css('pointer-events','auto')

        //歌曲开始播放开始，开启涟漪的动画
        wavelet.each(function (index) {
            $(this).css('animation',`wavelet 3s linear ${index*1.5}s infinite  `)
        })
        musicPic.css('animation',`rotatePic 5s linear  infinite  `)
    })

    //歌曲播放时，让时间和进度条自动改变
	audio.addEventListener("timeupdate",changbytime)
    function changbytime(){
        let per = (audio.currentTime/audio.duration) * 100 + '%'
        //更新时间和进度条
        reProgress(per)
    }

    
	//监听播放结束
	audio.addEventListener("ended",function(){
        musicEnd();
        playBtn.attr('src',playIcon)
        playBtnBto.attr('src',playIconBto)
        //歌曲结束后重置歌词的状态
        initLyric(store.state.musiclyric)
    })

    //播放时更新歌曲时间，和按钮
    audio.addEventListener("play",function(){
        audioTotTime.html(document.body.clientWidth <= 768 ? timeformat(audio.duration) :'/' + timeformat(audio.duration))
        playBtn.attr('src',pauseIcon)
        playBtnBto.attr('src',pauseIconBto)
        
        //恢复涟漪动画
        wavelet.each(function (index) {
            $(this).css('animation-play-state','running')
        })
        musicPic.css('animation-play-state','running')
        
       
    })

    audio.addEventListener("pause",function(){
        playBtn.attr('src',playIcon) 
        playBtnBto.attr('src',playIconBto)

        //暂停涟漪动画
        wavelet.each(function (index) {
            $(this).css('animation-play-state','paused')
        })
        musicPic.css('animation-play-state','paused')
    })
    
    
        //首先定义变量，定义事件类型，然后通过判断是在移动端还是电脑端，绑定不同类型的事件
        let startEvt,moveEvt,endEvt;
        //判断是在移动段还是电脑端
        (function(){
            if("ontouchstart" in window){
                startEvt = "touchstart";
                moveEvt = "touchmove";
                endEvt = "touchend";
            }else{
                startEvt = "mousedown";
                moveEvt = "mousemove";
                endEvt = "mouseup";
            }
        })();
      
        
        //初始化鼠标移动或拖拽时使用的变量，因为在外部被两个函数使用，因此定义在了外部
        let dotLeft,mouseX,maxLeft,maxRight,distance,barLength,barPer
        //拖拽更新进度条,这里因为jquery不支持touch方法，因此使用了事件监听
        progressDot[0].addEventListener(startEvt ,function(e){ 

        //开始拖动时，不让时间和进度条自动改变，因为在拖动时，歌曲会正常播放
        audio.removeEventListener("timeupdate",changbytime)
        
        barLength =  progressBarBg.width()
        if( !audio.paused || audio.currentTime != 0){
            dotLeft =  progressDot.position().left

            //在电脑端和移动端，clientX获取的方式不同
            if("ontouchstart" in window){
                mouseX = e.touches[0].clientX //拖动前位置
            }else{
                mouseX = e.clientX 
            }
           
            maxLeft = dotLeft //向左拖动最大距离
            maxRight = barLength - dotLeft //向右拖动最大距离    
        } 

        //阻止事件冒泡
        if (e && e.stopPropagation) {
            e.stopPropagation();
        } else {
            window.event.cancelBubble = true;
        }

        //阻止默认事件，防止在拖动过程中选中文字
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }

        //绑定移动时的监听事件
        document.addEventListener(moveEvt,dragProgress)
        //绑定拖动结束时的监听事件
        document.addEventListener(endEvt,removeDrag)
    })

    //当鼠标/拖拽移动时，计算移动的距离比例，更新歌曲当前播放的事件和进度条的位置
    function dragProgress(e){
        if("ontouchstart" in window){
            distance = e.touches[0].clientX  - mouseX//拖动后的位置减去拖动前的位置，得到移动的距离
        }else{
            distance = e.clientX - mouseX
        }
        
        if(distance > maxRight){
            distance = maxRight
        }else if( distance < -maxLeft ){
            distance = -maxLeft
        }
        barPer = ( distance + dotLeft ) / barLength 
        //拖动时，更新进度条
        reProgress((barPer * 100 + '%' ))
    }

    //进度条拖动结束后，移除拖动绑定的监听
    function removeDrag(){

        //停止拖动后才更新播放进度
        audio.currentTime = audio.duration * barPer
    
        //拖动结束后，恢复时间和进度条自动变化的监听
        audio.addEventListener("timeupdate",changbytime)
        
        //拖动结束后，解除绑定的事件
        document.removeEventListener(moveEvt,dragProgress)
        document.removeEventListener(endEvt,removeDrag)
    }

    // 更新进度条
    function reProgress(per){
        // let per = (audio.currentTime/audio.duration) * 100 + '%'
        progressBar.width(per)
        progressDot.css('left',per)
        audioCurTime.html(timeformat(audio.currentTime))
    }

    //点击调节进度
    //这个没有touchstart事件
    progressBarBg.mousedown(function(e){ 
        // 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以
        if (!audio.paused || audio.currentTime != 0) {
            let rate = e.offsetX / progressBarBg.width() 
            audio.currentTime = audio.duration * rate
            reProgress((rate  * 100 + '%' )) 
    }})
}


