import { classNames } from "../../utils/classNames";
import styles from "./styles.module.scss";

export const Layout = ({ header, children }) => {
    return (
        <div className="py-3 sm:py-4 lg:py-6">
            <div className={classNames(styles.layout, styles.header)}>
                {header}
            </div>
            <div className={classNames(styles.layout, styles.body)}>
                {children}
            </div>
        </div>
    );
};
