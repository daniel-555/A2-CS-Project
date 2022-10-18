// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
	apiKey: "AIzaSyDMDPQdngJuUi3Nd4XKZqw_OCjAusvtlDc",
	authDomain: "a-level-cs-project-ae8a3.firebaseapp.com",
	projectId: "a-level-cs-project-ae8a3",
	storageBucket: "a-level-cs-project-ae8a3.appspot.com",
	messagingSenderId: "719995149392",
	appId: "1:719995149392:web:2c4ac084f13a7c15588555",
	measurementId: "G-GXTJ8SN3CE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

// This file initalises firebase and allows my program to edit its online database
