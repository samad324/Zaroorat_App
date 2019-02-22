import React, { Component } from "react";
import { Text, View } from "react-native";
import { styles } from "../../styles";

export class EditProfile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.fonts}> 👨 EditProfile </Text>
      </View>
    );
  }
}
