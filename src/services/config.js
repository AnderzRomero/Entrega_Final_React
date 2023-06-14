import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tienda-herosystems.firebaseapp.com",
  projectId: "tienda-herosystems",
  storageBucket: "tienda-herosystems.appspot.com",
  messagingSenderId: "713926709868",
  appId: "1:713926709868:web:5e9861845f7a9810dcbe49"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);