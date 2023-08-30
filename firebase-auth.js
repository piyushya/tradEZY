import { app } from './firebase-config.js'

import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
  } from "firebase/auth";

import {
  addNewUser, 
  getUserData,
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
  const isNewUser = await userExists(user.uid)

  if (!isNewUser) {
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

  const logInWithEmailAndPassword = async (email, password) => {
    alert("functionality not added")
    // try {
    //   await signInWithEmailAndPassword(auth, email, password);
    // } catch (err) {
    //   console.error(err);
    //   alert(err.message);
    // }
  };

  const registerWithEmailAndPassword = async (name, email, password) => {
    alert("functionality not added")
    // try {
    //   const res = await createUserWithEmailAndPassword(auth, email, password);
    //   const user = res.user;
    //   await addDoc(collection(db, "users"), {
    //     uid: user.uid,
    //     name,
    //     authProvider: "local",
    //     email,
    //   });
    // } catch (err) {
    //   console.error(err);
    //   alert(err.message);
    // }
  };

  // const sendPasswordReset = async (email) => {
  //   try {
  //     await sendPasswordResetEmail(auth, email);
  //     alert("Password reset link sent!");
  //   } catch (err) {
  //     console.error(err);
  //     alert(err.message);
  //   }
  // };

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