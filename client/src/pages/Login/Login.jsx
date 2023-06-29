import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "../../hooks/formHook";
import { gql, useMutation } from "@apollo/client";

const LOGIN_USER = gql`
    mutation LoginUser($username: String!, $password: String!) {
        loginUser(username: $username, password: $password) {
            user {
                id
                username
            }
            token
        }
    }
`;

export const Login = () => {
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const registerUserCallback = () => {
        loginUser();
    };

    const [onChange, onSubmit, values] = useForm(registerUserCallback, {
        username: "",
        password: "",
    });

    const [loginUser] = useMutation(LOGIN_USER, {
        update(cache, { data: { loginUser: authResponse } }) {
            context.login(authResponse);
            navigate("/collections");
        },
        onError({ graphQLErrors }) {
            context.logout();
            setErrors(graphQLErrors);
        },
        variables: {
            username: values.username,
            password: values.password,
        },
    });

    return (
        <div class="flex flex-col items-center justify-center md:h-full px-6 py-8 mx-auto lg:py-0">
            <Link
                to={"/"}
                className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
                <img
                    className="w-8 h-8 mr-2"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                    alt="Logo"
                />
                Quote it
            </Link>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label
                                for="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Username
                            </label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="username"
                                name="username"
                                id="username"
                                placeholder="Enter your username"
                                required=""
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <label
                                for="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required=""
                                onChange={onChange}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        aria-describedby="remember"
                                        required=""
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        for="remember"
                                        class="text-gray-500 dark:text-gray-300"
                                    >
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <Link
                                to="/restore"
                                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        {errors.map((error) => (
                            <div>{error.message}</div>
                        ))}
                        <button
                            type="submit"
                            onClick={onSubmit}
                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            Sign in
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet?{" "}
                            <Link
                                to="/register"
                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            >
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};
