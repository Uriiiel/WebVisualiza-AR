import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore} from "@firebase/firestore";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAokk4Xru6u1Uux8turZ4ieDDtZLs6Ngms",
  authDomain: "prob-virt-react.firebaseapp.com",
  projectId: "prob-virt-react",
  storageBucket: "prob-virt-react.appspot.com",
  messagingSenderId: "265298636582",
  appId: "1:265298636582:web:80e30f518cfb4fd9235be7"
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);
// Funciones de autenticación
export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);