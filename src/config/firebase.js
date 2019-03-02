import firebase from "firebase";
import { firebaseConfig, facebookConfig } from "../constants/Credentials";
import "firebase/firestore";
import "firebase/auth";

import { registerForPushNotificationsAsync } from "./helpers";

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export const loginWithFacebook = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
        facebookConfig.appId,
        { permissions: ["public_profile", "email"] }
      );
      console.log(token, type);
      if (type === "success") {
        const credencials = firebase.auth.FacebookAuthProvider.credential(
          token
        );
        console.log(credencials);
        auth
          .signInAndRetrieveDataWithCredential(credencials)
          .then(async res => {
            const userData = {
              name: res.user.displayName,
              email: res.user.email,
              photo: `${res.user.photoURL}?type=large`,
              uid: res.user.uid,
              token
            };
            const pushToken = await registerForPushNotificationsAsync();
            console.log(pushToken);
            userData.pushToken = pushToken;
            await updateDB("users", userData.uid, { pushToken });
            const response = await getUser(userData);
            resolve(response);
          });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const getUser = async userData => {
  try {
    const user = await firestore
      .collection("users")
      .doc(userData.uid)
      .get();

    if (!user.exists) {
      await setUser(userData);
      userData.isNew = true;
      return userData;
    }
    userData.isNew = false;
    return user.data();
  } catch (error) {
    throw error;
  }
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

export const updateDB = async (collection, id, data, merge = true) => {
  const responce = await firestore
    .collection(collection)
    .doc(id)
    .set(data, { merge });
  return responce;
};

export const searchInDB = async (collection, key, value) => {
  const responce = await firestore
    .collection(collection)
    .where(key, "==", value)
    .get();

  const result = [];
  await responce.forEach(item => {
    const data = item.data();
    data.id = item.id;
    result.push(data);
  });
  return result;
};

export const searchInDBWithDualQuery = async (collection, key, value) => {
  const responce = await firestore
    .collection(collection)
    .where(key[0], "==", value[0])
    .where(key[0], "==", value[0])
    .get();

  const result = [];
  await responce.forEach(item => {
    const data = item.data();
    data.id = item.id;
    result.push(data);
  });
  return result;
};

export const getServices = async () => {
  const rawData = await firestore.collection("services").get();
  const services = [];
  rawData.forEach(doc => services.push(doc.data()));
  return services;
};

export const uploadImages = image => {
  return new Promise((resolve, reject) => {
    const blob = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    const storageRef = storage.ref();
    blob.then(result => {
      let imgRef = storageRef.child("/images/" + Math.random() + ".jpg");
      imgRef
        .put(result)
        .then(function(snapshot) {
          imgRef.getDownloadURL().then(function(url) {
            resolve(url);
          });
        })
        .catch(err => reject(err));
    });
  });
};
