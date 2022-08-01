import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBYtXa1R-3raBPPQcndl0_WixQQJQXNZIM',
  authDomain: 'devstree-6ee61.firebaseapp.com',
  projectId: 'devstree-6ee61',
  storageBucket: 'devstree-6ee61.appspot.com',
  messagingSenderId: '976513580782',
  appId: '1:976513580782:web:0438ed36c09cabed56bdff',
  measurementId: 'G-7H2X72H0CG',
}
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
export { db }
