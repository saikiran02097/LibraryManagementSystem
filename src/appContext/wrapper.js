import { createContext, useReducer } from "react";
import { reducer } from "./reducer";

const intialState = {
    isAuth: false,
    userData: {},
    snackData: {
        showSnack: false,
        message: "",
        mode: "success",
        autoHide: 6000
    }
}

export const Context = createContext(intialState);

export function ContextWrapper({ children }) {
    const [state, dispatch] = useReducer(reducer, intialState);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}            
        </Context.Provider>
    )
}