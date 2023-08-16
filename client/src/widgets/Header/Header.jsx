import { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../shared/Button/Button";
import { ResponsiveHeader } from "./ResponsiveHeader";

export const Header = () => {
    const { userId, logout } = useContext(AuthContext);
    let navigate = useNavigate();

    return (
        <ResponsiveHeader>
            <Link to="/" className="flex items-center">
                <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="mr-3 h-6 sm:h-9"
                    alt="Logo"
                />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                    Quote it
                </span>
            </Link>
            <div className="w-full flex flex-col gap-2 justify-center items-center lg:flex-row xl:gap-6  ">
                <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                        isActive
                            ? "block text-primary-700"
                            : "block text-gray-700  hover:text-primary-700 "
                    }
                    aria-current="page"
                >
                    Home
                </NavLink>
                {userId && (
                    <NavLink
                        to="collections"
                        className={({ isActive, isPending }) =>
                            isActive
                                ? "block text-primary-700"
                                : "block text-gray-700  hover:text-primary-700 "
                        }
                        aria-current="page"
                    >
                        Collections
                    </NavLink>
                )}
                <NavLink
                    to="feed"
                    className={({ isActive, isPending }) =>
                        isActive
                            ? "block text-primary-700"
                            : "block text-gray-700  hover:text-primary-700 "
                    }
                    aria-current="page"
                >
                    Feed
                </NavLink>
                {userId && (
                    <NavLink
                        to="settings"
                        className={({ isActive, isPending }) =>
                            isActive
                                ? "block text-primary-700"
                                : "block text-gray-700  hover:text-primary-700 "
                        }
                        aria-current="page"
                    >
                        {" "}
                        Settings
                    </NavLink>
                )}
            </div>
            <div className="flex justify-end items-center">
                {userId ? (
                    <div>
                        <Button
                            onClick={() => {
                                logout();
                                navigate("/login");
                            }}
                        >
                            Log out
                        </Button>
                    </div>
                ) : (
                    <div className="w-28 flex flex-col gap-2 items-center lg:flex-row lg:w-48">
                        <NavLink
                            to="login"
                            className="w-full flex justify-center text-gray-700 hover:bg-gray-100 p-2 rounded-lg"
                            aria-current="page"
                        >
                            Log in
                        </NavLink>
                        <Button
                            onClick={() => {
                                navigate("/register");
                            }}
                        >
                            Sign up
                        </Button>
                    </div>
                )}
            </div>
        </ResponsiveHeader>
    );
};
