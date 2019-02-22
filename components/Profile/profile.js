import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TextInput
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { ImagePicker } from "expo";
import { connect } from "react-redux";
import { Item, Input, Icon } from "native-base";

import { onLogout } from "../../store/actions/authAction";

import { uploadImagesToStorage, setUser } from "../../config/firebase";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      thumbnail: "",
      phoneNumber: "",
      editNumber: false
    };
  }

  componentDidMount() {
    console.log(this.props.user.name);
    console.log(this.props.user.photo);
  }

  _pickImage = async () => {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.4
    })
      .then(res => {
        if (!res.cancelled) {
          this.setState({ thumbnail: res.uri }, () =>
            console.log("state set =>", this.state.thumbnail)
          );
        }
      })
      .catch(err => alert("result", err));
  };

  saveData = async () => {
    const { thumbnail, phoneNumber } = this.state;
    const { uid } = this.props.user;

    const payload = { uid };

    if (thumbnail) {
      try {
        const promises = await uploadImagesToStorage(thumbnail);
        const photo = await Promise.all(promises)[0];
        payload.photo = photo;
      } catch (e) {
        alert(e.message);
      }
    }

    if (phoneNumber) payload.phoneNumber = phoneNumber;
    console.log(payload);
    // await setUser(payload);
    // alert("Added Successfully.....");
  };

  render() {
    const { thumbnail, editNumber } = this.state;
    const { name, photo } = this.props.user || {};

    return (
      <ScrollView style={styles.container}>
        <View style={styles.header} />
        <Image
          style={styles.avatar}
          source={{
            uri: thumbnail ? thumbnail : photo
          }}
        />

        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <TouchableOpacity onPress={() => this._pickImage()}>
              <Text>
                Profile Image <Feather name="edit-2" size={24} />
              </Text>
            </TouchableOpacity>
            {!editNumber ? (
              <TouchableOpacity
                onPress={() => this.setState({ editNumber: true })}
              >
                <Text>
                  Phone Number <Feather name="edit-2" size={24} />
                </Text>
              </TouchableOpacity>
            ) : (
              <Item>
                <Icon active name="ios-phone-portrait" />
                <Input
                  placeholder="Enter You Phone Number"
                  keyboardType="numeric"
                  value={this.state.phoneNumber}
                  onChangeText={phoneNumber => this.setState({ phoneNumber })}
                />
              </Item>
            )}
            <Text style={styles.name}>{name}</Text>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.saveData()}
            >
              <Text>Update Data</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.onLogout()}
            >
              <Text>Logout</Text>
            </TouchableOpacity>

            {/* //   ))} */}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 200
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600"
  },
  body: {
    marginTop: 40
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF"
  }
});
