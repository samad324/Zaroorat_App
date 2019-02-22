import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux';
import { TextInput } from 'react-native';
import firebase from "firebase";
import "firebase/firestore";
import _ from 'lodash';
import { Styles } from './Styles';
import GeneralStyles from '../GeneralStyles';

class InboxScreen extends Component {
    constructor() {
        super();

        this.state = {
            inboxData: [],
            isLoading: true
        }

        this.fetchMessageInbox = this.fetchMessageInbox.bind(this);
    }

    componentDidMount() {
        const { allUsers } = this.props;
        this.isDoing = false;

        if (allUsers.length > 1) {
            this.isDoing = true;
            this.fetchMessageInbox();
        }
    }

    componentWillReceiveProps(nextProps) {
        const { allUsers } = nextProps;

        if (allUsers.length > 1 && !this.isDoing) {
            this.isDoing = true;
            this.fetchMessageInbox();
        }
    }

    async fetchMessageInbox() {
        const { user, allUsers } = this.props;
        let inboxData = [];

        firebase.firestore().collection("chat").where(`users.${user.uid}`, "==", true).onSnapshot((querySnapshot) => {
            let allUserInbox = [];
            inboxData = [];
            querySnapshot.forEach(snapshot => {
                allUserInbox.push({ ...snapshot.data(), roomId: snapshot.id })
            });

            allUserInbox.forEach(u => {
                let arr = Object.keys(u.users);
                arr = arr.filter(i => i !== user.uid);
                const otherUid = arr[0];
                const otherUser = _.find(allUsers, { uid: otherUid });

                if (otherUser) {
                    inboxData.push({ ...otherUser, roomId: u.roomId })
                }
            })

            this.setState({ inboxData, isLoading: false })
        })
    }

    render() {
        const { inboxData, isLoading } = this.state;

        return (
            <View style={[GeneralStyles.flex1, GeneralStyles.secondaryBackground]}>
                {
                    isLoading ?
                        <ActivityIndicator color="white" size="large" />
                        :
                        inboxData.map(d => {
                            return (
                                <TouchableOpacity key={Math.random().toString()} style={[Styles.mainMessageBox]} onPress={() => this.props.navigation.navigate("ChatScreen", { otherUser: d })}>
                                    <View style={[Styles.messageBox]}>
                                        <Image source={{ uri: d.photo }} style={Styles.avatar} />
                                        <Text style={[Styles.message]}>{d.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                }
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
        allUsers: state.authReducer.allUsers
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InboxScreen);