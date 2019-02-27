import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import { ImagePicker, Permissions } from "expo";
import { Item, Input, Button } from "native-base";

import { Styles } from "./Styles";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: "",
      firstName: "",
      lastName: "",
      email: "",
      passoword: "",
      permission: false
    };
  }

  static navigationOptions = {
    title: "Sign Up",
    headerTintColor: "#fff",
    headerTitleStyle: Styles.headerStyle,
    headerStyle: {
      backgroundColor: "#2abf88"
    }
  };

  componentDidMount = async () => {
    this.askPermission();
  };

  askPermission = async () => {
    const { status: camera } = await Permissions.askAsync(Permissions.CAMERA);
    const { status: camera_roll } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (camera !== "granted" && camera_roll !== "granted") {
      this.setState({ permission: false });
      return alert("Hey! You might want to upload your Image?");
    } else {
      this.setState({ permission: true });
    }
  };

  _pickImage = async () => {
    const { permission } = this.state;
    if (!permission) this.askPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  render() {
    const { firstName, lastName, email, passoword } = this.state;
    return (
      <View style={Styles.container}>
        <View style={Styles.imagePickerContainer}>
          <TouchableOpacity
            style={Styles.imagePicker}
            onPress={this._pickImage}
          >
            <Image
              source={require("../../../assets/images/camera.png")}
              style={Styles.pickerImage}
            />
          </TouchableOpacity>
        </View>
        <View style={Styles.fieldsContainer}>
          <View style={Styles.joinedFields}>
            <Item regular style={{ flex: 1, borderRadius: 4 }}>
              <Input
                placeholder="First Name"
                placeholderTextColor="#99999c"
                style={{ flex: 1 }}
                value={firstName}
                onChange={event =>
                  this.setState({ firstName: event.target.value })
                }
              />
              <Text style={Styles.inputSeperator} />
              <Input
                placeholder="Last Name"
                placeholderTextColor="#99999c"
                style={{ flex: 0.8 }}
                value={lastName}
                onChange={event =>
                  this.setState({ lastName: event.target.value })
                }
              />
            </Item>
          </View>
          <View style={Styles.inputFieldsWrapper}>
            <Item regular style={{ borderRadius: 4 }}>
              <Input
                placeholder="Email"
                placeholderTextColor="#99999c"
                value={email}
                onChange={event => this.setState({ email: event.target.value })}
              />
            </Item>
          </View>
          <View style={Styles.inputFieldsWrapper}>
            <Item regular style={{ borderRadius: 4 }}>
              <Input
                placeholder="Passoword"
                placeholderTextColor="#99999c"
                value={passoword}
                onChange={event =>
                  this.setState({ passoword: event.target.value })
                }
              />
            </Item>
          </View>
          <View styles={Styles.signupBtnContainer}>
            <Button rounded style={Styles.signupBtn}>
              <Text style={Styles.btnText}>SIGN UP</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
