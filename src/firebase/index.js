// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDCjxWf5jnsWAlpCGg5VX5_0H5EpfI50do',
  authDomain: 'vue-rog-3618c.firebaseapp.com',
  databaseURL: 'https://vue-rog-3618c-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'vue-rog-3618c',
  storageBucket: 'vue-rog-3618c.appspot.com',
  messagingSenderId: '814162854930',
  appId: '1:814162854930:web:d04e137611f2466efb44cb',
  measurementId: 'G-SXTHR6DCEC'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const storage = getStorage(app)

export { database, storage }
