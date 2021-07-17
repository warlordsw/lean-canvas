import Firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCz21o4TDzci1E0fZ2q9mAk_UXbS8tlr3Q',
  authDomain: 'lean-canvas-df440.firebaseapp.com',
  projectId: 'lean-canvas-df440',
  storageBucket: 'lean-canvas-df440.appspot.com',
  messagingSenderId: '1045475830974',
  appId: '1:1045475830974:web:8dfdd6bb8e748cc9ed02ef',
  measurementId: 'G-KGFRPJFENL',
}

// Initialize Firebase
export const firebase = Firebase.initializeApp(firebaseConfig)
export const { FieldValue } = Firebase.firestore
