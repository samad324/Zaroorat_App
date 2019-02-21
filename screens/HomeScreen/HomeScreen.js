import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser, Permissions, Location } from "expo";
import { connect } from "react-redux";
import firebase from "firebase";
import "firebase/firestore";

import { setAllUsers } from "../../store/actions/authAction";
import { styles } from "./Styles";
import { MonoText } from "../../components/StyledText";
import { setAllCategories } from "../../store/actions/generalAction";

import { setUserLocation } from "../../config/firebase";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.getLocationAsync();
    this.fetchAllUsersRealTime();
    this.getCategories();
  }

  async fetchAllUsersRealTime() {
    const { setAllUsers } = this.props;

    try {
      const doc = firebase.firestore().collection("users");
      doc.onSnapshot(snapshot => {
        const allUsers = [];

        snapshot.forEach(data => {
          allUsers.push(data.data());
        });

        setAllUsers(allUsers);
      });
    } catch (e) {
      alert("Error");
      console.log("e =>", e);
    }
  }

  getCategories = async () => {
    const { setAllCategories } = this.props;

    try {
      const doc = firebase.firestore().collection("categories");
      doc.onSnapshot(snapshot => {
        const allCategory = [];

        snapshot.forEach(data => {
          allCategory.push(data.data());
        });

        setAllCategories(allCategory);
      });
    } catch (e) {
      alert("Error");
      console.log("e =>", e);
    }
  };

  getLocationAsync = async () => {
    const { user } = this.props;

    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== "granted") {
        alert("Ah! we can't access your location!");
        this.setState({
          errorMessage: "Permission to access location was denied"
        });
      }

      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true
      });
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };

      setUserLocation(coords, user.uid);

      this.setState({ location });
    } catch (e) {
      console.log("e =>", e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require("../../assets/images/robot-dev.png")
                  : require("../../assets/images/robot-prod.png")
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>Get started by opening</Text>

            <View
              style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
            >
              <MonoText style={styles.codeHighlightText}>
                screens/HomeScreen.js
              </MonoText>
            </View>

            <Text style={styles.getStartedText}>
              Change this text and your app will automatically reload.
            </Text>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity
              onPress={this._handleHelpPress}
              style={styles.helpLink}
            >
              <Text style={styles.helpLinkText}>
                Help, it didn’t automatically reload!
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
            This is a tab bar. You can edit it in:
          </Text>

          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}
          >
            <MonoText style={styles.codeHighlightText}>
              navigation/MainTabNavigator.js
            </MonoText>
          </View>
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/development-mode"
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
    );
  };
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    allUsers: state.authReducer.allUsers,
    allCategories: state.generalReducer.allCategories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAllCategories: payload => dispatch(setAllCategories(payload)),
    setAllUsers: payload => dispatch(setAllUsers(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
