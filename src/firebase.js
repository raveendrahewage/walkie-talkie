import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAxFblAVxPT_UOqYVWuDkJnoQkId4naWqg",
    authDomain: "walki-talkie-1729a.firebaseapp.com",
    projectId: "walki-talkie-1729a",
    storageBucket: "walki-talkie-1729a.appspot.com",
    messagingSenderId: "36893915054",
    appId: "1:36893915054:web:bb44fd7d3d3e20738e7a3f",
    measurementId: "G-HFYS8SGQG9"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();