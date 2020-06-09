
//在外部js中使用vuex中的数据，导入store即可 
//如果引入的话，就可以在外部js中的回调函数使用store中的数据
import store from '../store/index.js'

/*
    这里不能把添加监听事件放在initLyric中一起执行，因为如果每次播放歌曲时都添加监听，那么就会重复添加监听事件，
    而且之前的监听事件没有被覆盖。因此只能再创建这个audio时，添加一次这个监听，
    而再每次播放时，更新这个监听需要用的数据，即歌词时间部分的数组，并且把歌词滚动条初始化
    
    对再多个地方（组件中，或者不同的js模块中）都会用到的数据，就可以使用vuex，把数据都放到store中，这样的话，就可以在一个地方来更新另一个地方的数据

    这里监听用到了歌词的时间数组，这个数组需要分割原歌词数组来拿到。如歌在监听中获取这个数组的话，再分割的话，会耗费较大的资源，
    这里就是在初始化歌词滚动条的时候，获取并分割原数组，存到store中，这样当播放歌曲时。这个监听就直接从store获取数组，不用再自己进行分割操作了
*/

export function scrollLyric(){
    
    let timerid 

    //在外部js中，可以获取到组件中的标签，不过要保证在标签渲染之后获取
    const audioPlayer = $('#audioPlayer')[0]
    const lyricscroll = $('#lyricscroll')

    //加监听，让歌词滚动
    
    audioPlayer.addEventListener("timeupdate",() => {
        let arrTimeOfLyric = store.state.arrTimeOfLyric
        let currentIndex = store.state.currentIndex
        let currentTime = audioPlayer.currentTime * 1
        // console.log(currentIndex,currentTime,arrTimeOfLyric[currentIndex]* 1);
        
        //因为timeupdate时间变化很快，因此使用时间间隔进行比较。即当播放时间大于下一句的时间时，歌词下移一次
        //歌曲时间增加时，歌词向下滚动
        if( currentTime > (arrTimeOfLyric[currentIndex]) * 1){ 
            //使用scroll控制滚动条移动
            //在歌词走到第四句的时候，才开始滚动条滚动，从而使当前唱的这一句歌词显示在歌词区域的中间。不这样的话，会显示在歌词区域的第一行
            if(currentIndex >= 6){
                // console.log('滚动了-----------');
                lyricscroll[0].scrollTo(0,store.state.currentPosition)

                //使用setInterval,让歌词每20ms滚动1px，这样向下滚动一行时，就会有一个缓慢变化的过程，看起来更好
                let i = 0
                timerid = setInterval(() => {
                    if(i === 30){
                        clearInterval(timerid)
                    }else{
                        i++
                        lyricscroll[0].scrollBy(0,1)
                    }
                }, 10);
               

                //记录滚动条的位置，如果手动拉动了歌词，滚动条位置会与歌曲播放时间不同。这里记录同步时的位置，从而让歌词在每次滚动前，都回到与歌曲时间同步的位置
                store.state.currentPosition += 30 
            }
            
            store.state.currentIndex = currentIndex + 1
        }
        //歌词时间减少时，歌词向上滚动
        else if(currentTime < (arrTimeOfLyric[currentIndex-1]) * 1){
            if(currentIndex >= 3){
                // console.log('滚动了-----------');
                lyricscroll[0].scrollTo(0,store.state.currentPosition)
                lyricscroll[0].scrollBy(0,-30)
                store.state.currentPosition -= 30 
            } 
            store.state.currentIndex = currentIndex - 1
        }
    })

    audioPlayer.addEventListener('ended', () =>{
        clearInterval(timerid)
    })

    
}