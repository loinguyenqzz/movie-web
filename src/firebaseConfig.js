import { initializeApp } from 'firebase/app';
import { getDatabase} from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAWY6__O2KYDE1GzH1q03y2fmZIgZUz91E",
    authDomain: "movie-a9911.firebaseapp.com",
    databaseURL: "https://movie-a9911-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "movie-a9911",
    storageBucket: "gs://movie-a9911.appspot.com",
    messagingSenderId: "1061915204179",
    appId: "1:1061915204179:web:73a1254793ce42c9c244a6"
};

const app = initializeApp(firebaseConfig);

export default app;
export const dbRealtime = getDatabase(app);
export const auth = getAuth(app)
export const dbFireStore = getFirestore(app)
export const storage = getStorage(app);

