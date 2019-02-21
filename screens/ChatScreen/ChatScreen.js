import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux';
import { TextInput } from 'react-native';

import { Styles } from './Styles';
import GeneralStyles from '../GeneralStyles';

class ChatScreen extends Component {
    constructor() {
        super();

        this.state = {
            message: ""
        }
    }
    render() {
        return (
            <View style={[GeneralStyles.flex1, GeneralStyles.secondaryBackground]}>
                <View style={Styles.messageContainer}>
                    <ScrollView>
                        <View style={GeneralStyles.flexRow}>
                            <View style={[Styles.messageBoxYour]}>
                                <Image source={{ uri: "https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png" }} style={Styles.avatar} />
                                <Text style={[GeneralStyles.flex1, GeneralStyles.fontWhite, { marginLeft: 10 }]}>Hola there!</Text>
                            </View>
                        </View>
                        <View style={[GeneralStyles.flexRow, GeneralStyles.justifyContentEnd]}>
                            <View style={[Styles.messageBoxOther]}>
                                <Image source={{ uri: "https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png" }} style={Styles.avatar} />
                                <Text style={[Styles.message]}>Hola there!</Text>
                            </View>
                        </View>
                        <View style={[GeneralStyles.flexRow, GeneralStyles.justifyContentEnd]}>
                            <View style={[Styles.messageBoxOther]}>
                                <Image source={{ uri: "https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png" }} style={Styles.avatar} />
                                <Text style={[Styles.message]}>Hola there!</Text>
                            </View>
                        </View>
                        <View style={[GeneralStyles.flexRow, GeneralStyles.justifyContentEnd]}>
                            <View style={[Styles.messageBoxOther]}>
                                <Image source={{ uri: "https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png" }} style={Styles.avatar} />
                                <Text style={[Styles.message]}>Hola there!</Text>
                            </View>
                        </View>
                        <View style={[GeneralStyles.flexRow, GeneralStyles.justifyContentEnd]}>
                            <View style={[Styles.messageBoxOther]}>
                                <Image source={{ uri: "https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png" }} style={Styles.avatar} />
                                <Text style={[Styles.message]}>Hola there!</Text>
                            </View>
                        </View>
                        <View style={[GeneralStyles.flexRow, GeneralStyles.justifyContentEnd]}>
                            <View style={[Styles.messageBoxOther]}>
                                <Image source={{ uri: "https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png" }} style={Styles.avatar} />
                                <Text style={[Styles.message]}>Hola there!</Text>
                            </View>
                        </View>
                        <View style={GeneralStyles.flexRow}>
                            <View style={[Styles.messageBoxYour]}>
                                <Image source={{ uri: "https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png" }} style={Styles.avatar} />
                                <Text style={[GeneralStyles.flex1, GeneralStyles.fontWhite, { marginLeft: 10 }]}>Hola there!</Text>
                            </View>
                        </View>
                        <View style={[GeneralStyles.flexRow, GeneralStyles.justifyContentEnd]}>
                            <View style={[Styles.messageBoxOther]}>
                                <Image source={{ uri: "https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png" }} style={Styles.avatar} />
                                <Text style={[Styles.message]}>Hola there!</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={{ height: 70 }}>
                    <View style={[GeneralStyles.flexRow, GeneralStyles.flex1, GeneralStyles.alignItemsEnd]}>
                        <TextInput
                            style={[GeneralStyles.flex1, Styles.messageInput]}
                            onChangeText={(message) => this.setState({ message })}
                            multiline={true}
                        />
                        <TouchableOpacity style={Styles.inputBtn}>
                            <Text style={GeneralStyles.fontWhite}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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