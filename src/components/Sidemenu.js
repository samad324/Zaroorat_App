import PropTypes from "prop-types";
import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { connect } from "react-redux";
import { Toast } from "native-base";

import { styles } from "./SideMenu.Style";
import { onLogout } from "../store/actions/authAction";
import { logout } from "../config/firebase";

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    const { user } = this.props;
    this.setState({ user: user || {} });
  }

  navigateToScreen = route => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  logout = async () => {
    const { onLogout } = this.props;
    try {
      await logout();
      await onLogout();
      this.navigateTo("Login");
    } catch (error) {
      console.log(error);
      Toast.show({
        text: "Something went wrong!",
        buttonText: "Okay",
        type: "danger"
      });
    }
  };

  navigateTo = route => {
    const { navigate } = this.props.navigation;
    return navigate(route);
  };

  render() {
    const { user } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <ImageBackground
            source={require("../../assets/background.png")}
            resizeMode="cover"
            style={styles.backgroundStyles}
          >
            <Image
              source={{ uri: user.photo }}
              resizeMode="cover"
              style={styles.avatar}
            />
            <Text style={styles.name}>{user.name}</Text>
          </ImageBackground>
        </View>
        <View style={styles.followersContainer}>
          <View style={[styles.FollowContainer, { marginLeft: 22 }]}>
            <TouchableOpacity style={styles.smallContainer}>
              <Text style={[styles.followTxt, { fontSize: 18 }]}>0</Text>
              <Text style={styles.followTxt}>Active Jobs</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.FollowContainer, { marginRight: 22 }]}>
            <TouchableOpacity style={styles.smallContainer}>
              <Text style={[styles.followTxt, { fontSize: 18 }]}>0</Text>
              <Text style={styles.followTxt}>Pending Jobs</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.navLinks}>
          <TouchableOpacity style={styles.nav}>
            <Image
              source={require("../../assets/images/feed.png")}
              style={styles.navImg}
            />
            <Text style={styles.navTxt}>My feed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nav}>
            <Image
              source={require("../../assets/images/photo.png")}
              style={styles.navImg}
            />
            <Text style={styles.navTxt}>My photos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nav} onPress={this.logout}>
            <Image
              source={require("../../assets/images/logout.png")}
              style={styles.navImg}
            />
            <Text style={styles.navTxt}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(onLogout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);
