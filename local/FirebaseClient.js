import * as Firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDQoOelslmiX_e1DhYV7UckfaIev5YXwrE",
  authDomain: "travista-de863.firebaseapp.com",
  databaseURL: "https://travista-de863.firebaseio.com",
  projectId: "travista-de863",
  storageBucket: "travista-de863.appspot.com",
  messagingSenderId: "736893274288",
  appId: "1:736893274288:web:f66314b0139ed4b5a01375",
  measurementId: "G-E0X12ZGR03"
};

// export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

const firebaseApp = Firebase.initializeApp(config)

export default firebaseApp