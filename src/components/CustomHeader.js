import React, { Component } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title
} from "native-base";

export default class CustomHeader extends Component {
  render() {
    return (
      <ImageBackground
        source={require("../../assets/topBarBg.png")}
        style={Styles.bgImg}
        resizeMode="cover"
      >
        <View style={{ justifyContent: "center" }}>
          <Header transparent>
            <Left>
              <Button transparent onPress={this.props.close}>
                <Image
                  source={require("../../assets/icons/arrow-back.png")}
                  style={Styles.arrow}
                />
              </Button>
            </Left>
            <Body>
              <Title style={{ paddingLeft: 20 }}>Price</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.props.close} />
            </Right>
          </Header>
        </View>
      </ImageBackground>
    );
  }
}

const Styles = StyleSheet.create({
  bgImg: {
    width: "100%"
  },
  arrow: {
    width: 20,
    height: 20
  }
});
