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
import { ImagePicker } from "expo";
import { Styles } from "./Styles";
import { uploadImagesToStorage , addServiceToFirestore } from "../../config/firebase";

export default class AddServicesScreen extends React.Component {
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
      loader : false
    };
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4]
    });

    console.log("result",result);

    if (!result.cancelled) {
      this.setState({
        thumbnail: result.uri
      });
    }
  };

  addService = async () => {
    const { title , category , description , number , thumbnail } = this.state
    
    // console.log("title" , title)
    // console.log("category" , category)
    // console.log("description" , description)
    // console.log("number" , number)
    // console.log("thumbnail" , thumbnail)

    this.setState({
      loader : true
    })

    const promises = uploadImagesToStorage(thumbnail);

    Promise.all(promises).then(res => {
      addServiceToFirestore(1,title,category,number,description,res).then(() => {
        alert("Added Successfully.....");
        this.setState({
          loader : false
        })
      });
    })
  }

  render() {
    const { category , loader } = this.state;

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
            <Picker.Item label="Select Category" value="select category" />
            <Picker.Item label="Education" value="education" />
            <Picker.Item label="Web Development" value="webdevelopment" />
            <Picker.Item label="Repairing" value="machenic" />
            <Picker.Item label="Electrition" value="electrition" />
          </Picker>

          <TextInput
            placeholder="Enter Phone Number....."
            style={Styles.textInput}
            keyboardType='numeric'
            onChangeText={text => this.setState({ number: text })}
          />

          <TextInput
            placeholder="Enter Description....."
            style={Styles.textInputDes}
            onChangeText={text => this.setState({ description: text })}
            numberOfLines={10}
            multiline={true}
          />

          <TouchableOpacity style={Styles.btnBrowseImage} onPress={this._pickImage}>
            <Text style={Styles.txtBrowseImage}>Select Image</Text>
          </TouchableOpacity>

          <TouchableOpacity style={Styles.btnAddService} onPress={this.addService}>
            {!loader ?  <Text style={Styles.txtAddService}>Add</Text> 
            : 
            <ActivityIndicator size="small" color="#0000ff" />
            }
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
