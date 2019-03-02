import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import moment from "moment";

import { Styles } from "./Styles";
import { Colors } from "../../constants/index";

import { searchInDB } from "../../config/firebase";

export class ViewCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      services: [],
      isloading: true,
      isEmpty: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  componentDidMount = async () => {
    const { category } = this.props.navigation.state.params;
    const services = await searchInDB("services", "categoryTitle", category);
    console.log(services);
    this.setState({
      services,
      isloading: false,
      isEmpty: services.length ? false : true
    });
  };

  navigate = (route, prop = {}) => {
    const { navigation } = this.props;
    navigation.navigate(route, prop);
  };

  renderServices = services => {
    return services.map((item, index) => (
      <TouchableOpacity
        style={Styles.serviceContainer}
        key={index}
        onPress={() => this.navigate("ViewService", { service: item })}
      >
        <View style={[Styles.innerContainer, { flex: 1.2 }]}>
          <View style={Styles.serviceImageContainer}>
            <Image
              source={{ uri: item.image }}
              resizeMode="cover"
              style={Styles.serviceImage}
            />
          </View>
        </View>
        <View style={[Styles.innerContainer, { flex: 2 }]}>
          <View style={Styles.txtContainer}>
            <Text style={[Styles.innerTxt, { fontSize: 18 }]}>
              {item.title}
            </Text>
            <Text style={Styles.innerTxt}>{item.description}</Text>
          </View>
        </View>
        <View style={[Styles.innerContainer, Styles.serviceTimeContainer]}>
          <Text style={Styles.timeTxt}>{moment(item.timeStamp).fromNow()}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  render() {
    const { services, isloading, isEmpty } = this.state;
    return (
      <ScrollView
        style={Styles.container}
        contentContainerStyle={{ justifyContent: "center" }}
      >
        {isloading ? (
          <View>
            <ActivityIndicator size="large" color={Colors.blue} />
          </View>
        ) : isEmpty ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: Colors.grey }}>No Data!</Text>
          </View>
        ) : (
          this.renderServices(services)
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCategory);
