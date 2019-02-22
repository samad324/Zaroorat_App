import { width, height } from "../../constants/Layout";

export const Styles = {
    mainMessageBox: {
        flexDirection: "row"
    },
    messageBox: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        padding: 10,
        marginTop: 5,
        marginBottom: 5
    },
    message: {
        flex: 1,
        marginLeft: 10,
        fontSize: 18,
        color: "white"
    },
    avatar: {
        width: width * 0.14,
        height: width * 0.14,
        borderRadius: (width * 0.14) / 2
    },
};