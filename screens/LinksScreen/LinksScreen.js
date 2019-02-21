import React from "react";
import { ScrollView, StyleSheet, View, Text, Alert } from "react-native";
import {
  Icon,
  Item,
  Picker,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail
} from "native-base";
import { Permissions, Contacts, Location } from "expo";
import { connect } from "react-redux";
import moment from "moment";

import { Styles } from "../LoginScreen/Styles";
import { fetchServiceByUser, setUserLocation } from "../../config/firebase";

class LinksScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      service: "",
      selected2: "",
      allContacts: [],
      filteredContact: [],
      contactResults: [],
      selectedTerm: ""
    };
  }

  static navigationOptions = {
    title: "Links"
  };

  componentDidMount() {
    this.requestForPermissions();
  }

  onValueChange2(value) {
    this.setState(
      {
        selected2: value
      },
      () => this.renderBySelection()
    );
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

  filterContacts = async () => {
    const { allUsers } = this.props;
    const { allContacts } = this.state;
    const filteredContact = await allUsers.filter(item =>
      allContacts.includes(item.phoneNumber)
    );

    return filteredContact;
  };

  fetchAllContact = async () => {
    const filteredContact = await this.filterContacts();
    const result = [];
    const services = await fetchServiceByUser(filteredContact);
    services.forEach(item => {
      item.forEach(item => {
        result.push(item.data());
      });
    });
    console.log(result);
    this.setState({ contactResults: result });
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
    this.fetchAllContact();
  };

  searchByLocation = () => {
    this.setState({ selectedTerm: "searchByLocation" });
  };

  searchByCategory = () => {
    this.setState({ selectedTerm: "SearchedByCategory" });
  };

  render() {
    const { contactResults } = this.state;

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
        <View>
          <View>
            <List>
              {contactResults.map((item, index) => {
                return (
                  <ListItem avatar key={index}>
                    <Left>
                      <Thumbnail source={{ uri: item.thumbnail }} />
                    </Left>
                    <Body>
                      <Text>{item.title}</Text>
                      <Text note>{item.description}</Text>
                    </Body>
                    <Right>
                      <Text note>{moment(item.timeStamp).fromNow()}</Text>
                    </Right>
                  </ListItem>
                );
              })}
            </List>
          </View>
        </View>
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

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    allUsers: state.authReducer.allUsers
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinksScreen);
