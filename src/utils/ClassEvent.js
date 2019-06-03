export class ClassEvent {
  constructor(){
    this._events = {}
  }

  on(name, fn) {
    if(!this._events[name]) this._events[name] = new Array()
    this._events[name].push(fn)
  }

  trigger() {
    let args = [...arguments]
    let name = args.shift()

    args.push(new Event(name))
    if(this._events[name] instanceof Array) {
      this._events[name].forEach(fn=>{
        fn.apply(null, args)
      })
    }
  }
}