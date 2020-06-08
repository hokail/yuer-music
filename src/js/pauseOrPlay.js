
import $ from 'jquery'

export function pauseOrPlay(){
    const audio = $('#audioPlayer')[0]

    if(!audio.paused){
        audio.pause()
    }else{
        audio.play()
    }
}