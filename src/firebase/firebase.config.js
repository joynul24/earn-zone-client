import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDznvehxT5sMLN-Y34YiHavj8VEMZX5pZQ",
//   authDomain: "earn-zone-client.firebaseapp.com",
//   projectId: "earn-zone-client",
//   storageBucket: "earn-zone-client.firebasestorage.app",
//   messagingSenderId: "878986619559",
//   appId: "1:878986619559:web:6fe17454916dbf9a3a8982"
// };
const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;