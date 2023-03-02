import { initializeApp } from 'firebase/app'
import firebaseConfig from '../config.js'
import { getDatabase } from 'firebase/database'
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

export default database
