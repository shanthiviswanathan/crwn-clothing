import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDYBFVmDPMxPd5izsbcklrcAXVSeWp6Aps",
  authDomain: "crwn-db-e7aac.firebaseapp.com",
  databaseURL: "https://crwn-db-e7aac.firebaseio.com",
  projectId: "crwn-db-e7aac",
  storageBucket: "crwn-db-e7aac.appspot.com",
  messagingSenderId: "306661579043",
  appId: "1:306661579043:web:0779e357bba3bff2a29496"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

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
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithRedirect(provider);
export default firebase;