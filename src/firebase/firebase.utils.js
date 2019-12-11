import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAFyCIlJmjl8OkXLaXhJ4sh65p-pnJNiws",
  authDomain: "crwn-db-c1be7.firebaseapp.com",
  databaseURL: "https://crwn-db-c1be7.firebaseio.com",
  projectId: "crwn-db-c1be7",
  storageBucket: "crwn-db-c1be7.appspot.com",
  messagingSenderId: "263378164313",
  appId: "1:263378164313:web:ccaeffa7c803abd4bb6f48",
  measurementId: "G-R56YZE6NV1"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/$${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
