import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux';
import { TextInput } from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import firebase from "firebase";
import "firebase/firestore";
import { sendMessage } from '../../config/firebase';

import { Styles } from './Styles';
import GeneralStyles from '../GeneralStyles';

class ChatScreen extends Component {
  constructor() {
    super();

    this.state = {
      message: "",
      otherUser: undefined,
      allMessages: [],
      isLoading: true
    }
  }

  componentDidMount() {
    const { otherUser } = this.props.navigation.state.params;

    this.setState({ otherUser })
    this.fetchRoomMessagesRealTime();
  }

  async fetchRoomMessagesRealTime() {
    const { otherUser } = this.props.navigation.state.params;

    firebase.firestore().collection("chat").doc(otherUser.roomId).collection("messages").orderBy("timeStamp").onSnapshot((querySnapshot) => {
      let allMessages = [];

      querySnapshot.forEach(snapshot => {
        allMessages.push({ ...snapshot.data(), messageId: snapshot.id })
      })

      this.setState({ allMessages, isLoading: false })
    })
  }

  async createMessage() {
    const { otherUser } = this.props.navigation.state.params;
    const { message } = this.state;
    const { user } = this.props;

    try {
      this.setState({ message: "" })
      await sendMessage(otherUser.roomId, { message, senderId: user.uid, receiverId: otherUser.uid, timeStamp: Date.now() });
    }
    catch (e) {
      alert("Error sending message");
    }
  }

  render() {
    const { otherUser, allMessages, isLoading } = this.state;
    const { user } = this.props;

    return (
      otherUser ?
        <View style={[GeneralStyles.flex1, GeneralStyles.secondaryBackground]}>
          <CustomHeader title={otherUser.name} />
          {
            isLoading ?
              <ActivityIndicator color="black" size="large" />
              :
              <KeyboardAvoidingView style={[GeneralStyles.flex1]} behavior="padding" enabled>
                <View style={[GeneralStyles.flex1]}>
                  <View style={Styles.messageContainer}>
                    <ScrollView>
                      {
                        allMessages.map(m => {
                          if (m.senderId === user.uid) {
                            return (
                              <View key={Math.random().toString()} style={GeneralStyles.flexRow}>
                                <View style={[Styles.messageBoxYour]}>
                                  <Image source={{ uri: user.photo }} style={Styles.avatar} />
                                  <Text style={[GeneralStyles.flex1, GeneralStyles.fontWhite, { marginLeft: 10 }]}>{m.message}</Text>
                                </View>
                              </View>

                            )
                          }
                          else {
                            return (
                              <View key={Math.random().toString()} style={[GeneralStyles.flexRow, GeneralStyles.justifyContentEnd]}>
                                <View style={[Styles.messageBoxOther]}>
                                  <Image source={{ uri: otherUser.photo }} style={Styles.avatar} />
                                  <Text style={[Styles.message]}>{m.message}</Text>
                                </View>
                              </View>
                            )
                          }
                        })
                      }
                    </ScrollView>
                  </View>
                  <View style={{ height: 70 }}>
                    <View style={[GeneralStyles.flexRow, GeneralStyles.flex1, GeneralStyles.alignItemsEnd]}>
                      <TextInput
                        style={[GeneralStyles.flex1, Styles.messageInput]}
                        value={this.state.message}
                        onChangeText={(message) => this.setState({ message })}
                        multiline={true}
                      />
                      <TouchableOpacity style={Styles.inputBtn} onPress={() => this.createMessage()}>
                        <Text style={GeneralStyles.fontWhite}>Send</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </KeyboardAvoidingView>
          }
        </View>
        :
        null
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatScreen);