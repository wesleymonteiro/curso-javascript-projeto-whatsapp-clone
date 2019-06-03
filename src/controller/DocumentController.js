const pdfjs = require('pdfjs-dist')
const path = require('path')
pdfjs.GlobalWorkerOptions.workerSrc = path.resolve(__dirname, '../../dist/pdf.worker.bundle.js')

export class DocumentController {
  constructor(file) {
    this._file = file
  }

  getPreviewData() {
    return new Promise((s, f)=>{
      let reader = new FileReader()
      switch(this._file.type) {
        case 'image/png':
        case 'image/jpeg':
        case 'image/jpg':
        case 'image/gif':
          reader.onload = e=>{
            s({
              src: reader.result,
              info: this._file.name
            })
          }
          reader.onerror = e=>{
            f(e)
          }
          reader.readAsDataURL(this._file)
          break;
        case 'application/pdf':
          reader.onload = e=>{
            pdfjs.getDocument(new Uint8Array(reader.result)).then(pdf=>{
              pdf.getPage(1).then(page=>{
                let viewport = page.getViewport(1)
                let canvas = document.createElement('canvas')
                let canvasContext = canvas.getContext('2d')
                canvas.setAttribute('height', viewport.height)
                canvas.setAttribute('width', viewport.width)
                page.render({
                   canvasContext,
                   viewport
                }).then(()=>{
                  s({
                    src: canvas.toDataURL('image/png'),
                    info: `${pdf.numPages} página(s)`
                  })
                }).catch(e=>{
                  f(e)
                })
              }).catch(e=>{
                f(e)
              })
            }).catch(e=>{
              f(e)
            })
          }
          reader.readAsArrayBuffer(this._file)
          break;
        default:
          f()
      }
    })
  }
}