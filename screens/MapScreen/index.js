import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Platform,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import MapView, { Polyline, Marker, AnimatedRegion } from "react-native-maps";
import {
  filterMechanic,
  setDeviceToken,
  SetPosition,
  pushReq,
  upateMechaincJobs,
  getMechanicData,
  acceptJobReq,
  createJobReq,
  JobReqRes,
  CalDistance,
  updateUserId
} from "./../../Config/Firebase";
import firebase from "react-native-firebase";
import Styles from "./Styles";
const haversine = require("haversine");
import MapViewDirections from "react-native-maps-directions";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Button
} from "native-base";
import { BoxShadow } from "react-native-shadow";
import _ from "underscore";

const db = firebase.firestore();

var foursquare = require("react-native-foursquare-api")({
  clientID: "224RPKIX35NN0ZUBWZDK5RAUOTPCVGQBQBEVN5WYMRP5RCGQ",
  clientSecret: "55YHEWUZLM2LGM44QVL3IHUAENYVD4QMVGC2ZFMEIARZAZUX",
  style: "foursquare", // default: 'foursquare'
  version: "20140806" //  default: '20140806'
});

const { height, width } = Dimensions.get("window");

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      latitude: "",
      longitude: "",
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      locSet: false,
      toggleInfo: false,
      onlineMecahics: [],
      allMechanics: [],
      markers: [],
      mechanicDetails: "",
      jobNotif: "",
      notifOpen: false,
      distOrigin: "",
      distDestination: "",
      calDist: 0,
      calDistTime: "00:00:00",
      jobAccepted: false,
      jobId: "",
      jobStatusId: "",
      userId: ""
    };
    this.getDeviceToken = this.getDeviceToken.bind(this);
    this.getMechanicAndUser = this.getMechanicAndUser.bind(this);
    this.JobReqResponse = this.JobReqResponse.bind(this);
    //this.updateMap = this.updateMap.bind(this);
    this.jobMapView = this.jobMapView.bind(this);
    this.updateMapLocation = this.updateMapLocation.bind(this);
  }

  componentWillMount() {
    this.getDeviceToken();
    this.getMechanicAndUser();
    setInterval(() => {
      this.getMechanicAndUser();
    }, 100000);
    this.setAsyncData();
  }

  componentDidMount() {
    this.watchPosition();
    this.onNotificationOpen();
    this.foregroundNotificationListner();
  }

  async setAsyncData() {
    let user = this.props.user;
    let userr = JSON.stringify(user);
    await AsyncStorage.setItem("user", userr);
  }

  async setToken(token) {
    let userId = this.props.user.id;
    let res = await setDeviceToken(userId, token);
  }

  async getDeviceToken() {
    const FCM = firebase.messaging();
    const fcmToken = FCM.getToken().then(token => {
      this.setToken(token);
    });
  }

  async setPosition(latitude, longitude) {
    var params = {
      ll: `${latitude},${longitude}`,
      query: "urdu"
    };

    foursquare.venues
      .getVenues(params)
      .then(function(venues) {})
      .catch(function(err) {});
    let userId = this.props.user.id;
    let res = await SetPosition(userId, latitude, longitude);
    //if(this.state.jobAccepted){
    //    console.log("Acceptedddddddddddddddddddddddddddd")
    //    const  {jobId, jobStatusId, user, userId} = this. state;
    //    if(this.state.user.isMechanic){
    //        let ress = await updateLocation(jobId, jobStatusId, userId, latitude, longitude);
    //    }
    //    else{
    //        let ress = await updateLocation(jobId, jobStatusId, user.id, latitude, longitude);
    //    }
    //}
  }

  async getMechanicAndUser() {
    console.log("hellllllllllllllllllllllllllllll");
    const mechanic = await filterMechanic();
    const onlineMechanic = [];
    const user = this.props.user;
    const userObj = {};
    userObj.coordinates = {
      latitude: user.latitude,
      longitude: user.longitude
    };
    userObj.name = user.firstName + " " + user.lastName;
    userObj.description = user.description;
    userObj.id = user.id;
    userObj.token = user.deviceToken;
    userObj.image = user.profilePicture;

    let markers = [];
    mechanic.map(mech => {
      if (mech.deviceToken) {
        onlineMechanic.push(mech);

        let obj = {};
        obj.coordinates = {
          latitude: mech.latitude,
          longitude: mech.longitude
        };
        obj.name = mech.firstName + " " + mech.lastName;
        obj.description = mech.description;
        obj.id = mech.id;
        obj.token = mech.deviceToken;
        obj.image = mech.profilePicture;
        obj.jobs = mech.jobs ? mech.jobs : [];
        obj.phoneNo = mech.phoneNo;
        markers.push(obj);
      }
    });
    markers.push(userObj);
    this.setState({
      onlineMecahics: onlineMechanic,
      allMechanics: mechanic,
      markers: markers
    });
  }

  foregroundNotificationListner() {
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const jobData = notification._data;
        const user = this.props.user;
        const destinationLogitude = parseFloat(jobData.longitude);
        const destinationLatitude = parseFloat(jobData.latitude);
        const origin = { latitude: 24.87217, longitude: 67.3529129 };
        const destination = {
          latitude: destinationLatitude,
          longitude: destinationLogitude
        };
        const obj = {
          coordinates: {
            latitude: destinationLatitude,
            longitude: destinationLogitude
          },
          name: jobData.name,
          id: jobData.id,
          phoneNo: jobData.phoneNo,
          profilePicture: jobData.profilePicture
        };

        notification._data &&
          this.setState(
            {
              jobNotif: obj,
              notifOpen: true,
              distOrigin: origin,
              distDestination: destination
            },
            () => {
              this.setUserView();
            }
          );
      });
  }
  onNotificationOpen() {
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification = notificationOpen.notification;
        const jobData = notification._data;
        const user = this.props.user;
        const destinationLogitude = parseFloat(jobData.longitude);
        const destinationLatitude = parseFloat(jobData.latitude);

        const origin = { latitude: 24.87217, longitude: 67.3529129 };
        const destination = {
          latitude: destinationLatitude,
          longitude: destinationLogitude
        };
        const obj = {
          coordinates: {
            latitude: destinationLatitude,
            longitude: destinationLogitude
          },
          name: jobData.name,
          id: jobData.id,
          phoneNo: jobData.phoneNo,
          profilePicture: jobData.profilePicture
        };

        notification._data &&
          this.setState(
            {
              jobNotif: obj,
              notifOpen: true,
              distOrigin: origin,
              distDestination: destination
            },
            () => {
              this.setUserView();
            }
          );
      });
  }

  watchPosition() {
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };
        this.setPosition(latitude, longitude);
        this.setState(
          {
            latitude,
            longitude,
            routeCoordinates: routeCoordinates.concat([newCoordinate]),
            prevLatLng: newCoordinate,
            locSet: true
          },
          () => {
            //setInterval(()=>{
            //    this.setPosition(latitude, longitude)
            //},5000)
          }
        );
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  async details(marker) {
    let user = this.props.user;
    let userLang = user.longitude;
    let userLat = user.latitude;
    let mecLang = marker.coordinates.longitude;
    let machLat = marker.coordinates.latitude;
    let res = await CalDistance(mecLang, machLat, userLang, userLat);
    let calDist = res.route.distance;
    let calDistTime = res.route.formattedTime;
    this.setState({ toggleInfo: true });
    this.setState({ mechanicDetails: marker, calDist, calDistTime });
  }

  async pushRequest() {
    const { mechanicDetails, user } = this.state;
    let res = await pushReq(user, mechanicDetails.id, mechanicDetails.token);
    if (res.id) {
      Alert.alert("", "Your job send successfully");

      let jobs = [];
      let obj = {};
      let updateStatusRes = await createJobReq(res.id, user.id);
      jobs = mechanicDetails.jobs;
      obj.jobId = res.id;
      obj.jobStatusId = updateStatusRes.id;
      jobs.push(obj);
      let ress = await upateMechaincJobs(
        jobs,
        mechanicDetails.id,
        updateStatusRes.id
      );
      this.JobReqResponse(res.id, user.id, updateStatusRes.id);

      this.setState({
        toggleInfo: false,
        jobId: res.id,
        jobStatusId: updateStatusRes.id
      });
    }
  }

  JobReqResponse(jobId, userId, statusId) {
    let data = {};
    db.collection("users")
      .doc(userId)
      .collection("pushReq")
      .doc(jobId)
      .collection("jobStatus")
      .doc(statusId)
      .onSnapshot(async doc => {
        if (doc.data().jobStatus == "Accept") {
          Alert.alert("", "Your job accepted");
          let updateuserId = await updateUserId(
            userId,
            this.state.mechanicDetails.id
          );
          //this.updateMap(doc.data());
          this.updateMapLocation();
        }
      });
  }

  updateMapLocation() {
    const { user } = this.state;
    let markers = [];
    db.collection("users")
      .doc(user.id)
      .onSnapshot(doc => {
        const originLogitude = parseFloat(doc.data().longitude);
        const originLatitude = parseFloat(doc.data().latitude);
        const origin = { latitude: originLatitude, longitude: originLogitude };
        let obj = {};
        obj.coordinates = {
          latitude: doc.data().latitude,
          longitude: doc.data().longitude
        };
        obj.name = doc.data().firstName + " " + doc.data().lastName;
        obj.description = doc.data().description;
        obj.id = doc.data().id;
        obj.token = doc.data().deviceToken;
        obj.image = doc.data().profilePicture;
        obj.jobs = doc.data().jobs ? doc.data().jobs : [];
        obj.phoneNo = doc.data().phoneNo;
        obj.isMechanic = doc.data().isMechanic;
        markers = [];
        markers.push(obj);
        db.collection("users")
          .doc(doc.data().jobReqId)
          .onSnapshot(doc => {
            const destinationLogitude = parseFloat(doc.data().longitude);
            const destinationLatitude = parseFloat(doc.data().latitude);
            const destination = {
              latitude: destinationLatitude,
              longitude: destinationLogitude
            };
            let obj1 = {};
            obj1.coordinates = {
              latitude: doc.data().latitude,
              longitude: doc.data().longitude
            };
            obj1.name = doc.data().firstName + " " + doc.data().lastName;
            obj1.description = doc.data().description;
            obj1.id = doc.data().id;
            obj1.image = doc.data().profilePicture;
            obj1.jobs = doc.data().jobs ? doc.data().jobs : [];
            obj1.phoneNo = doc.data().phoneNo;
            obj1.isMechanic = doc.data().isMechanic;
            markers.push(obj1);
            this.setState({
              distOrigin: origin,
              distDestination: destination,
              jobAccepted: true,
              markers: markers
            });
          });
      });
  }

  //updateMap(data){
  //    const destinationLogitude = parseFloat(data.mechanicLoc.longitude);
  //    const destinationLatitude = parseFloat(data.mechanicLoc.latitude);
  //    const origin = {latitude: 24.87217, longitude: 67.3529129};
  //    const destination = {latitude: destinationLatitude, longitude: destinationLogitude};
  //    this.setState({distOrigin: origin, distDestination: destination, jobAccepted: true})
  //}

  async acceptJob() {
    const { user, jobNotif } = this.state;
    const res = await getMechanicData(user.id);
    const jobs = res.jobs;
    const currentJob = _.last(jobs);
    let updateuserId = await updateUserId(user.id, jobNotif.id);
    let updateStatusRes = await acceptJobReq(currentJob, jobNotif, user);
    if (updateStatusRes == "Job Accepted Successfully") {
      this.updateMapLocation();
      this.setState({
        jobAccepted: true,
        jobId: currentJob.jobId,
        jobStatusId: currentJob.jobStatusId,
        userId: jobNotif.id
      });
      Alert.alert(updateStatusRes);
    } else {
      Alert.alert("Something went wrong");
    }
    this.setState({ notifOpen: false });
  }

  setUserView() {
    const { jobNotif } = this.state;
    return (
      <View
        style={{
          width: width,
          height: height * 0.4,
          position: "absolute",
          marginTop: height * 0.5
        }}
      >
        <Content padder>
          <Card>
            <CardItem header bordered style={{ height: height * 0.07 }}>
              <View style={{ width: width, flexDirection: "row" }}>
                <View
                  style={{
                    width: width * 0.65,
                    height: height * 0.07,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "#80aaff",
                      fontSize: 15,
                      fontWeight: "bold"
                    }}
                  >
                    Reaching destination in 19 minutes!
                  </Text>
                </View>
                <View
                  style={{
                    width: width * 0.25,
                    height: height * 0.07,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "#80aaff",
                      fontSize: 17,
                      fontWeight: "bold"
                    }}
                  >
                    {parseFloat(this.state.distanceTravelled).toFixed(2)} km
                  </Text>
                </View>
              </View>
            </CardItem>
            <CardItem bordered>
              <Body>
                <View
                  style={{
                    width: width,
                    height: height * 0.13,
                    flexDirection: "row"
                  }}
                >
                  <View
                    style={{
                      width: width * 0.4,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <View
                      style={{
                        width: width * 0.15,
                        height: width * 0.15,
                        borderRadius: 100
                      }}
                    >
                      {jobNotif.profilePicture ? (
                        <Image
                          source={{ uri: jobNotif.profilePicture }}
                          style={{
                            borderRadius: 100,
                            width: width * 0.12,
                            height: width * 0.12
                          }}
                        />
                      ) : (
                        <Image
                          source={require("./../../Images/profile.png")}
                          style={{ width: width * 0.12, height: width * 0.12 }}
                        />
                      )}
                    </View>
                    <View style={{ width: width * 0.4 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          marginLeft: width * 0.06
                        }}
                      >
                        {jobNotif.name}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: width * 0.003,
                      height: height * 0.11,
                      backgroundColor: "#b7b7b7",
                      marginTop: height * 0.012
                    }}
                  />
                  <View
                    style={{
                      width: width * 0.4,
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: width * 0.04
                    }}
                  >
                    <View style={{ width: width * 0.4, height: height * 0.06 }}>
                      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        {jobNotif.phoneNo}
                      </Text>
                    </View>
                    <View style={{ width: width * 0.4, height: height * 0.08 }}>
                      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Vehicle Type:
                      </Text>
                      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Bike
                      </Text>
                    </View>
                  </View>
                </View>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <View
                style={{
                  width: width,
                  height: height * 0.08,
                  flexDirection: "row"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.acceptJob();
                  }}
                  style={{
                    width: width * 0.4,
                    height: height * 0.07,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 20,
                    backgroundColor: "#4d79ff"
                  }}
                >
                  <Text>Accept Job</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: width * 0.4,
                    height: height * 0.07,
                    marginLeft: width * 0.04,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 20,
                    backgroundColor: "#ff3333"
                  }}
                >
                  <Text>Reject Job</Text>
                </TouchableOpacity>
              </View>
            </CardItem>
          </Card>
        </Content>
      </View>
    );
  }

  mechanicDetailsView() {
    return (
      <View
        style={{
          marginTop: height * 0.2,
          width: width,
          height: height * 0.7,
          position: "absolute"
        }}
      >
        <Content padder>
          <Card>
            <View
              style={{
                width: width * 0.9,
                height: height * 0.25,
                flexDirection: "row"
              }}
            >
              <View
                style={{
                  width: width * 0.5,
                  height: height * 0.25,
                  marginLeft: width * 0.25
                }}
              >
                <View
                  style={{
                    width: width * 0.2,
                    height: width * 0.2,
                    marginLeft: width * 0.12,
                    borderRadius: 100,
                    marginTop: height * 0.0375
                  }}
                >
                  {this.state.mechanicDetails &&
                  this.state.mechanicDetails.image ? (
                    <Image
                      style={{
                        width: width * 0.2,
                        height: width * 0.2,
                        borderRadius: 100
                      }}
                      source={{ uri: this.state.mechanicDetails.image }}
                    />
                  ) : (
                    <Image
                      style={{ width: width * 0.17, height: width * 0.17 }}
                      source={require("./../../Images/profile.png")}
                    />
                  )}
                </View>
                <View
                  style={{
                    width: width * 0.5,
                    height: height * 0.1,
                    marginTop: height * 0.02,
                    alignItems: "center"
                  }}
                >
                  <Text style={{ fontSize: 20, color: "#11397a" }}>
                    {this.state.mechanicDetails &&
                      this.state.mechanicDetails.name}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => this.setState({ toggleInfo: false })}
                style={{ width: width * 0.15, height: height * 0.2 }}
              >
                <Image
                  source={require("./../../Images/delete.png")}
                  style={{
                    marginTop: height * 0.035,
                    marginLeft: width * 0.05,
                    width: width * 0.05,
                    height: width * 0.05
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ width: width * 0.9, height: height * 0.22 }}>
              <View
                style={{
                  width: width * 0.9,
                  height: height * 0.05,
                  flexDirection: "row"
                }}
              >
                <View style={{ width: width * 0.35, height: height * 0.05 }}>
                  <Text style={{ color: "#11397a", marginLeft: width * 0.07 }}>
                    Phone no:
                  </Text>
                </View>
                <View
                  style={{
                    width: width * 0.37,
                    height: height * 0.05,
                    marginLeft: width * 0.18
                  }}
                >
                  <Text style={{ color: "#11397a" }}>
                    {this.state.mechanicDetails &&
                      this.state.mechanicDetails.phoneNo}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: width * 0.9,
                  height: height * 0.05,
                  flexDirection: "row"
                }}
              >
                <View style={{ width: width * 0.35, height: height * 0.05 }}>
                  <Text style={{ color: "#11397a", marginLeft: width * 0.07 }}>
                    Distane:
                  </Text>
                </View>
                <View
                  style={{
                    width: width * 0.37,
                    height: height * 0.05,
                    marginLeft: width * 0.18
                  }}
                >
                  <Text style={{ color: "#11397a" }}>
                    {this.state.calDist} Km
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: width * 0.9,
                  height: height * 0.05,
                  flexDirection: "row"
                }}
              >
                <View style={{ width: width * 0.35, height: height * 0.05 }}>
                  <Text style={{ color: "#11397a", marginLeft: width * 0.07 }}>
                    Reaching Time:
                  </Text>
                </View>
                <View
                  style={{
                    width: width * 0.37,
                    height: height * 0.05,
                    marginLeft: width * 0.18
                  }}
                >
                  <Text style={{ color: "#11397a" }}>
                    {this.state.calDistTime}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => this.pushRequest()}
              style={{
                width: width * 0.9,
                height: height * 0.15,
                alignItems: "center"
              }}
            >
              <Image
                source={require("./../../Images/check.png")}
                style={{ width: width * 0.1, height: width * 0.1 }}
              />
              <Text style={{ fontSize: 25, color: "#04931e" }}>Request</Text>
            </TouchableOpacity>
          </Card>
        </Content>
      </View>
    );
  }

  mapView() {
    const GOOGLE_MAPS_APIKEY = "AIzaSyCwjyTFzgxg-wUU5rfcny19N9w7EGlq31M";
    var coordinates = {
      latitude: this.state.latitude,
      longitude: this.state.longitude
    };
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.map}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        >
          {this.state.user.isMechanic
            ? this.state.markers.map(marker => {
                if (this.state.user.id == marker.id) {
                  return (
                    <MapView.Marker
                      coordinate={coordinates}
                      title={marker.name}
                      description={marker.description}
                      image={require("./../../Images/userPointer.png")}
                    />
                  );
                }
              })
            : this.state.markers.map(marker =>
                marker.coordinates ? (
                  marker.id == this.state.user.id ? (
                    <MapView.Marker
                      coordinate={coordinates}
                      title={marker.name}
                      description={marker.description}
                      image={require("./../../Images/userPointer.png")}
                    />
                  ) : (
                    <MapView.Marker
                      coordinate={
                        marker.coordinates.latitude && marker.coordinates
                      }
                      title={marker.name}
                      description={marker.description}
                      image={require("./../../Images/mechanicPointer.png")}
                      onPress={() => this.details(marker)}
                    />
                  )
                ) : null
              )}
        </MapView>
      </View>
    );
  }

  jobMapView() {
    const { jobId, jobStatusId } = this.state;
    const { user } = this.props;
    const GOOGLE_MAPS_APIKEY = "AIzaSyCwjyTFzgxg-wUU5rfcny19N9w7EGlq31M";
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.map}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        >
          <MapViewDirections
            origin={this.state.distOrigin}
            destination={this.state.distDestination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor="#0059b3"
          />
          {this.state.markers.map(marker => {
            console.log(
              marker,
              "ooooooooooooooooopppppppppppppppppppppggggggggggggggggg"
            );
            if (marker.isMechanic) {
              return (
                <MapView.Marker
                  coordinate={marker.coordinates.latitude && marker.coordinates}
                  title={marker.name}
                  description={marker.description}
                  image={require("./../../Images/mechanicPointer.png")}
                />
              );
            } else {
              return (
                <MapView.Marker
                  coordinate={marker.coordinates.latitude && marker.coordinates}
                  title={marker.name}
                  description={marker.description}
                  image={require("./../../Images/userPointer.png")}
                />
              );
            }
          })}
        </MapView>
        {user.isMechanic ? (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("QRScannerScreen", {
                userId: this.state.userId,
                jobStatusId: this.state.jobStatusId,
                jobId: this.state.jobId,
                screen: "QRScannerScreen"
              });
            }}
            style={{
              width: width * 0.7,
              height: height * 0.08,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              backgroundColor: "orange",
              top: height * 0.78,
              left: width * 0.15
            }}
          >
            <Text style={{ fontSize: 17, color: "white" }}>Complete Job</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("QRCodeScreen", {
                jobStatusId: jobStatusId,
                jobId: jobId,
                screen: "QRCodeScreen"
              });
            }}
            style={{
              width: width * 0.7,
              height: height * 0.08,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              backgroundColor: "orange",
              top: height * 0.78,
              left: width * 0.15
            }}
          >
            <Text style={{ fontSize: 17, color: "white" }}>Job Done</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  render() {
    return (
      <View style={{ height: height, width: width }}>
        <View
          style={{
            width: width,
            height: height * 0.08,
            backgroundColor: "#127c7e"
          }}
        >
          <TouchableOpacity
            style={Styles.headerSubContent}
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Image
              source={require("./../../Images/menu.png")}
              style={Styles.menuImg}
            />
          </TouchableOpacity>
        </View>
        <View
          style={
            this.state.toggleInfo || this.state.notifOpen
              ? { height: height * 0.89, width: width, backgroundColor: "red" }
              : { height: height * 0.89, width: width }
          }
        >
          {this.state.locSet ? (
            this.state.jobAccepted ? (
              this.jobMapView()
            ) : (
              this.mapView()
            )
          ) : (
            <View
              style={{
                width: width,
                height: height,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
        </View>

        {this.state.notifOpen
          ? this.setUserView()
          : this.state.toggleInfo
          ? this.mechanicDetailsView()
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};
export default connect(mapStateToProps)(MapScreen);
