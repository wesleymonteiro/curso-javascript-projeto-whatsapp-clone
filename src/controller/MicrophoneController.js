import { ClassEvent } from "../utils/ClassEvent";

export class MicrophoneController extends ClassEvent {
  constructor() {
    super()

    this._mimeType = 'audio/webm'
    this._available = false

    navigator.mediaDevices.getUserMedia({
      audio: true
    }).then(stream=>{
      this._available = true
      this._stream = stream
      this.trigger('play', stream)
    }).catch(error=>{
      console.error(error)
    })
  }

  isAvailable() {
    return this._available
  }

  stop() {
    this._stream.getTracks().forEach(track => {
      track.stop()
    });
  }

  startRecorder() {
    if (this.isAvailable()) {
      this._recorder = new MediaRecorder(this._stream, { mimeType: this._mimeType })
      this._recordedChunks = []
      
      this._recorder.addEventListener('dataavailable', e=>{
        if(e.data.size > 0)
          this._recordedChunks.push(e.data)
      })

      this._recorder.addEventListener('stop', e=>{
        let blob = new Blob(this._recordedChunks, { type: this._mimeType })
        let filename = `rec${Date.now()}.webm`
        let file = new File([blob], filename, {
          type: this._mimeType,
          lastModified: Date.now()
        })
      })

      this._recorder.start()
    }
  }

  stopRecorder() {
    if (this.isAvailable()) {
      this._recorder.stop()
      this.stop()
    }
  }
}