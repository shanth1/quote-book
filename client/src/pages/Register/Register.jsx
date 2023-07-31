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
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
            <form class="w-full p-4 md:p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md  dark:bg-gray-800 dark:border-gray-700">
                <Content>
                    <H1>Create an account</H1>
                    <div>
                        <Label>Your name</Label>
                        <Input
                            placeholder="name"
                            name="firstName"
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <Label>Your username</Label>
                        <Input
                            placeholder="username"
                            name="username"
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <Label>Your email</Label>
                        <Input
                            placeholder="email"
                            name="email"
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            name="password"
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <Label>Confirm password</Label>
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
                    {/* <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input
                                    id="terms"
                                    aria-describedby="terms"
                                    type="checkbox"
                                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                    required=""
                                />
                            </div>
                            <div class="ml-3 text-sm">
                                <label
                                    for="terms"
                                    class="font-light text-gray-500 dark:text-gray-300"
                                >
                                    I accept the{" "}
                                    <a
                                        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                        href="#"
                                    >
                                        Terms and Conditions
                                    </a>
                                </label>
                            </div>
                        </div> */}
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
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                            Login here
                        </Link>
                    </p>
                </Content>
            </form>
        </div>
    );
};
