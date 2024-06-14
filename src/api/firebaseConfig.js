import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBybGhs541oUVCxhZS7wiUT8CAsLC6uoF8",
    authDomain: "cug-management.firebaseapp.com",
    projectId: "cug-management",
    storageBucket: "cug-management.appspot.com",
    messagingSenderId: "102293009494",
    appId: "1:102293009494:web:34bddb7add3189dd2cb7f7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
