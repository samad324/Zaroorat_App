import React from "react";
import { Button } from "react-native";
import { Facebook } from "expo";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { APP_ID, db } from "../../config";
import * as firebase from "firebase";
import { loginAction } from "../../store/actions/auth.action";

/**
|--------------------------------------------------
| Facebook Auth Component, Responsible for facebook login/signup
|--------------------------------------------------
*/

const facebookLoginAsync = async props => {
  console.log("helllo fb login props");
  try {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      APP_ID,
      {
        permissions: ["public_profile"]
      }
    );
    if (type === "success") {
      // const response = await fetch(
      //   `https://graph.facebook.com/me?access_token=${token}`
      // );
      // const jsonRes = await response.json();

      // db.collection("users")
      //   .doc(jsonRes.id)
      //   .set(jsonRes)
      //   .catch(function(error) {
      //     console.error("Error adding document: ", error);
      //   });
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      // let userData;
      firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .then(props => {
          // console.log("user>>>>", JSON.parse(JSON.stringify(props.user)));
          console.log("user>>>>", props);
          // let jsObj = JSON.parse(user);
          // console.log("jsObj>>>", jsObj);
          props.additionalUserInfo.isNewUser &&
            db
              .collection("users")
              .doc(props.user.uid)
              .set(JSON.parse(JSON.stringify(props.user)))
              .catch(err => console.log("err>>", err));
          return props.login(props.user);
          // return props.navigation.navigate("HomeScreen");
        })
        .catch(error => {
          console.log(error);
        });
      // console.log("userData>>>", userData);
      // props.login(jsonRes);
    } else {
      console.log("Cancel");
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
};

const FacebookAuthWithNav = withNavigation(props => {
  return <Button onPress={() => facebookLoginAsync(props)} title="FB Login" />;
});

// const mapStateToProps = state => ({
//   user: state.authReducer.user
// });

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(loginAction({ user }))
  };
};

export const FacebookAuth = connect(
  // mapStateToProps,
  null,
  mapDispatchToProps
)(FacebookAuthWithNav);
