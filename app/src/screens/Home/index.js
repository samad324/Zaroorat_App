import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { styles } from "../styles";

/**
|--------------------------------------------------
| Home screen with signout button, 😃
|--------------------------------------------------
*/

class HomeWithNav extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.fonts}>🏠 Home</Text>
        <Text style={styles.fonts}>{this.props.user.uid}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user
});

// const mapDispatchToProps = dispatch => {
//   return {
//     signout: () => dispatch(signoutAction({ userStatus: false }))
//   };
// };

// export const Home = withNavigation(HomeWithNav);
export const Home = connect(
  mapStateToProps
  // null,
  // mapDispatchToProps
)(withNavigation(HomeWithNav));
