import jwtDecode from "jwt-decode";
import React, { useReducer, createContext } from "react";

const initialState = {
    userId: null,
};

const token = localStorage.getItem("token");
if (token && token !== "undefined") {
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
    } else {
        initialState.userId = decodedToken.id;
    }
}

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                userId: action.payload,
            };
        case "LOGOUT":
            return {
                userId: null,
            };

        default:
            return state;
    }
};

const AuthContext = createContext();
const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (authResponse) => {
        console.log(authResponse.token);
        console.log(authResponse.user.id);
        localStorage.setItem("token", authResponse.token);
        dispatch({
            type: "LOGIN",
            payload: authResponse.user.id,
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
            value={{ userId: state.userId, login, logout }}
            {...props}
        />
    );
};

export { AuthProvider, AuthContext };
