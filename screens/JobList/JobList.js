import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux';
import CustomHeader from '../../components/CustomHeader';
import { Styles } from './Styles';
import GeneralStyles from '../GeneralStyles';
import {
    Icon,
    Item,
    Picker,
    List,
    ListItem,
    Left,
    Body,
    Right,
    Thumbnail
} from "native-base";
import moment from 'moment';
import firebase from "firebase";
import "firebase/firestore";


class JobList extends Component {
    constructor() {
        super();

        this.state = {
            title: "Job List",
            pendingJobs: [],
            activeJobs: [],
            completedJobs: [],
            isLoading: true
        }
    }

    componentDidMount() {
        const { title } = this.props.navigation.state.params;

        if(title === "pending"){
            console.log("fetching pending jobs");
            this.fetchPendingJobsRealTime();
        }
        else if(title === "active"){
            console.log("fetching active jobs");
            this.fetchActiveJobsRealTime();
        }
        else if(title === "completed"){
            console.log("fetching completed jobs");
            this.fetchCompletedJobsRealTime();
        }

        this.setState({ title })
    }

    async fetchPendingJobsRealTime() {
        const { user } = this.props;

        firebase.firestore().collection("contract")
            .where("receiverId", "==", user.uid)
            .where("status", "==", "pending")
            .onSnapshot(querySnapshot => {
                let pendingJobs = [];
                console.log("querySnapshot =>", querySnapshot);
                querySnapshot.forEach(snapshot => {
                    console.log("snapshot =>", snapshot);
                    pendingJobs.push({ ...snapshot.data(), serviceId: snapshot.id })
                })

                console.log("pendingJobs =>", pendingJobs);
                this.setState({ pendingJobs, isLoading: false });
            })
    }

    async fetchActiveJobsRealTime() {
        const { user } = this.props;

        firebase.firestore().collection("contract")
            .where("receiverId", "==", user.uid)
            .where("status", "==", "accepted")
            .onSnapshot(querySnapshot => {
                let activeJobs = [];
                console.log("querySnapshot =>", querySnapshot);
                querySnapshot.forEach(snapshot => {
                    console.log("snapshot =>", snapshot);
                    activeJobs.push({ ...snapshot.data(), serviceId: snapshot.id })
                })

                console.log("activeJobs =>", activeJobs);
                this.setState({ activeJobs, isLoading: false });
            })
    }

    async fetchCompletedJobsRealTime() {
        const { user } = this.props;

        firebase.firestore().collection("contract")
            .where("receiverId", "==", user.uid)
            .where("status", "==", "completed")
            .onSnapshot(querySnapshot => {
                let completedJobs = [];
                console.log("querySnapshot =>", querySnapshot);
                querySnapshot.forEach(snapshot => {
                    console.log("snapshot =>", snapshot);
                    completedJobs.push({ ...snapshot.data(), serviceId: snapshot.id })
                })

                console.log("completedJobs =>", completedJobs);
                this.setState({ completedJobs, isLoading: false });
            })
    }

    render() {
        const { title, pendingJobs, isLoading, activeJobs, completedJobs } = this.state;
        let data = pendingJobs;

        if(title === "active"){
            data = activeJobs
        }
        else if(title === 'completed'){
            data = completedJobs
        }

        return (
            <View style={[GeneralStyles.flex1]}>
                <CustomHeader title={title} />
                <View style={[GeneralStyles.flex1, GeneralStyles.alignItemsCenter]}>
                    {
                        isLoading ?
                            <ActivityIndicator color="black" size="large" />
                            :
                            data.map(job => {
                                return (
                                    <ListItem
                                        avatar
                                        key={Math.random().toString()}
                                        onPress={() => this.props.navigation.navigate("JobDetailsScreen", { item: job, action: title, from: "JobList" })}
                                        style={GeneralStyles.fullWidth}
                                    >
                                        <Left>
                                            <Thumbnail source={{ uri: job.thumbnail }} />
                                        </Left>
                                        <Body>
                                            <Text>{job.title}</Text>
                                            <Text note>{job.description}</Text>
                                        </Body>
                                        <Right>
                                            <Text note>{moment(job.timeStamp).fromNow()}</Text>
                                        </Right>
                                    </ListItem>
                                )
                            })
                    }
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
)(JobList);