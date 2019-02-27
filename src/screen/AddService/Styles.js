import { Dimensions, Platform } from "react-native";

import { Colors } from "../../constants/index";

const { width, height } = Dimensions.get("window");

export const Styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imagePickerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  fieldsContainer: {
    flex: 2
  },
  imagePicker: {
    backgroundColor: Colors.blue,
    borderWidth: 4,
    borderColor: Colors.blue,
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center"
  },
  pickerImage: {
    width: 160,
    height: 160,
    padding: 10
  },
  imageContainer: {
    borderWidth: 0.1,
    borderColor: Colors.blue,
    borderRadius: 1000
  },
  image: {
    width: 160,
    height: 160,
    borderWidth: 0.1,
    borderColor: Colors.blue,
    borderRadius: 1000
  },
  joinedFields: {
    width: width,
    flexDirection: "row",
    paddingLeft: width * 0.07,
    paddingRight: width * 0.08
  },
  inputSeperator: {
    borderRightWidth: 1,
    borderRightColor: "#99999c",
    height: 26
  },
  inputFieldsWrapper: {
    paddingLeft: width * 0.07,
    paddingRight: width * 0.08,
    marginTop: height * 0.026
  },
  signupBtnContainer: {
    width: width,
    paddingLeft: width * 0.2,
    paddingRight: width * 0.2,
    alignItems: "center"
  },
  signupBtn: {
    width: width * 0.8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: Colors.blue,
    marginHorizontal: 42,
    height: 56
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    alignSelf: "center"
  },
  headerStyle: {
    textAlign: "center",
    flex: 1,
    marginRight: width * 0.2
  },
  section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  middle: {
    flex: 2,
    justifyContent: "flex-start",
    alignSelf: "stretch"
  },
  bottom: {
    flex: 1,
    alignSelf: "stretch",
    paddingBottom: Platform.OS === "android" ? 30 : 0
  }
};
