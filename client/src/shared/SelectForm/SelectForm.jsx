import styles from "./styles.module.scss";
import { classNames } from "../../utils/classNames";

const SelectFrom = ({ names, selected, setSelected }) => {
    return (
        <div className="flex gap-2">
            {names.map((name) => {
                const isActive = name === selected;
                return (
                    <div
                        onClick={() => {
                            setSelected(name);
                        }}
                        className={
                            isActive
                                ? classNames(styles.button, styles.active)
                                : styles.button
                        }
                    >
                        {name}
                    </div>
                );
                // <div className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" ></div>
            })}
        </div>
    );
};

export default SelectFrom;
