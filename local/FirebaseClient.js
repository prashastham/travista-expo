import * as Firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBv574Dpf-JhXuu6For9Z_jBaF_qtitSio",
  authDomain: "travista-chat.firebaseapp.com",
  databaseURL: "https://travista-chat.firebaseio.com",
  projectId: "travista-chat",
  storageBucket: "travista-chat.appspot.com",
  messagingSenderId: "773160238273",
  appId: "1:773160238273:web:cc371a3c1247dad93"
};

// export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

const firebaseApp = Firebase.initializeApp(config);

export default firebaseApp;
