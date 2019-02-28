import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { Button, Icon, Fab } from "native-base";

import { Styles } from "./Styles";
import { getAllCategories } from "../../config/firebase";
import { Colors } from "../../constants/index";

import { setCategories } from "../../store/actions/generalActions";

const { width, height } = Dimensions.get("window");

export class componentName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      isLoading: true,
      fabActive: false
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount = async () => {
    const { setCategories } = this.props;
    const categories = await getAllCategories();
    await setCategories(categories);
    this.setState({ categories, isLoading: false });
  };

  navigate = (route, prop) => {
    const { navigate } = this.props.navigation;
    return navigate(route, prop);
  };

  render() {
    const { categories, isLoading, fabActive } = this.state;
    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={Styles.container}>
        {isLoading ? (
          <View style={Styles.loaderStyles}>
            <ActivityIndicator size="large" color={Colors.primaryLight} />
          </View>
        ) : (
          categories.map((category, index) => {
            return (
              <View style={Styles.tile} key={category.name}>
                <TouchableOpacity
                  onPress={() =>
                    this.navigate("ViewCategory", { category: category.name })
                  }
                >
                  <Image
                    resizeMode={"contain"}
                    source={{ uri: category.thumbnail }}
                    style={Styles.tileImg}
                  />
                  <Text style={Styles.text}>{category.name}</Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}

        <Fab
          active={fabActive}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: Colors.blue }}
          position="bottomRight"
          onPress={() => this.setState({ fabActive: !fabActive })}
        >
          <Icon name="ios-arrow-up" />
          <TouchableOpacity
            style={{ backgroundColor: Colors.blue }}
            onPress={() => this.navigate("AddService", {})}
          >
            <Icon name="ios-add" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: Colors.blue }}
            onPress={() => this.navigate("Maps", { type: "nearby" })}
          >
            <Icon name="map" />
          </TouchableOpacity>
        </Fab>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    setCategories: payload => dispatch(setCategories(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(componentName);
