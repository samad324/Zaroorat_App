import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Icon } from 'expo';
import { withNavigation } from 'react-navigation';

class CustomHeader extends Component {
    render() {
        return (
            <View style={{ paddingTop: 20, backgroundColor: "white", height: 80, flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Icon.Ionicons
                        name="ios-arrow-round-back"
                        size={40}
                        style={{ marginRight: 15, marginLeft: 10 }}
                        color="black"
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: 18 }}>{this.props.title}</Text>
            </View>
        )
    }
}

export default withNavigation(CustomHeader)