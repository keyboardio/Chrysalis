import firebase from "firebase/app";
import firestore from "firebase/firestore";
import auth from "firebase/auth";

// const config = {
//   apiKey: "a",
//   authDomain: "bazecor.firebaseapp.com",
//   databaseURL: "https://bazecor.firebaseio.com",
//   projectId: "bazecor",
//   storageBucket: "bazecor.appspot.com",
//   messagingSenderId: "a",
//   appId: "a",
// };

// export const createUserProfileDocument = async (userAuth, additionalData) => {
//   if (!userAuth) return;
//   const userRef = firestore.doc(`users/${userAuth.uid}`);
//   const snapShot = await userRef.get();

//   if (!snapShot.exists) {
//     const { displayName, email } = userAuth;
//     const createdAt = new Date();

//     try {
//       await userRef.set({
//         displayName,
//         email,
//         createdAt,
//         ...additionalData
//       });
//     } catch (error) {
//       console.log("error creating user", error.message);
//     }
//   }

//   return userRef;
// };

export const backupLayers = async layers => {
  console.log("calledBackupTool");
  console.log(layers);
  const eventsRef = firestore.doc("Layers/backup");
  if (!!eventsRef && !!layers) {
    try {
      console.log(eventsRef);
      eventsRef.set({
        layers: JSON.stringify(layers)
      });
    } catch (error) {
      console.log("error saving backup in firebase", error.message);
      return [];
    }
  }
  return true;
};

export const shareLayers = async layers => {
  console.log("calledShareTool");
  console.log(layers);
  const eventsRef = firestore.doc("Layers/share");
  if (!!eventsRef && !!layers) {
    try {
      console.log(eventsRef);
      eventsRef.set({
        layers: JSON.stringify(layers)
      });
    } catch (error) {
      console.log("error sharing in firebase", error.message);
      return [];
    }
  }
  return true;
};

// firebase.initializeApp(config);

// export const auth = firebase.auth();
// export const firestore = firebase.firestore();

// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });
// export const signInWithGoogle = () => auth.signInWithPopup(provider);

// export default firebase;
