import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAdqlo-lV2kutyUWbq6ldNvOLKc5lU1DuA",
  authDomain: "pontomed-c1521.firebaseapp.com",
  projectId: "pontomed-c1521",
  storageBucket: "pontomed-c1521.appspot.com",
  messagingSenderId: "930925688075",
  appId: "1:930925688075:web:cf2b29908f5b0c530e9e0e",
  measurementId: "G-XYY4MMX2ZJ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
export { firebase }

//USO DESENVOLVEDOR//

/*const firebaseConfig = {
  apiKey: "AIzaSyDrpaQcBkGcjLt4wmcT8oUQpq00zXG6tNs",
  authDomain: "pontomed---staging.firebaseapp.com",
  projectId: "pontomed---staging",
  storageBucket: "pontomed---staging.appspot.com",
  messagingSenderId: "790100671923",
  appId: "1:790100671923:web:aee9d7b9ca6654d68d5fc6"
}; */

//USO EM PRODUÇÃO//

/* const firebaseConfig = {
  apiKey: "AIzaSyAdqlo-lV2kutyUWbq6ldNvOLKc5lU1DuA",
  authDomain: "pontomed-c1521.firebaseapp.com",
  projectId: "pontomed-c1521",
  storageBucket: "pontomed-c1521.appspot.com",
  messagingSenderId: "930925688075",
  appId: "1:930925688075:web:cf2b29908f5b0c530e9e0e",
  measurementId: "G-XYY4MMX2ZJ"
}; */