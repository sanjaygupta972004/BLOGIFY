
import { initializeApp } from "firebase/app";

const firebaseConfig = {
   apiKey: import.meta.env.VITE_fIREBASE_API_KEY,

   authDomain: "blogify-43264.firebaseapp.com",
 
   projectId: "blogify-43264",
 
   storageBucket: "blogify-43264.appspot.com",
 
   messagingSenderId: "642015028854",
 
   appId: "1:642015028854:web:07d872e4329d41ef7ba157"
 
};


export const app = initializeApp(firebaseConfig);
 
 
//  apiKey: import.meta.env.API_KEY,
//   authDomain: import.meta.env.AUTH_DOMAIN,
//   projectId: import.meta.env.PROJECT_ID,
//   storageBucket: import.meta.env.STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
//   appId: import.meta.env.APP_ID