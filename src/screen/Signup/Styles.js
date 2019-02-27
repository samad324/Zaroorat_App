import { Dimensions } from "react-native";

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
    backgroundColor: "#2abf88",
    width: 160,
    height: 160,
    borderWidth: 4,
    borderColor: "#2abf88",
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center"
  },
  pickerImage: {
    width: 100,
    height: 100
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
    backgroundColor: "#2abf88",
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
  }
};
