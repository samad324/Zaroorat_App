import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Keyboard,
  Platform,
  Dimensions,
  LayoutAnimation
} from "react-native";
import { connect } from "react-redux";
import { ImagePicker, Permissions } from "expo";
import { Item, Input, Button, Toast } from "native-base";

import { Styles } from "./Styles";
import { Colors } from "../../constants";

import SelectCategory from "../../components/CompanyPicker/CompanyPicker";

const { width, height } = Dimensions.get("window");

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: "",
      firstName: "",
      lastName: "",
      title: "",
      description: "",
      permission: false,
      selectedCategory: "",
      anim: new Animated.Value(0),
      isKeyboardVisible: false
    };
  }

  static navigationOptions = {
    header: null
  };

  componentWillMount = async () => {
    this.keyboardDidShowListener = Keyboard.addListener(
      Platform.select({ android: "keyboardDidShow", ios: "keyboardWillShow" }),
      this._keyboardDidShow.bind(this)
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      Platform.select({ android: "keyboardDidHide", ios: "keyboardWillHide" }),
      this._keyboardDidHide.bind(this)
    );
  };

  componentDidMount = async () => {
    this.askPermission();
    Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();
  };

  componentWillUnmount = async () => {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  };

  _keyboardDidShow = async () => {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: true });
  };

  _keyboardDidHide = async () => {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: false });
  };

  fadeIn = (delay, from = 0) => {
    const { anim } = this.state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: "clamp"
      }),
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [delay, Math.min(delay + 500, 3000)],
            outputRange: [from, 0],
            extrapolate: "clamp"
          })
        }
      ]
    };
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
      aspect: [4, 3],
      quality: 0.6
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  onSelectCompany = value => {
    console.log(value);
    this.setState({
      selectedCategory: value
    });
  };

  saveService = () => {
    const { title, description, selectedCategory, image } = this.state;
    const { user, categories, navigation } = this.props;

    if (!title && !description && !selectedCategory && !image) {
      return Toast.show({
        text: "Please fill all fields",
        buttonText: "Okay"
      });
    }

    const payload = {
      providerId: user.uid,
      providerNumber: user.number,
      title,
      description,
      category: categories.filter(item => item.name == selectedCategory)[0],
      timeStamp: Date.now(),
      image
    };

    navigation.navigate("Maps");
    console.log(payload);
  };

  render() {
    const { title, description, image, isKeyboardVisible } = this.state;
    return (
      <View
        style={[
          Styles.container,
          { paddingBottom: isKeyboardVisible ? height * 0.58 : 0 }
        ]}
      >
        <View style={[Styles.imagePickerContainer]}>
          <TouchableOpacity
            style={Styles.imagePicker}
            onPress={this._pickImage}
          >
            <Animated.Image
              source={
                (image && { uri: image }) ||
                require("../../../assets/images/camera.png")
              }
              resizeMode="cover"
              style={[
                image ? Styles.image : Styles.pickerImage,
                isKeyboardVisible && { height: 70, width: 70 },
                this.fadeIn(0)
              ]}
            />
          </TouchableOpacity>
        </View>
        <Animated.View
          style={[Styles.section, Styles.middle, this.fadeIn(700, -20)]}
        >
          <View style={Styles.fieldsContainer}>
            <View style={Styles.inputFieldsWrapper}>
              <Item regular style={{ borderRadius: 4 }}>
                <SelectCategory onChange={this.onSelectCompany} />
              </Item>
            </View>
            <View style={Styles.inputFieldsWrapper}>
              <Item regular style={{ borderRadius: 4 }}>
                <Input
                  placeholder="Service title"
                  placeholderTextColor="#99999c"
                  value={title}
                  onChangeText={event => {
                    this.setState({ title: event });
                  }}
                />
              </Item>
            </View>
            <View style={Styles.inputFieldsWrapper}>
              <Item regular style={{ borderRadius: 4 }}>
                <Input
                  placeholder="Description"
                  placeholderTextColor="#99999c"
                  value={description}
                  onChangeText={event => {
                    console.log(event);
                    this.setState({ description: event });
                  }}
                />
              </Item>
            </View>
            <View styles={Styles.signupBtnContainer}>
              <Button
                rounded
                style={Styles.signupBtn}
                onPress={this.saveService}
              >
                <Text style={Styles.btnText}>Add Service</Text>
              </Button>
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user,
  categories: state.generalReducer.categories
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
