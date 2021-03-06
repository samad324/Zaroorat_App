import React, { Component } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { StackActions, NavigationActions } from "react-navigation";

import { Styles } from "./Styles";
import { loginWithFacebook, fetchAllUsers } from "../../config/firebase";
import { onLogin, setAllUsers } from "../../store/actions/authAction";

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    const { user } = this.props;

    if (user) {
      this.navigateToHome();
    }
    this.setState({ isLoading: false });
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;

    if (user) {
      this.navigateToHome();
    }
    this.setState({ isLoading: false });
  }

  login = async () => {
    const { onLogin, setAllUsers } = this.props;

    this.setState({ isLoading: true });

    try {
      const res = await loginWithFacebook();
      fetchAllUsers().then(users => setAllUsers(users));
      onLogin(res);
      this.setState({ isLoading: false });
      this.navigateToHome();
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };

  navigateToHome = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Home" })]
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    const { isLoading } = this.state;
    return (
      <View style={Styles.container}>
        <TouchableOpacity
          style={Styles.fbBtn}
          onPress={this.login}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={"#fff"} size={"small"} />
          ) : (
              <View style={{ flexDirection: "row" }}>
                <Text style={Styles.fbBtnTxt2}> login with</Text>
                <Text style={Styles.fbBtnTxt}> Facebook</Text>
              </View>
            )}
        </TouchableOpacity>
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
    onLogin: payload => dispatch(onLogin(payload)),
    setAllUsers: payload => dispatch(setAllUsers(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
