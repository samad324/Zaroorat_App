import React from "react";
import { ScrollView, StyleSheet, View, Text, Alert } from "react-native";
import { Icon, Item, Picker } from "native-base";
import { Permissions, Contacts } from "expo";

import { Styles } from "../LoginScreen/Styles";

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      service: "",
      selected2: "",
      allContacts: []
    };
  }

  static navigationOptions = {
    title: "Links"
  };

  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }

  requestForPermissions = async () => {
    const permission = await Permissions.askAsync(Permissions.CONTACTS);
    if (permission.status !== "granted") {
      Alert.alert(
        "Hey!",
        "In order to search services by you contacts, you have to grant us this permission...",
        [
          {
            text: "Cancel",
            onPress: () => this.setState({ selected2: "" }),
            style: "cancel"
          },
          { text: "OK", onPress: () => this.requestForPermissions() }
        ],
        { cancelable: true }
      );
      return;
    } else {
      this.getAllContacts();
    }
  };

  getAllContacts = async () => {
    const contacts = await Contacts.getContactsAsync({
      fields: [Contacts.PHONE_NUMBERS]
    });
    if (contacts.total == 0) {
      alert("You didn't have any contacts in your phone");
    } else {
      const arr = contacts.data.map(contact => {
        let number = contact.phoneNumbers[0].number;
        number = number.includes("+92") ? number.replace("+92", "0") : number;
        number = number.replace(/ /g, "");
        return number;
      });
      this.setState({ allContacts: arr });
    }
  };

  renderBySelection = () => {
    const { selected2 } = this.state;

    switch (selected2) {
      case "contacts":
        return this.searchBycontact();
      case "location":
        return this.searchByLocation();
      case "categories":
        return this.searchByCategory();
      default:
        return <View />;
    }
  };

  searchBycontact = () => {
    this.requestForPermissions();
    return (
      <View>
        <Text>searchBycontact</Text>
      </View>
    );
  };
  searchByLocation = () => {
    return (
      <View>
        <Text>searchByLocation</Text>
      </View>
    );
  };
  searchByCategory = () => {
    return (
      <View>
        <Text>searchByCategory</Text>
      </View>
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={Styles.pickerConatiner}>
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              placeholder="Select your SIM"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.selected2}
              onValueChange={this.onValueChange2.bind(this)}
            >
              <Picker.Item label="Search" value="" />
              <Picker.Item label="Search by Contacts" value="contacts" />
              <Picker.Item label="Search by Location" value="location" />
              <Picker.Item label="Search by Categories" value="categories" />
            </Picker>
          </Item>
        </View>
        <View>{this.renderBySelection()}</View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
