import { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../shared/Button/Button";
import { ResponsiveHeader } from "./components/ResponsiveHeader";
import { Logo } from "../../shared/Logo/Logo";

export const Header = () => {
    const { userId, username, logout } = useContext(AuthContext);
    let navigate = useNavigate();

    return (
        <ResponsiveHeader>
            <Link to="/" className="flex items-center">
                <Logo />
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
                {!userId && (
                    <NavLink
                        to="playground"
                        className={({ isActive, isPending }) =>
                            isActive
                                ? "block text-primary-700"
                                : "block text-gray-700  hover:text-primary-700 "
                        }
                        aria-current="page"
                    >
                        Playground
                    </NavLink>
                )}
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
                    to="/about"
                    className={({ isActive, isPending }) =>
                        isActive
                            ? "block text-primary-700"
                            : "block text-gray-700  hover:text-primary-700 "
                    }
                    aria-current="page"
                >
                    About
                </NavLink>
            </div>
            <div className="flex justify-end items-center">
                {userId ? (
                    <div className="w-28 flex flex-col gap-2 items-center lg:flex-row lg:w-48">
                        <div className="w-full flex justify-center font-semibold">
                            {username}
                        </div>
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
