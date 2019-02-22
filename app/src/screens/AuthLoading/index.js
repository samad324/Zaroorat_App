import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import * as firebase from "firebase";
import { connect } from "react-redux";
import { Loading } from "../../components/Loading";

/**
|--------------------------------------------------
| Auth Loading Screen, Responsible for checking user auth status 😃 user ? Home : Login
|--------------------------------------------------
*/

class AuthLoadingWithNav extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      // console.log(user);
      this.props.navigation.navigate(user ? "HomeScreen" : "LoginScreen");
    });
  }

  render() {
    return <Loading />;
  }
}

// const mapStateToProps = state => ({
//   userStatus: state.authReducer.userStatus
// });

export const AuthLoading = connect(
  // mapStateToProps
  null
)(withNavigation(AuthLoadingWithNav));
