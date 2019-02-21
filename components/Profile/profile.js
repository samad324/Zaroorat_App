import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ImagePicker } from "expo";

import { uploadImagesToStorage } from "../../config/firebase";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      thumbnail: ""
    };
  }

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        base64: true,
        aspect: [4, 3]
      });
      console.log("result", result);
    } catch (e) {
      console.log(e);
    }

    if (!result.cancelled) {
      this.setState({
        thumbnail: result.uri
        // const promises = uploadImagesToStorage(thumbnail);

        // Promise.all(promises).then(res => {
        //   (
        //     user.uid,
        //     title,
        //     category,
        //     number,
        //     description,
        //     res[0]
        //   ).then(() => {
        //     alert("Added Successfully.....");
        //     this.setState({
        //       loader: false
        //     });
        //   });
        // });
      });
    }
    console.log(this.state.thumbnail , "<cheking>");
  };

  render() {
    const { thumbnail } = this.state;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.header} />
        <Image
          style={styles.avatar}
          source={{
            uri: thumbnail
              ? thumbnail
              : "https://bootdey.com/img/Content/avatar/avatar6.png"
          }}
        />

        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <TouchableHighlight onPress={() => this._pickImage()}>
              <Text>Profile Image </Text>
            </TouchableHighlight>
            {/* {thumbnail && (
              <TouchableHighlight onPress={() => this._pickImage()}>
                <Text>Upload </Text>
              </TouchableHighlight>
            )} */}

            <Text style={styles.name}>John Doe</Text>

            <Text style={styles.info}>UX Designer / Mobile developer</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum
              electram expetendis, omittam deseruisse consequuntur ius an,
            </Text>

            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Opcion 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Opcion 2</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

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
