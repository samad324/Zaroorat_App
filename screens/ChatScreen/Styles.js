import { width, height } from "../../constants/Layout";

import Colors from '../../constants/Colors';

export const Styles = {
    messageInput: {
        height: "100%",
        borderColor: 'black',
        borderWidth: 1,
        padding: 10
    },
    inputBtn: {
        width: 80,
        backgroundColor: Colors.primary,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    messageContainer: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 10
    },
    messageBoxYour: {
        flex: 0.9,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 100,
        marginTop: 5,
        marginBottom: 5
    },
    messageBoxOther: {
        flex: 0.9,
        flexDirection: "row-reverse",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.secondary,
        padding: 10,
        borderRadius: 100,
        marginTop: 5,
        marginBottom: 5
    },
    message: {
        flex: 1,
        marginLeft: 10,
        color: "white"
    },
    avatar: {
        width: width * 0.15,
        height: width * 0.15,
        borderRadius: (width * 0.15) / 2
    },
};