import { classNames } from "../../utils/classNames";
import styles from "./styles.module.scss";

export const Modal = ({ active, setActive, children }) => {
    return (
        <div
            className={
                active ? classNames(styles.modal, styles.active) : styles.modal
            }
            onClick={() => setActive(false)}
        >
            <div
                className={styles.content}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};
