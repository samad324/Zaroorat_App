import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { ImagePicker, Permissions } from "expo";
import { Item, Input, Button } from "native-base";

import { Styles } from "./Styles";
import { uploadImages, updateDB } from "../../config/firebase";
import { updateUser } from "../../store/actions/authAction";

export class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: "",
      firstName: "",
      lastName: "",
      email: "",
      number: "",
      permission: false,
      user: {},
      isLoading: false
    };
  }

  componentDidMount = async () => {
    const { user } = this.props;
    await this.askPermission();
    this.setState({
      user,
      email: user.email,
      image: user.photo,
      number: user.number || ""
    });
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

  signUp = async () => {
    const { user, updateUser, navigation } = this.props;
    const { image, email, number } = this.state;

    this.setState({ isLoading: true });

    const data = {
      email,
      number
    };
    try {
      if (image !== user.photo) {
        const url = await uploadImages(image);
        data.photo = url;
      }
      console.log(data);
      await updateDB("users", user.uid, data);
      data.isNew = false;
      await updateUser(data);
      this.setState({ isLoading: false });
      navigation.navigate("WithDrawer");
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  render() {
    const { email, number, image, isLoading } = this.state;
    return (
      <View style={Styles.container}>
        <View style={Styles.imagePickerContainer}>
          <TouchableOpacity
            style={Styles.imagePicker}
            onPress={this._pickImage}
          >
            <Image
              source={
                (image && { uri: image }) ||
                require("../../../assets/images/camera.png")
              }
              style={(image && Styles.userImage) || Styles.pickerImage}
            />
          </TouchableOpacity>
        </View>
        <View style={Styles.fieldsContainer}>
          <View style={Styles.inputFieldsWrapper}>
            <Item regular style={{ borderRadius: 4 }}>
              <Input
                placeholder="Email"
                placeholderTextColor="#99999c"
                value={email}
                onChangeText={event => this.setState({ email: event })}
              />
            </Item>
          </View>
          <View style={Styles.inputFieldsWrapper}>
            <Item regular style={{ borderRadius: 4 }}>
              <Input
                placeholder="Phone number"
                placeholderTextColor="#99999c"
                value={number}
                keyboardType="numeric"
                onChangeText={event => this.setState({ number: event })}
              />
            </Item>
          </View>
          <View styles={Styles.signupBtnContainer}>
            <Button rounded style={Styles.signupBtn} onPress={this.signUp}>
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={Styles.btnText}>Save</Text>
              )}
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user
});

const mapDispatchToProps = dispatch => ({
  updateUser: payload => dispatch(updateUser(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
