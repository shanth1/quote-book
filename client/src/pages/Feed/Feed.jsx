import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./styles.module.scss";

export const Feed = () => {
    const context = useContext(AuthContext);
    return <div className={styles.feed}>Feed</div>;
};
