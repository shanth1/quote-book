import jwtDecode from "jwt-decode";
import React, { useReducer, createContext } from "react";

const initialState = {
    userId: null,
    username: null,
};

const token = localStorage.getItem("token");
if (token && token !== "undefined") {
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
    } else {
        initialState.userId = decodedToken.id;
        initialState.username = decodedToken.username;
    }
}

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                userId: action.payload.id,
                username: action.payload.username,
            };
        case "LOGOUT":
            return {
                userId: null,
                username: null,
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
            payload: authResponse.user,
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
            value={{
                userId: state.userId,
                username: state.username,
                login,
                logout,
            }}
            {...props}
        />
    );
};

export { AuthProvider, AuthContext };
