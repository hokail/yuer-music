
import store from '../store'

export function pauseOrPlay(){
    const audio = $('#audioPlayer')[0]

    if(!audio.paused){
        store.state.isPlaying = false
        audio.pause()
    }else{
        store.state.isPlaying = true
        audio.play()
    }
}