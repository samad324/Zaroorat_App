import React, { Component } from "react";
import { Text, View, Image, ImageBackground } from "react-native";

import { Styles } from "./Styles";

export default class LikeNotification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  render() {
    const { data } = this.state;

    return (
      <View style={Styles.container}>
        <View style={[Styles.generalContainerStyle, Styles.imageContainer]}>
          <View>
            {/* <Image
              source={{ uri: data.profile_pic }}
              style={Styles.profilePic}
            />
            <Image
              source={require("../../../../assets/images/heart_like.png")}
              style={Styles.heartIcon}
            /> */}
            <ImageBackground
              source={{ uri: data.profile_pic }}
              imageStyle={Styles.background}
              style={{ width: 66, height: 66 }}
            >
              <View style={[Styles.profilePic]}>
                <Image
                  source={require("../../../../assets/images/heart_like.png")}
                  style={Styles.heartIcon}
                />
              </View>
            </ImageBackground>
          </View>
        </View>
        <View
          style={[Styles.generalContainerStyle, Styles.descriptionContainer]}
        >
          <View style={Styles.discriptionWrapper}>
            <Text style={Styles.name}>{data.name}</Text>
            <Text style={Styles.message}>Liked you picture</Text>
          </View>
        </View>
        <View style={[Styles.generalContainerStyle, Styles.postContainer]}>
          <Text>a</Text>
        </View>
      </View>
    );
  }
}
