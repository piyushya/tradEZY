import { app } from './firebase-config.js'

import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
  } from "firebase/auth";

import {
  addNewUser,
  userExists
} from './src/controllers/userController.js'

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const registerWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);

  // This gives you a Google Access Token.
  //const token = result.credential.accessToken;

  // This gives you the signed-in user.
  const user = result.user;

  // Check if the user is new or existing.
  const isOldUser = await userExists(user.uid)

  if (!isOldUser) {
    // User's display name
    const displayName = user.displayName;
    // User's profile picture URL
    const photoURL = user.photoURL;
    console.log('New user signed up with Google:', user.uid);
    const userData = {
      name : displayName,
      userId : user.uid,
      email : user.email,
      ppUrl : photoURL
    }
    addNewUser(userData)
  } else {
    console.log('Existing user signed in with Google:', user.uid);
  }
}

  const logout = () => {
    signOut(auth);
  };

  export {
    auth,
    registerWithGoogle,
    // logInWithEmailAndPassword,
    // registerWithEmailAndPassword,
    // sendPasswordReset,
    logout,
  };