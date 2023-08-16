import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "../../hooks/formHook";
import { useMutation } from "@apollo/client";
import Button from "../../shared/Button/Button";
import Input from "../../shared/Input/Input";
import { LOGIN_USER } from "../../graphql/mutation";
import H1 from "../../shared/H1/H1";
import Label from "../../shared/Label/Label";
import Content from "../../shared/Content/Content";

export const Login = () => {
    const { login, logout } = useContext(AuthContext);
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
            login(authResponse);
            navigate("/collections");
        },
        onError({ graphQLErrors }) {
            logout();
            setErrors(graphQLErrors);
        },
        variables: {
            username: values.username,
            password: values.password,
        },
    });

    return (
        <div className="flex flex-col items-center justify-center md:h-full">
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
            <form className="w-full bg-white p-4 md:p-6 rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
                <Content>
                    <H1>Sign in to your account</H1>
                    <div>
                        <Label>Username</Label>
                        <Input
                            name="username"
                            placeholder="Enter your username"
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={onChange}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <Input type="checkbox" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label className="text-gray-500 dark:text-gray-300">
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
                    <Button
                        isActive={values.username && values.password}
                        onClick={onSubmit}
                    >
                        Sign in
                    </Button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet?{" "}
                        <Link
                            to="/register"
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                            Sign up
                        </Link>
                    </p>
                </Content>
            </form>
        </div>
    );
};
