// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: 'AIzaSyBZFRiOJ10MU2AAqAZkmRpmR-Lg8ShF45Q',
  authDomain: 'ttu-classroom-rent-9d853.firebaseapp.com',
  projectId: 'ttu-classroom-rent-9d853',
  storageBucket: 'ttu-classroom-rent-9d853.appspot.com',
  messagingSenderId: '1041425767852',
  appId: '1:1041425767852:web:bcef0428b76402ad41ae09',
  measurementId: 'G-T811XC50GG',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const db = getFirestore()