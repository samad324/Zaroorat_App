import React, { Component } from "react";
import { Button } from "react-native";
import * as firebase from "firebase";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { signoutAction } from "../../store/actions/auth.action";

/**
|--------------------------------------------------
| Home screen with signout button, 😃
|--------------------------------------------------
*/

// TODO:

class SignOutWithNav extends Component {
  signout = async () => {
    // await this.props.signout();
    return await firebase.auth().signOut();
    // return this.props.navigation.navigate("LoginScreen");
  };

  render() {
    return <Button title="Signout" onPress={() => this.signout()} />;
  }
}

// const mapStateToProps = state => ({
//   userStatus: state.authReducer.userStatus
// });

// const mapDispatchToProps = dispatch => {
//   return {
//     signout: () => dispatch(signoutAction({  }))
//   };
// };

export const SignOut = connect(
  // mapStateToProps,
  null,
  // mapDispatchToProps
  null
)(withNavigation(SignOutWithNav));
