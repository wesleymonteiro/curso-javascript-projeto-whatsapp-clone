class WhatsAppController {
  constructor() {
    this.loadElements()
    this.elementsPrototype()
  }

  loadElements() {
    this.elements = {}

    document.querySelectorAll('[id]').forEach(el=>{
      this.elements[Format.getCamelCase(el.id)] = el
    })
  }
}