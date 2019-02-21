import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native'
import { connect } from 'react-redux';
import { Styles } from './Styles';
import GeneralStyles from '../GeneralStyles';
import CustomHeader from '../../components/CustomHeader';
import Layout from '../../constants/Layout';
import _ from 'lodash';
import { sendContract } from '../../config/firebase';

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
        const { item } = this.props.navigation.state.params;
        const user = _.find(allUsers, { uid: item.providerId }) || {};

        this.setState({ ...item, user }, () => console.log("this.state =>", this.state))
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
            alert("Error making contract")
        }
    }

    render() {
        const { phone, description, title, category, thumbnail, user } = this.state;

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
                        <TouchableOpacity style={{ width: Layout.window.width * 0.7, padding: 20, backgroundColor: "red", marginTop: 15, marginBottom: 15 }} onPress={() => this.makeContract()}>
                            <Text style={GeneralStyles.fontCenter}>Hire me</Text>
                        </TouchableOpacity>
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