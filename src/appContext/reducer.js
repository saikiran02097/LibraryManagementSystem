const userData = {
    id: 123,
    firstName: "JOHN",
    middleName: null,
    lastName: "SMITH",
    role: "STUDENT",
    email: "JOHNSMITH@GMAIL.COM",
    phoneNumber: "9848022338",
    password: "John@2338",
    isActive: "Y",
    lastUpdatedDate: "29-07-2022",
    message: null,
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "loginSuccess":
            return {
                ...state,
                isAuth: true,
                userData: {
                    ...userData
                }
            };
        case "logOut":
            return {
                ...state,
                isAuth: false,
                userData: {},
                snackData: {
                    showSnack: true,
                    message: "Successfully Logged Out",
                    mode: "success",
                    autoHide: 5000
                }
            };
        case "showSnack":
            return {
                ...state,
                snackData: {
                    showSnack: true,
                    message: action.message,
                    mode: action.mode,
                    autoHide: action.autoHide
                }
            };
        case "hideSnack":
            return {
                ...state,
                snackData: {
                    showSnack: false,
                    message: "",
                    mode: "success",
                    autoHide: 6000
                }
            };
        default: return state
    }
}