import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "../../hooks/formHook";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../graphql/mutation";
import Label from "../../shared/Label/Label";
import Input from "../../shared/Input/Input";
import Button from "../../shared/Button/Button";
import H1 from "../../shared/H1/H1";
import Content from "../../shared/Content/Content";
import { validateEmail } from "../../utils/validateEmail";
import { validateUsername } from "../../utils/validateUsername";
import { validatePassword } from "../../utils/validatePassword";
import Required from "../../shared/Required/Required";

const getPasswordStatusColor = (password) => {
    if (validatePassword(password)) {
        if (
            /[!@#$%^&*()<>?]+/.test(password) &&
            /.{8,}/.test(password) &&
            /([A-ZА-Я]+)/.test(password)
        ) {
            return "bg-green-500";
        }
        return "bg-yellow-500";
    }
    return "bg-red-500";
};

export const Register = () => {
    const [errors, setErrors] = useState([]);
    const context = useContext(AuthContext);
    let navigate = useNavigate();

    const registerUserCallback = () => {
        registerUser();
    };

    const [onChange, onSubmit, values] = useForm(registerUserCallback, {
        firstName: "",
        email: "",
        username: "",
        password: "",
    });

    const [registerUser] = useMutation(REGISTER_USER, {
        update(cache, { data: { registerUser: authResponse } }) {
            context.login(authResponse);
            navigate("/");
        },
        onError({ graphQLErrors }) {
            console.log("REGISTER GRAPHQL ERRORS", graphQLErrors);
            setErrors(graphQLErrors);
        },
        variables: {
            user: {
                firstName: values.firstName,
                email: values.email,
                username: values.username,
                password: values.password,
            },
        },
    });

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
            <Link
                to={"/"}
                className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
                <H1>Quote it</H1>
            </Link>
            <form className="w-full p-4 md:p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md  dark:bg-gray-800 dark:border-gray-700">
                <Content>
                    <H1>Create an account</H1>
                    <div>
                        <Label
                            statusColor={
                                values.firstName
                                    ? "bg-green-500"
                                    : "bg-yellow-500"
                            }
                        >
                            Your name
                        </Label>
                        <Input
                            placeholder="name"
                            name="firstName"
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <Label
                            statusColor={
                                validateUsername(values.username)
                                    ? "bg-green-500"
                                    : "bg-red-500"
                            }
                            tooltipMessage={
                                "At list 3 characters\nStarting with a letter"
                            }
                        >
                            <Required>Your username</Required>
                        </Label>
                        <Input
                            placeholder="username"
                            name="username"
                            value={values.username}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <Label
                            statusColor={
                                validateEmail(values.email)
                                    ? "bg-green-500"
                                    : "bg-red-500"
                            }
                            tooltipMessage={"Valid email"}
                        >
                            <Required>Your email</Required>
                        </Label>
                        <Input
                            placeholder="email"
                            name="email"
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <Label
                            statusColor={getPasswordStatusColor(
                                values.password,
                            )}
                            tooltipMessage={
                                "At least:\n6 characters\nOne letter\nOne number\n\nBetter:\n8 characters\nOne uppercase\nOne special symbol"
                            }
                        >
                            <Required>Password</Required>
                        </Label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            name="password"
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <Label
                            statusColor={
                                values.password === values.confirmPassword
                                    ? "bg-green-500"
                                    : "bg-red-500"
                            }
                        >
                            <Required>Confirm password</Required>
                        </Label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            name="confirmPassword"
                            onChange={onChange}
                        />
                    </div>
                    {errors.map((error) => (
                        <div>{error.message}</div>
                    ))}
                    <Button
                        onClick={onSubmit}
                        isActive={
                            validateEmail(values.email) &&
                            validateUsername(values.username) &&
                            validatePassword(values.password) &&
                            values.password === values.confirmPassword
                        }
                    >
                        Create an account
                    </Button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                            Login here
                        </Link>
                    </p>
                </Content>
            </form>
        </div>
    );
};
