import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Picker,
  Button,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import { ImagePicker, Location, Permissions } from "expo";
import { connect } from "react-redux";

import {
  uploadImagesToStorage,
  addServiceToFirestore
} from "../../config/firebase";
import { Styles } from "./Styles";

class AddServicesScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      category: "",
      description: "",
      number: "",
      thumbnail: "",
      loader: false
    };
  }

  _pickImage = async () => {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.6
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

  addService = async () => {
    const { user } = this.props;

    const { title, category, description, number, thumbnail } = this.state;

    console.log("title", title);
    console.log("category", category);
    console.log("description", description);
    console.log("number", number);
    console.log("thumbnail", thumbnail);

    this.setState({
      loader: true
    });

    const promises = uploadImagesToStorage(thumbnail);
    const location = await this.getLocationAsync();

    Promise.all(promises).then(res => {
      addServiceToFirestore(
        user.uid,
        title,
        category,
        number,
        description,
        res[0],
        Date.now(),
        location
      ).then(() => {
        alert("Added Successfully.....");
        this.setState({
          loader: false
        });
      });
    });
  };

  getLocationAsync = async () => {
    const { user } = this.props;

    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== "granted") {
        alert("Ah! we can't access your location!");
      }

      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true
      });
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };

      return coords;
    } catch (e) {
      alert("Error while fetching location!");
    }
  };

  render() {
    const { category, loader } = this.state;
    const { allCategories } = this.props;

    return (
      <View style={Styles.container}>
        <View style={Styles.headers}>
          <Text style={Styles.headerText}>Add Services</Text>
        </View>
        <View style={Styles.forms}>
          <TextInput
            placeholder="Enter Title....."
            style={Styles.textInput}
            onChangeText={text => this.setState({ title: text })}
          />

          <Picker
            selectedValue={category}
            style={Styles.comboBox}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ category: itemValue })
            }
          >
            <Picker.Item label={"Select a Categoty"} value="" />
            {allCategories.map(item => (
              <Picker.Item
                label={item.name}
                value={item.name}
                key={Math.random().toString()}
              />
            ))}
          </Picker>

          <TextInput
            placeholder="Enter Phone Number....."
            style={Styles.textInput}
            keyboardType="numeric"
            onChangeText={text => this.setState({ number: text })}
          />

          <TextInput
            placeholder="Enter Description....."
            style={Styles.textInputDes}
            onChangeText={text => this.setState({ description: text })}
            numberOfLines={10}
            multiline={true}
          />

          <TouchableOpacity
            style={Styles.btnBrowseImage}
            onPress={this._pickImage}
          >
            <Text style={Styles.txtBrowseImage}>Select Image</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={Styles.btnAddService}
            onPress={this.addService}
          >
            {!loader ? (
              <Text style={Styles.txtAddService}>Add</Text>
            ) : (
              <ActivityIndicator size="small" color="#0000ff" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    allCategories: state.generalReducer.allCategories
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddServicesScreen);
