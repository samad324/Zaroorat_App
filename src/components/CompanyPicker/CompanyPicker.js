import React, { Component } from "react";
import { Content, Icon, Picker, Form } from "native-base";
import { Colors } from "../../constants";
import { Dimensions } from "react-native";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("window");

class PickerWithIconStyle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      categories: []
    };
  }

  componentDidMount() {
    console.log(this.props);
    const { categories } = this.props;
    this.setState({ categories });
  }

  onValueChange = value => {
    const { onChange } = this.props;
    onChange(value);
    this.setState({
      selected: value
    });
  };

  render() {
    const { categories } = this.state;
    return (
      <Content>
        <Form>
          <Picker
            mode="dropdown"
            iosHeader="Select your SIM"
            placeholderStyle={{ color: "#99999c" }}
            placeholderIconColor={{ color: "#99999c" }}
            iosIcon={
              <Icon
                name="arrow-dropdown-circle"
                style={{ color: Colors.blue, fontSize: 25 }}
              />
            }
            style={{ width: undefined }}
            selectedValue={this.state.selected}
            onValueChange={this.onValueChange.bind(this)}
          >
            <Picker.Item label="Select a category" value="" />
            {categories.map(item => (
              <Picker.Item
                label={item.name}
                value={item.name}
                key={item.name}
              />
            ))}
          </Picker>
        </Form>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.generalReducer.categories
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PickerWithIconStyle);
