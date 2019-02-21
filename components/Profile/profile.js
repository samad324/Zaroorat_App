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

import { uploadImagesToStorage, setUser } from "../../config/firebase";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      thumbnail: "",
      phNumber: "",
      editNumber: false
    };
  }

  componentDidMount() {
    console.log(this.props.user.name);
    console.log(this.props.user.photo);
  }

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        base64: true,
        aspect: [4, 3]
      });

      if (!result.cancelled) {
        this.setState(
          {
            thumbnail: result.uri
          },
          () => console.log("state set =>", this.state.thumbnail)
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  saveData = async () => {
    const { thumbnail, phNumber } = this.state;
    
    const  {uid} = this.props.user 

    const promises = uploadImagesToStorage(thumbnail);

    Promise.all(promises).then(res => {
      setUser({ photo: res[0], phoneNumber: phNumber, uid   }).then(() => {
        alert("Added Successfully.....");
        // this.setState({
        //   loader: false
        // });
      }).catch((e) => {
          console.log(e)
      })
    });
  };

  render() {
    const { thumbnail, editNumber, phNumber } = this.state;
    const { name, photo } = this.props.user;

    console.log(phNumber, "phNumber");

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

            <TextInput
              keyboardType="numeric"
              style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
              onChangeText={phNumber => this.setState({ phNumber })}
              value={this.state.text}
            />

            {/* <TouchableOpacity
              onPress={() => this.setState({ editNumber: true })}
            >
              <Text>
                Phone Number <Feather name="edit-2" size={24} />
              </Text>
            </TouchableOpacity> */}

            <Text style={styles.name}>{name}</Text>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.saveData()}
            >
              <Text>Update Data</Text>
            </TouchableOpacity>
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
