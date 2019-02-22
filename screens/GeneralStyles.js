import { width, height } from "../constants/Layout";
import Colors from '../constants/Colors';

const GeneralStyles = {
    flexRow: { flexDirection: "row" },
    flex1: { flex: 1 },
    justifyContentCenter: { justifyContent: "center" },
    justifyContentEnd: { justifyContent: "flex-end" },
    perfectlyCentered: { justifyContent: "center", alignItems: "center" },
    alignItemsCenter: { alignItems: "center" },
    alignItemsEnd: { alignItems: "flex-end" },
    primaryBackground: { backgroundColor: Colors.primary },
    secondaryBackground: { backgroundColor: Colors.secondary },
    fontWhite: { color: "white" },
    fontCenter: { textAlign: "center" },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF"
    },
    buttonContainerFull: {
        marginTop: 10,
        height: 45,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: width * 0.8,
        borderRadius: 30,
        backgroundColor: "#00BFFF"
    }
};

export default GeneralStyles;
