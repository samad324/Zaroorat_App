import firebase from "firebase";
import { firebaseConfig, facebookConfig } from "../constants/Credentials";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export const loginWithFacebook = () => {
  return new Promise(async (resolve, reject) => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      facebookConfig.appId,
      { permissions: ["public_profile", "email"] }
    );
    if (type === "success") {
      const credencials = firebase.auth.FacebookAuthProvider.credential(token);
      auth
        .signInAndRetrieveDataWithCredential(credencials)
        .then(res => {
          const userData = {
            name: res.user.displayName,
            email: res.user.email,
            photo: `${res.user.photoURL}?type=large`,
            uid: res.user.uid,
            token
          };
          const response = getUser(userData);
          response.then(res => {
            resolve(res);
          });
        })
        .catch(err => reject(err));
    }
  });
};

export const getUser = async userData => {
  const user = await firestore
    .collection("users")
    .doc(userData.uid)
    .get();

  if (!user.exists) {
    await setUser(userData);
    return userData;
  }
  return user.data();
};

export const setUser = userData => {
  return new Promise((resolve, reject) => {
    const doc = firestore.collection("users").doc(userData.uid);
    const res = doc.set(userData, { merge: true });
    res.then(response => resolve(response)).catch(err => reject(err));
  });
};

export const fetchAllUsers = () => {
  return new Promise((resolve, reject) => {
    const doc = firestore.collection("users").get();
    doc
      .then(response => {
        const users = [];
        response.forEach(user => {
          users.push(user.data());
        });
        resolve(users);
      })
      .catch(err => reject(err));
  });
};

export const logout = () => {
  const res = auth.signOut();
  return res;
};

export const getAllCategories = async () => {
  const rawData = await firestore.collection("categories").get();
  const categories = [];
  await rawData.forEach(category => {
    categories.push(category.data());
  });
  return categories;
};

export const addToDB = async (collection, data) => {
  const responce = await firestore.collection(collection).add(data);
  return responce;
};

export const updateDB = async (collection, id, data, merge = false) => {
  const responce = await firestore
    .collection(collection)
    .doc(id)
    .set(data, { merge });
  return responce;
};

export const getServices = async () => {
  const rawData = await firestore.collection("services").get();
  const services = [];
  rawData.forEach(doc => services.push(doc.data()));
  return services;
};
