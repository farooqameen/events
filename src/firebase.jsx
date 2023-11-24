import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9RrYw5o1LK34YG9U281-FMMk-QnKkPiM",
  authDomain: "eventhero-60ed6.firebaseapp.com",
  projectId: "eventhero-60ed6",
  storageBucket: "eventhero-60ed6.appspot.com",
  messagingSenderId: "72138656838",
  appId: "1:72138656838:web:e688a3634ec297005fce47",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
