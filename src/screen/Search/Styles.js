import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const Styles = {
  container: {
    flex: 1,
    paddingBottom: height * 0.01
  },
  searchContainer: {
    height: height * 0.094,
    justifyContent: "center",
    alignItems: "center"
  },
  searchInput: {
    width: width * 0.94
  },
  resultsContainer: {
    width: width,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  resultWrapper: {
    marginTop: height * 0.01
  },
  resultImage: {
    width: width * 0.32,
    height: height * 0.16
  }
};
