import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { onLogout } from "../../store/actions/authAction";

export class componentName extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static navigationOptions = {
    title: "Settings"
  };

  logout = async () => {
    const { onLogout, navigation } = this.props;
    await onLogout();
    navigation.navigate("Login");
  };

  render() {
    return (
      <View style={Styles.container}>
        <TouchableOpacity onPress={this.logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const Styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(onLogout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(componentName);
