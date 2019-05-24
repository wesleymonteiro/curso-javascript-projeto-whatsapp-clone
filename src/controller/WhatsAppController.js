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
    this.elements.contactsMessagesList.querySelectorAll('.contact-item').forEach(item=>{
      item.on('click', e=>{
        this.elements.home.hide()
        this.elements.main.css({display: 'flex'})
      })
    })
    this.elements.btnAttach.on('click', e=>{
      e.stopPropagation()
      this.elements.menuAttach.addClass('Open')
      document.addEventListener('click', this.closeMenuAttach.bind(this))

    })
    this.elements.btnAttachPhoto.on('click', e=>{
      this.elements.inputPhoto.click()
    })
    this.elements.inputPhoto.on('change', e=>{
      [...this.elements.inputPhoto.files].forEach(file=>{
        console.log(file)
      })
    })
    this.elements.btnAttachCamera.on('click', e=>{
      this.closeAllMainPanel()
      this.elements.panelCamera.addClass('open')
      this.elements.panelCamera.css({height: "calc(100% - 120px)"})
      
    })
    this.elements.btnAttachDocument.on('click', e=>{
      this.closeAllMainPanel()
      this.elements.panelDocumentPreview.addClass('open')
      this.elements.panelDocumentPreview.css({height: "calc(100% - 120px)"})
    })
    this.elements.btnAttachContact.on('click', e=>{
      this.elements.modalContacts.show()
    })
    this.elements.btnClosePanelCamera.on('click', e=>{
      this.elements.panelCamera.removeClass('open')
      this.elements.panelMessagesContainer.show()
    })
    this.elements.btnClosePanelDocumentPreview.on('click', e=>{
      this.elements.panelDocumentPreview.removeClass('open')
      this.elements.panelMessagesContainer.show()
    })
    this.elements.btnCloseModalContacts.on('click', e=>{
      this.elements.modalContacts.hide()
    })
    this.elements.btnTakePicture.on('click', e=>{

    })
    this.elements.btnSendDocument.on('click', e=>{

    })
  }

  closeMenuAttach() {
    document.removeEventListener('click', this.closeMenuAttach)
    this.elements.menuAttach.removeClass('Open')
  }

  closeAllMainPanel() {
    this.elements.panelMessagesContainer.hide()
    this.elements.panelDocumentPreview.removeClass('open')
    this.elements.panelCamera.removeClass('open')
  }

  closeAllLeftPanel() {
    this.elements.panelAddContact.hide()
    this.elements.panelEditProfile.hide()
  }
}