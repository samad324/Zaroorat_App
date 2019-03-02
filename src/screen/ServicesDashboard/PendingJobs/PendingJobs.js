import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import moment from "moment";
import { ListItem } from "native-base";

import { Styles } from "./Styles";
import { searchInDBWithDualQuery } from "../../../config/firebase";
import { Colors } from "../../../constants";
import { showToast } from "../../../config/helpers";

export class ServicesDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forOthersJobs: [],
      JobsForMe: [],
      isload: true
    };
  }

  componentDidMount = async () => {
    const { user } = this.props;
    try {
      const keys1 = ["status", "providerId"];
      const values1 = ["pending", user.uid];
      const forOthersJobs = await searchInDBWithDualQuery(
        "contracts",
        keys1,
        values1
      );
      const keys2 = ["status", "customerId"];
      const values2 = ["pending", user.uid];
      const JobsForMe = await searchInDBWithDualQuery(
        "contracts",
        keys2,
        values2
      );
      this.setState({ forOthersJobs, JobsForMe, isload: false });
    } catch (error) {
      console.log(error);
      showToast("Something went wrong!", "danger");
    }
  };

  renderJobsForME = Jobs => {
    return Jobs.map((item, index) => {
      const { service, customer } = item;
      return (
        <TouchableOpacity
          style={Styles.serviceContainer}
          key={index}
          // onPress={() => this.navigate("ViewService", { service: item })}
        >
          <View style={[Styles.innerContainer, { flex: 1.2 }]}>
            <View style={Styles.serviceImageContainer}>
              <Image
                source={{ uri: service.image }}
                resizeMode="cover"
                style={Styles.serviceImage}
              />
            </View>
          </View>
          <View style={[Styles.innerContainer, { flex: 2 }]}>
            <View style={Styles.txtContainer}>
              <Text style={[Styles.innerTxt, { fontSize: 18 }]}>
                {service.title}
              </Text>
              <Text style={Styles.innerTxt}>{service.description}</Text>
              <Text style={Styles.innerTxt}>From: {customer.name}</Text>
            </View>
          </View>
          <View style={[Styles.innerContainer, Styles.serviceTimeContainer]}>
            <Text style={Styles.timeTxt}>
              {moment(item.timeStamp).fromNow()}
            </Text>
            <Text style={[Styles.timeTxt, { fontSize: 16 }]}>
              Rs. {item.rate}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  renderJobsForOthers = Jobs => {
    return Jobs.map((item, index) => {
      const { service } = item;
      return (
        <TouchableOpacity
          style={Styles.serviceContainer}
          key={index}
          // onPress={() => this.navigate("ViewService", { service: item })}
        >
          <View style={[Styles.innerContainer, { flex: 1.2 }]}>
            <View style={Styles.serviceImageContainer}>
              <Image
                source={{ uri: service.image }}
                resizeMode="cover"
                style={Styles.serviceImage}
              />
            </View>
          </View>
          <View style={[Styles.innerContainer, { flex: 2 }]}>
            <View style={Styles.txtContainer}>
              <Text style={[Styles.innerTxt, { fontSize: 18 }]}>
                {service.title}
              </Text>
              <Text style={Styles.innerTxt}>{service.description}</Text>
              <Text style={Styles.innerTxt}>To: {service.provider.name}</Text>
            </View>
          </View>
          <View style={[Styles.innerContainer, Styles.serviceTimeContainer]}>
            <Text style={Styles.timeTxt}>
              {moment(item.timeStamp).fromNow()}
            </Text>
            <Text style={[Styles.timeTxt, { fontSize: 16 }]}>
              Rs. {item.rate}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  render() {
    const { JobsForMe, forOthersJobs, isload } = this.state;
    return isload ? (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    ) : (
      <ScrollView style={Styles.container}>
        <ListItem itemDivider>
          <Text style={Styles.dividerTxt}>Jobs for you</Text>
        </ListItem>
        {this.renderJobsForME(JobsForMe)}
        <ListItem itemDivider>
          <Text style={Styles.dividerTxt}>Jobs for others</Text>
        </ListItem>
        {this.renderJobsForOthers(forOthersJobs)}
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
)(ServicesDashboard);
