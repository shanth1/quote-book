// import { classNames } from "../../utils/classNames";
import { classNames } from "../../utils/classNames";
import { Blackout } from "./components/Blackout";
import styles from "./styles.module.scss";

export const BurgerMenu = ({ active = true, setActive, children }) => {
    return (
        <div>
            {active && <Blackout active={active} setActive={setActive} />}
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    setActive(!active);
                }}
                className={classNames(styles.menu, "group")}
            >
                <div
                    className={classNames(
                        styles.line,
                        "top-0 w-full",
                        active
                            ? "rotate-45 w-full top-1/2 translate-y-[-2px] scale-110"
                            : "",
                    )}
                ></div>
                <div
                    className={classNames(
                        styles.line,
                        "top-1/2 translate-y-[-50%]",
                        active ? "w-0" : "w-full",
                    )}
                ></div>
                <div
                    className={classNames(
                        styles.line,
                        "bottom-0 w-full",
                        active
                            ? "rotate-[-45deg] w-full top-1/2 translate-y-[-2px] scale-110"
                            : "",
                    )}
                ></div>
            </div>
            {active && (
                <div
                    onClick={() => {
                        setActive(false);
                    }}
                    className={styles.content}
                >
                    {children}
                </div>
            )}
        </div>
    );
};
