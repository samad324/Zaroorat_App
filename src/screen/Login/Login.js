import React, { Component } from "react";
import { View, ActivityIndicator, ImageBackground } from "react-native";
import { connect } from "react-redux";
import { StackActions, NavigationActions } from "react-navigation";

import { Styles } from "./Styles";
import Button from "../../components/Button";
import { loginWithFacebook } from "../../config/firebase";
import { onLogin } from "../../store/actions/authAction";
import fbIcon from "../../../assets/facebook.png";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    const { user } = this.props;
    const { navigate } = this.props.navigation;

    if (user) {
      return navigate("WithDrawer");
    }
    this.setState({ isLoading: false });
  }

  login = async () => {
    const { onLogin } = this.props;

    this.setState({ isLoading: true });

    try {
      const res = await loginWithFacebook();
      onLogin(res);
      this.setState({ isLoading: false });
      this.navigateToHome();
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };

  navigateToHome = () => {
    const { navigate } = this.props.navigation;
    return navigate("WithDrawer");
  };

  render() {
    const { isLoading } = this.state;
    return (
      <View style={Styles.mainContainer}>
        <ImageBackground
          source={require("../../../assets/splash_2.png")}
          style={Styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={Styles.btnContainer}>
            {isLoading ? (
              <ActivityIndicator
                color="#fff"
                size="large"
                style={Styles.socialButton}
              />
            ) : (
              <Button
                style={Styles.socialButton}
                bordered
                rounded
                icon={fbIcon}
                onPress={this.login}
              />
            )}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: payload => dispatch(onLogin(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
