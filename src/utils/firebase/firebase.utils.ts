import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot
} from "firebase/firestore";

import { Category } from "../../store/categories/category.types";

const firebaseConfig = {
  apiKey: "AIzaSyBlxWdN73k8vodA6MevRXiSJkEOUTMw2ME",

  authDomain: "jds-clothing-emporium.firebaseapp.com",

  projectId: "jds-clothing-emporium",

  storageBucket: "jds-clothing-emporium.appspot.com",

  messagingSenderId: "439793486496",

  appId: "1:439793486496:web:ba6b621243face4466d7c5",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export type ObjectToAdd = {
  title: string;
}

//Function to add collections and documents to firestore - need to import collection and writeBatch
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> =>{
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};



//Function to retrieve from firestore - need to import query and getDocs
//This type of helper function isolates the areas that our application interfaces with things that change
// i.e. third party libraries - bad thing about google and firebase.
// This way we only have to change this one function rather than chase problems through the app if something changes
export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);


  const querySnapShot = await getDocs(q); //Changing the way we get the categories - this gives us back the categories as an array
  return querySnapShot.docs.map(docSnapshot => docSnapshot.data() as Category)


 //Moved to categories selector - changed to return categoriesArray 
//   .reduce((acc, docSnapShot) => {
//     const { title, items } = docSnapShot.data();
//     acc[title.toLowerCase()] = items;
//     return acc;
//   }, {});

//   return categoryMap
};

//Typing userAuth and additional information
export type AdditionalInformation = {
  displayName?: string;
}

export type UserData = {
  createdAt: string;
  dispalyName: string;
  email: string;
}
  
export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInfo = {}
): Promise<void | QueryDocumentSnapshot <UserData> > => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    //If user snapshot doesn't exist - create userDocRef
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("Error creating user", error);
    }
  }

  //if user data exists
  return userSnapshot as QueryDocumentSnapshot<UserData>  ; //Changed from returning userDocRef to userSnapshot when changing to saga
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

//Built in function to sign-out of firebase but don't forget to setCurrentUser to null - we access this through useContext as well
export const signOutUser = async () => signOut(auth);

//This will call the callback when the state of the auth changes (on sign-in and sign-out for example) - this is always listening for changes.
export const onAuthStateChangedListener = (callback: NextOrObserver<User> ) =>
  onAuthStateChanged(auth, callback);


  // Redux-saga way of using the listener - async
  export const getCurrentUser = (): Promise<User | null > => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (userAuth) => {
          unsubscribe() //This is again a clean-up so we don't get a memory leak
          resolve(userAuth)
        },
        reject
      )
    })
  }
