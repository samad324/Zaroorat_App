import { Constants } from "expo";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const Styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight
  },
  textInput: {
    width: "90%",
    height: 60,
    fontSize: 20,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 7,
    paddingLeft: 5,
    marginTop: 10
  },
  headers: {
    width: "100%",
    height: height * 0.1,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    color: "#fff",
    fontSize: 22
  },
  forms: {
    width: "100%",
    height: height * 0.85,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFF"
  },
  comboBox: {
    width: "90%",
    height: 60,
    marginTop : 10
  },
  textInputDes: {
    width: "90%",
    height: 100,
    fontSize: 20,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 7,
    paddingLeft: 5,
    marginTop: 10,
    textAlignVertical: 'top'
  },
  btnBrowseImage: {
      width : "90%",
      height : 40,
      backgroundColor : '#5900FF',
      justifyContent : 'center',
      alignItems : 'center',
      marginTop : 10,
      borderRadius: 7,
  },
  txtBrowseImage: {
      color : "#FFF",
      fontSize : 15
  },
  btnAddService: {
      width : "30%",
      height : 50,
      backgroundColor : "grey",
      justifyContent : "center",
      alignItems : "center",
      marginTop : 10,
      borderRadius : 7
  },
  txtAddService: {
      color : "#fff",
      fontSize : 18,
      fontWeight : "bold"
  }
};
