import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import { connect } from "react-redux";
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
import moment from "moment";

import { Styles } from "./Styles";
import Header from "../../components/CustomHeader";
import { fetchServiceByCategory } from "../../config/firebase";

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      result: []
    };
  }

  componentDidMount = async () => {
    const { category } = this.props.navigation.state.params;
    try {
      const services = await fetchServiceByCategory(category);
      const result = [];
      services.forEach(item => {
        item.forEach(item => {
          result.push(item.data());
        });
      });
      console.log("ress", result);
      this.setState({ category, result });
    } catch (error) {
      alert(error.message);
    }
  };

  navigate(item, screen) {
    console.log("item =>", item);
    this.props.navigation.navigate(screen, { item });
  }

  render() {
    const { category, result } = this.state;
    return (
      <View style={Styles.container}>
        <Header title={category} />
        <ScrollView>
          <List>
            {result.map((item, index) => {
              return (
                <ListItem
                  avatar
                  key={index}
                  onPress={this.navigate.bind(this, item, "JobDetailsScreen")}
                >
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
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
