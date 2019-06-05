const firebase = require('firebase')
require('firebase/firestore')

export class Firebase {
  constructor() {
    this._config = {
      apiKey: "AIzaSyCnV7uqBCgbI8093POdhfPZRO8a-ESwZzo",
      authDomain: "curso-whatsapp-clone.firebaseapp.com",
      databaseURL: "https://curso-whatsapp-clone.firebaseio.com",
      projectId: "curso-whatsapp-clone",
      storageBucket: "curso-whatsapp-clone.appspot.com",
      messagingSenderId: "828736919702",
      appId: "1:828736919702:web:f2d313f14f6cb877"
    };
    this.init()
  }  

  init() {
    if(!this._initialized) {
      firebase.initializeApp(this._config);
      firebase.firestore().settings({
        timestampsInSnapshots: true
      })
      this._initialized = true
    }
  }

  initAuth() {
    return new Promise((s, f)=>{
      let provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(result=>{
        let token = result.credential.accessToken
        let user = result.user
        s({ user, token })
      }).catch(e=>{
        f(e)
      })
    })
  }

  static db() {
    return firebase.firestore()
  }

  static hd() {
    return firebase.storage()
  }
}