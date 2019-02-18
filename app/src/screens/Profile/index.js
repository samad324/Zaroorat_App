import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { LinearGradient } from "expo";
import { EditProfile } from "./EditProfile";
import { styles } from "./styles";

class ProfileWithNav extends Component {
  EditButton = text => {
    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          return this.props.navigation.navigate("EditProfileScreen");
        }}
      >
        <Text style={styles.editTextBtn}>{text}</Text>
      </TouchableOpacity>
    );
  };

  User = () => {
    const { user } = this.props;
    console.log(user);
    // const urlPic = fetch(`${user.photoURL}?type=large&redirect=false`)
    //   .then(res => console.log("pic res", res))
    //   .catch(err => console.log("err", err));
    // console.log(urlPic);
    return (
      <View style={styles.container}>
        <LinearGradient colors={["#b92b27", "#fdfdfd"]}>
          <View style={styles.header} />
        </LinearGradient>
        <Image
          style={styles.avatar}
          source={{ uri: `${user.photoURL}?type=large` }}
        />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{user.displayName}</Text>
            {user.services ? (
              <View style={styles.services}>{user.title}</View>
            ) : (
              this.EditButton("Set Your Services")
            )}
            {this.EditButton("Edit Profile")}
          </View>
        </View>
      </View>
    );
  };
  render() {
    return this.User();
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user
});

// export const Home = withNavigation(HomeWithNav);

const Profile = connect(mapStateToProps)(withNavigation(ProfileWithNav));

export { Profile, EditProfile };
