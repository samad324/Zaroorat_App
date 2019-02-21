import { width, height } from "../constants/Layout";
import Colors from '../constants/Colors';

const GeneralStyles = {
    flexRow: { flexDirection: "row" },
    flex1: { flex: 1 },
    justifyContentCenter: { justifyContent: "center" },
    justifyContentEnd: { justifyContent: "flex-end" },
    alignItemsCenter: { alignItems: "center" },
    alignItemsEnd: { alignItems: "flex-end" },
    primaryBackground: { backgroundColor: Colors.primary },
    secondaryBackground: { backgroundColor: Colors.secondary },
    fontWhite: { color: "white" }
};

export default GeneralStyles;
