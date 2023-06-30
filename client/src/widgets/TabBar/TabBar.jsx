// import styles from "./styles.module.scss";
import { useState } from "react";
import { IoAddCircle, IoFileTrayStacked, IoAlbums } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import { Modal } from "../../shared/Modal/Modal";
import { AddItem } from "../AddItem/AddItem";

export const TabBar = () => {
    const [addModalActive, setAddModalActive] = useState(false);

    const location = useLocation();

    return (
        <div className="flex justify-center">
            <div className="fixed flex justify-center items-center bottom-10 w-56 h-8  bg-primary-300 rounded-lg px-8 py-5">
                <div className="flex justify-between w-[100%]">
                    <NavLink to="boxes">
                        {({ isActive }) => (
                            <div>
                                <IoAlbums
                                    size="30px"
                                    color={isActive ? "blue" : "white"}
                                />
                            </div>
                        )}
                    </NavLink>
                    <NavLink to="quotes">
                        {({ isActive }) => (
                            <div>
                                <IoFileTrayStacked
                                    size="30px"
                                    color={isActive ? "blue" : "white"}
                                />
                            </div>
                        )}
                    </NavLink>
                </div>
                <div
                    onClick={() => setAddModalActive(true)}
                    className="flex justify-center items-center cursor-pointer w-12 h-12 rounded-[50%] absolute top-[-50%] bg-primary-500"
                >
                    <IoAddCircle
                        color="white"
                        size="100%"
                        style={{ transform: "scale(1)" }}
                    />
                </div>
            </div>

            {addModalActive && (
                <Modal active={addModalActive} setActive={setAddModalActive}>
                    <AddItem
                        path={location.pathname}
                        closeCallback={() => setAddModalActive(false)}
                    />
                </Modal>
            )}
        </div>
    );
};
