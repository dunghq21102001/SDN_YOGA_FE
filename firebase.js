// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCcinPauSZ9a5my3YCPg-pS365rf77i4tk",
    authDomain: "yogacenter-695fe.firebaseapp.com",
    projectId: "yogacenter-695fe",
    storageBucket: "yogacenter-695fe.appspot.com",
    messagingSenderId: "269027262039",
    appId: "1:269027262039:web:332ac0fc24d18216faad12",
    measurementId: "G-TYXNLL4D97"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
import { getStorage } from 'firebase/storage'
const storage = getStorage(app)

export { storage }