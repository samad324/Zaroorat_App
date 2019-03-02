import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  ActivityIndicator,
  Modal
} from "react-native";
import { connect } from "react-redux";
import { Button, Item, Input } from "native-base";

import { Styles } from "./Styles";
import { Colors } from "../../constants";
import CustomHeader from "../../components/CustomHeader";

import { addToDB } from "../../config/firebase";
import { showToast, getLocationAsync } from "../../config/helpers";

export class ViewService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      service: {},
      isLoading: false,
      modal: false,
      rate: ""
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  componentDidMount() {
    const { service } = this.props.navigation.state.params;
    this.setState({ service });
  }

  askForPrice = () => {
    const { modal } = this.state;
    this.setState({ modal: !modal });
  };

  makeContract = async () => {
    const { service, rate } = this.state;
    const { user, navigation } = this.props;

    this.setState({ isLoading: true, modal: false });
    try {
      const data = {
        service,
        rate,
        customer: user,
        providerId: service.providerId,
        customerId: user.uid,
        timeStamp: Date.now(),
        status: "pending"
      };

      const location = await getLocationAsync();
      data.location = location;
      console.log(data);
      await addToDB("contracts", data);
      this.setState({ isLoading: false });
      showToast("Contract send successfully!", "success");
      setTimeout(() => {
        navigation.navigate("ServicesDashboard");
      }, 2000);
    } catch (e) {
      console.log(e);
      this.setState({ isLoading: false });
      showToast("Something Went Wrong!", "danger");
    }
  };

  myModal = () => {
    const { rate } = this.state;
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modal}
          onRequestClose={() => {
            this.setState({ modal: false });
          }}
        >
          <CustomHeader close={this.askForPrice} />
          <View style={Styles.modalContainer}>
            <View>
              <Text style={Styles.priceTxt}>
                Please enter your offer price.
              </Text>
              <View style={Styles.inputFieldsWrapper}>
                <Item regular style={{ borderRadius: 4 }}>
                  <Input
                    placeholder="Rate per hour.."
                    placeholderTextColor="#99999c"
                    value={rate}
                    keyboardType="numeric"
                    onChangeText={event => this.setState({ rate: event })}
                  />
                </Item>
              </View>
            </View>
            <View styles={Styles.BtnContainer}>
              <Button rounded style={Styles.Btn} onPress={this.makeContract}>
                <Text style={Styles.btnText}>SEND CONTACT</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  render() {
    const { service, isLoading } = this.state;
    return (
      <ScrollView style={Styles.container}>
        <View style={Styles.topContainer}>
          <ImageBackground
            source={{ uri: service.image }}
            resizeMode="cover"
            style={Styles.ServeiceBackgroundImage}
          >
            <View style={Styles.userProfile}>
              <View style={Styles.imageContainer}>
                <Image
                  source={{ uri: service.provider && service.provider.photo }}
                  resizeMode="cover"
                  style={Styles.ServeiceImage}
                />
              </View>
              <View style={Styles.userNameContainer}>
                <Text style={Styles.userName}>
                  {service.provider && service.provider.name}
                </Text>
                <Text style={[Styles.userName, { color: Colors.grey }]}>
                  {service.provider && service.provider.email}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={Styles.bottomContainer}>
          <View style={Styles.listField}>
            <Text style={Styles.listHeading}>Title</Text>
            <Text style={Styles.listTxt}>{service.title}</Text>
          </View>
          <View style={Styles.listField}>
            <Text style={Styles.listHeading}>Description</Text>
            <Text style={Styles.listTxt}>{service.description}</Text>
          </View>
          <View style={Styles.listField}>
            <Text style={Styles.listHeading}>Number</Text>
            <Text style={Styles.listTxt}>
              {service.provider && service.provider.number}
            </Text>
          </View>
          <View styles={Styles.BtnContainer}>
            <Button rounded style={Styles.Btn} onPress={this.askForPrice}>
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={Styles.btnText}>SEND CONTACT</Text>
              )}
            </Button>
          </View>
        </View>
        {this.myModal()}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewService);
