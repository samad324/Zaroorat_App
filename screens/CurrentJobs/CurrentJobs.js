import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import CustomHeader from '../../components/CustomHeader';
import { Styles } from './Styles';
import GeneralStyles from '../GeneralStyles';

class CurrentJobs extends Component {
    render() {
        return (
            <View style={[GeneralStyles.flex1]}>
                <CustomHeader title="Jobs" />
                <View style={[GeneralStyles.flex1, GeneralStyles.perfectlyCentered]}>
                    <TouchableOpacity style={GeneralStyles.buttonContainerFull} onPress={() => this.props.navigation.navigate("JobListScreen", { title: "pending" })}>
                        <Text>Pending Offers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={GeneralStyles.buttonContainerFull} onPress={() => this.props.navigation.navigate("JobListScreen", { title: "active" })}>
                        <Text>Current Jobs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={GeneralStyles.buttonContainerFull} onPress={() => this.props.navigation.navigate("JobListScreen", { title: "completed" })}>
                        <Text>Completed Jobs</Text>
                    </TouchableOpacity>
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
)(CurrentJobs);