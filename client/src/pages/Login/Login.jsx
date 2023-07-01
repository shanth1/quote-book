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
                    <H1 text="Sign in to your account" />
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <Label text="Username" />
                            <Input
                                name="username"
                                placeholder="Enter your username"
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <Label text="Password" />
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
                        <Button text="Sign in" onClick={onSubmit} />
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
