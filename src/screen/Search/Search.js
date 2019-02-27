import React, { Component } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { Input, Item, Icon } from "native-base";

import { Styles } from "./Styles";
import { result } from "../../config/searchResult.json";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: []
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.setState({ result });
  }

  render() {
    const { result } = this.state;
    return (
      <View style={Styles.container}>
        <View style={Styles.searchContainer}>
          <Item rounded style={Styles.searchInput}>
            <Icon active name="search" style={{ color: "#99999c" }} />
            <Input
              placeholder="Search"
              style={Styles.input}
              placeholderTextColor="#99999c"
            />
          </Item>
        </View>
        <ScrollView contentContainerStyle={Styles.resultsContainer}>
          {result.map((item, index) => (
            <View key={index} style={Styles.resultWrapper}>
              <Image source={{ uri: item.image }} style={Styles.resultImage} />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}
