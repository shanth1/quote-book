// import styles from "./styles.module.scss";
import { useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { Modal } from "../../shared/Modal/Modal";
import { AddBox } from "../../features/AddBox/AddBox";

import { FiPlusCircle, FiPackage, FiFileText } from "react-icons/fi";
import { AddQuote } from "../../features/AddQuote/AddQuote";

export const TabBar = () => {
    const [addBoxModalActive, setAddBoxModalActive] = useState(false);
    const [addQuoteModalActive, setAddQuoteModalActive] = useState(false);
    const location = useLocation();

    const { boxId } = useParams();

    return (
        <div className="flex justify-center">
            <div className="fixed w-56 shadow-md transition-all justify-evenly flex items-center bottom-10 gap-4 bg-white rounded-lg p-1">
                <NavLink to="boxes">
                    {({ isActive }) => (
                        <div
                            className={
                                isActive
                                    ? "p-1 rounded-full bg-primary-500 hover:bg-primary-600 hover:scale-90 transition-all"
                                    : "transition-all hover:scale-90"
                            }
                        >
                            <div>
                                <FiPackage
                                    size="30px"
                                    color={isActive ? "white" : "black"}
                                />
                            </div>
                        </div>
                    )}
                </NavLink>
                {location.pathname === "/collections/boxes" && (
                    <div className="flex justify-center">
                        <div
                            onClick={() => setAddBoxModalActive(true)}
                            className="flex w-14 h-14 transition-all hover:scale-110 shadow-lg hover:bg-gray-50 justify-center bg-white items-center cursor-pointer rounded-full absolute top-[-22px] "
                        >
                            <FiPlusCircle color="black" size="40px" />
                        </div>
                    </div>
                )}
                {location.pathname.includes("/collections/box/") && (
                    <div className="flex justify-center">
                        <div
                            onClick={() => setAddQuoteModalActive(true)}
                            className="flex w-14 h-14 transition-all hover:scale-110 shadow-lg hover:bg-gray-50 justify-center bg-white items-center cursor-pointer rounded-full absolute top-[-22px] "
                        >
                            <FiPlusCircle color="black" size="40px" />
                        </div>
                    </div>
                )}

                <NavLink to="quotes">
                    {({ isActive }) => (
                        <div
                            className={
                                isActive
                                    ? "p-1 rounded-full bg-primary-500 hover:bg-primary-600  hover:scale-90 transition-all"
                                    : "transition-all hover:scale-90"
                            }
                        >
                            <div>
                                <FiFileText
                                    size="30px"
                                    color={isActive ? "white" : "black"}
                                />
                            </div>
                        </div>
                    )}
                </NavLink>
            </div>

            {addBoxModalActive && (
                <Modal
                    active={addBoxModalActive}
                    setActive={setAddBoxModalActive}
                >
                    <AddBox closeCallback={() => setAddBoxModalActive(false)} />
                </Modal>
            )}

            {addQuoteModalActive && (
                <Modal
                    active={addQuoteModalActive}
                    setActive={setAddQuoteModalActive}
                >
                    <AddQuote
                        closeCallback={() => setAddQuoteModalActive(false)}
                        boxId={boxId}
                    />
                </Modal>
            )}
        </div>
    );
};
