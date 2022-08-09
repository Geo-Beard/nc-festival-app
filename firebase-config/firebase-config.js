import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyA7tcgT-qVxbzkBR1BAz4K_SoP7BXXjrXQ",
 authDomain: "nc-project-festival-app.firebaseapp.com",
 projectId: "nc-project-festival-app",
 storageBucket: "nc-project-festival-app.appspot.com",
 messagingSenderId: "41421987875",
 appId: "1:41421987875:web:5dff2085ae56c595e35196",
};
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
