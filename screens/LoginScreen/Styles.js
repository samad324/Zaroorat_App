import { width, height } from "../../constants/Layout";

export const Styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  fbBtn: {
    backgroundColor: "#3B5998",
    width: width * 0.7,
    height: height * 0.06,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
    borderRadius: 6,
    borderWidth: 3
  },
  fbBtnTxt: {
    color: "#fff",
    fontSize: width * 0.04
  },
  fbBtnTxt2: {
    color: "#fff",
    fontSize: width * 0.03,
    marginTop: width * 0.008
  }
};
