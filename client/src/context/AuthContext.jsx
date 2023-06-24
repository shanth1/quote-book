import jwtDecode from "jwt-decode";
import React, { useReducer, createContext } from "react";

const initialState = {
    user: null,
};

if (localStorage.getItem("token")) {
    const decodedToken = jwtDecode(localStorage.getItem("token"));

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
    } else {
        initialState.user = decodedToken;
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {},
});

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
            };

        default:
            return state;
    }
};

const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (userDate) => {
        localStorage.setItem("token", userDate.token);
        dispatch({
            type: "LOGIN",
            payload: userDate,
        });
    };

    const logout = (userDate) => {
        localStorage.removeItem("token");
        dispatch({
            type: "LOGOUT",
        });
    };

    return (
        <AuthContext.Provider
            value={{ user: state, login, logout }}
            {...props}
        />
    );
};

export { AuthProvider };
