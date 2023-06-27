import jwtDecode from "jwt-decode";
import React, { useReducer, createContext } from "react";

const initialState = {
    token: null,
    user: null,
};

const token = localStorage.getItem("token");
if (token && token !== "undefined") {
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
    } else {
        initialState.user = decodedToken;
    }
}

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
                token: null,
            };

        default:
            return state;
    }
};

const AuthContext = createContext();
const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (authResponse) => {
        localStorage.setItem("token", authResponse.token);
        dispatch({
            type: "LOGIN",
            payload: authResponse,
        });
    };

    const logout = () => {
        localStorage.removeItem("token");
        dispatch({
            type: "LOGOUT",
        });
    };

    return (
        <AuthContext.Provider
            value={{ auth: state, login, logout }}
            {...props}
        />
    );
};

export { AuthProvider, AuthContext };
