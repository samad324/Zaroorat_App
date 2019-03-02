import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { Tabs, Tab } from "native-base";

import { Styles } from "./Styles";
import ActiveJobs from "./ActiveJobs/ActiveJobs";
import PendingJobs from "./PendingJobs/PendingJobs";
import RejectedJobs from "./RejectedJobs/RejectedJobs";
import { Colors } from "../../constants";

export class ServicesDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  renderTabs = () => {};

  render() {
    return (
      <View style={Styles.container}>
        <Tabs style={{ backgroundColor: Colors.blue }}>
          <Tab heading="Pending Jobs" textStyle={{ fontSize: 12 }}>
            <PendingJobs />
          </Tab>
          <Tab heading="Active Jobs" textStyle={{ fontSize: 12 }}>
            <ActiveJobs />
          </Tab>
          <Tab heading="Rejected Jobs" textStyle={{ fontSize: 12 }}>
            <RejectedJobs />
          </Tab>
        </Tabs>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesDashboard);
