import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native'
import { connect } from 'react-redux';
import { Styles } from './Styles';
import GeneralStyles from '../GeneralStyles';
import CustomHeader from '../../components/CustomHeader';
import Layout from '../../constants/Layout';
import _ from 'lodash';
import { sendContract, responseToContract, createRoom } from '../../config/firebase';

class JobDetailsScreen extends Component {
    constructor() {
        super();

        this.state = {
            title: "",
            description: "",
            category: "",
            phone: "",
            user: {}
        }
    }

    componentDidMount() {
        const { allUsers } = this.props;
        const { item, action, from } = this.props.navigation.state.params;
        let user = _.find(allUsers, { uid: item.providerId }) || {};

        if (from === "JobList") {
            user = _.find(allUsers, { uid: item.senderId }) || {};
        }

        this.setState({ ...item, user, action }, () => console.log("this.state =>", this.state))
    }

    async makeContract() {
        const { title, user: otherUser, phone, description, category, thumbnail, serviceId } = this.state;
        const { user } = this.props;

        try {
            const data = {
                receiverId: otherUser.uid,
                senderId: user.uid,
                title,
                description,
                category,
                phone,
                thumbnail,
                serviceId,
                timeStamp: Date.now(),
                status: "pending"
            }

            await sendContract(data);
            Alert.alert(
                'Woah!',
                'Contract send!',
                [
                    { text: 'Got it', onPress: () => this.props.navigation.goBack() },
                ],
                { cancelable: false },
            );
        }
        catch (e) {
            alert(e)
        }
    }

    async responseContract(status) {
        const { serviceId } = this.state;

        try {
            await responseToContract(serviceId, status);

            if (status === "accepted") {
                Alert.alert(
                    'Woah!',
                    'Congratz! remember to work hard',
                    [
                        { text: 'Got it', onPress: () => this.props.navigation.goBack() },
                    ],
                    { cancelable: false },
                );
            }
            else if (status === "rejected") {
                Alert.alert(
                    'Well!',
                    'No Worries! you will get more offers',
                    [
                        { text: 'Never mine', onPress: () => this.props.navigation.goBack() },
                    ],
                    { cancelable: false },
                );
            }
            else if (status === "completed") {
                Alert.alert(
                    'Woah!',
                    'Hope! you had a great work',
                    [
                        { text: 'yeah', onPress: () => this.props.navigation.goBack() },
                    ],
                    { cancelable: false },
                );
            }
        }
        catch (e) {
            alert(e.message)
        }
    }

    async startConversation(currentUser, otherUser) {
        const { allUsers } = this.props;

        try {
            const response = await createRoom(currentUser, otherUser);
            const otherUserInfo = _.find(allUsers, { uid: otherUser }) || {};

            if (response) {
                otherUserInfo.roomId = response.roomId;
                this.props.navigation.navigate("ChatScreen", { otherUser: otherUserInfo });
            }
        }
        catch (e) {
            alert(e)
        }
    }

    render() {
        const { phone, description, title, category, thumbnail, user, action } = this.state;
        const { user: currentUser } = this.props;

        return (
            <View style={[GeneralStyles.flex1]}>
                <CustomHeader title="Details" />
                <ScrollView style={[GeneralStyles.flex1, GeneralStyles.secondaryBackground]}>
                    <View style={[GeneralStyles.flex1, GeneralStyles.secondaryBackground, GeneralStyles.alignItemsCenter, { paddingTop: 30 }]}>
                        {
                            thumbnail &&
                            <Image
                                style={{ width: Layout.window.width * 0.5, height: Layout.window.width * 0.5, borderRadius: 20, borderColor: "white", borderWidth: 5 }}
                                source={{ uri: thumbnail }}
                            />
                        }
                        <View style={{ paddingTop: 15, width: Layout.window.width }}>
                            <View style={{ flexDirection: "row", backgroundColor: "white", padding: 15 }}>
                                <Text style={{ width: 100 }}>Title:</Text>
                                <Text style={GeneralStyles.flex1}>{title}</Text>
                            </View>
                            <View style={{ flexDirection: "row", backgroundColor: "white", padding: 15 }}>
                                <Text style={{ width: 100 }}>Description:</Text>
                                <Text style={GeneralStyles.flex1}>{description}</Text>
                            </View>
                            <View style={{ flexDirection: "row", backgroundColor: "white", padding: 15 }}>
                                <Text style={{ width: 100 }}>Category:</Text>
                                <Text style={GeneralStyles.flex1}>{category}</Text>
                            </View>
                            <View style={{ flexDirection: "row", backgroundColor: "white", padding: 15 }}>
                                <Text style={{ width: 100 }}>Phone:</Text>
                                <Text style={GeneralStyles.flex1}>{phone}</Text>
                            </View>
                            <View style={{ flexDirection: "row", backgroundColor: "white", padding: 15 }}>
                                <Text style={{ width: 100 }}>Username:</Text>
                                <Text style={GeneralStyles.flex1}>{user.name}</Text>
                            </View>
                        </View>
                        {
                            !action &&
                            <TouchableOpacity style={{ width: Layout.window.width * 0.7, padding: 20, backgroundColor: "red", marginTop: 15, marginBottom: 15 }} onPress={() => this.makeContract()}>
                                <Text style={GeneralStyles.fontCenter}>Hire me</Text>
                            </TouchableOpacity>
                        }
                        {
                            action === "pending" &&
                            <View style={GeneralStyles.flexRow}>
                                <TouchableOpacity style={GeneralStyles.buttonContainerHalf} onPress={() => this.responseContract("accepted")}>
                                    <Text style={GeneralStyles.fontCenter}>Accept</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={GeneralStyles.buttonContainerHalf} onPress={() => this.responseContract("rejected")}>
                                    <Text style={GeneralStyles.fontCenter}>Reject</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        {
                            action === "active" &&
                            <View style={GeneralStyles.flexRow}>
                                <TouchableOpacity style={GeneralStyles.buttonContainerHalf} onPress={() => this.responseContract("completed")}>
                                    <Text style={GeneralStyles.fontCenter}>End Contract</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={GeneralStyles.buttonContainerHalf} onPress={() => this.startConversation(currentUser.uid, user.uid)}>
                                    <Text style={GeneralStyles.fontCenter}>Start Conversation</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                </ScrollView>
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
)(JobDetailsScreen);