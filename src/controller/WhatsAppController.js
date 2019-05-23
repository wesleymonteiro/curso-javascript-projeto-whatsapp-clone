class WhatsAppController {
  constructor() {
    Prototype.initElementPrototypes()
    this.loadElements()
    this.initEvents()
  }

  loadElements() {
    this.elements = {}

    document.querySelectorAll('[id]').forEach(el=>{
      this.elements[Format.getCamelCase(el.id)] = el
    })
  }

  initEvents() {
    this.elements.myPhoto.on('click', e=>{
      this.closeAllLeftPanel()
      this.elements.panelEditProfile.show()
      setTimeout(()=>{
        this.elements.panelEditProfile.addClass('open')
      }, 100)
    })
    this.elements.btnNewContact.on('click', e=>{
      this.closeAllLeftPanel()
      this.elements.panelAddContact.show()
      setTimeout(()=>{
        this.elements.panelAddContact.addClass('open')
      }, 100)
    })
    this.elements.btnClosePanelEditProfile.on('click', e=>{
      this.elements.panelEditProfile.removeClass('open')
    })
    this.elements.btnClosePanelAddContact.on('click', e=>{
      this.elements.panelAddContact.removeClass('open')
    })
    this.elements.photoContainerEditProfile.on('click', e=>{
      this.elements.inputProfilePhoto.click()
    })
    this.elements.inputNamePanelEditProfile.on('keypress', e=>{
      if(e.key === 'Enter') {
        e.preventDefault()
        this.elements.btnSavePanelEditProfile.click()
      }
    })
    this.elements.btnSavePanelEditProfile.on('click', e=>{
      
    })
    this.elements.formPanelAddContact.on('submit', e=>{
      e.preventDefault()
      let formData = this.elements.formPanelAddContact.getForm()
    })
  }

  closeAllLeftPanel() {
    this.elements.panelAddContact.hide()
    this.elements.panelEditProfile.hide()
  }
}