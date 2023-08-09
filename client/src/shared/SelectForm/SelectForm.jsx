import styles from "./styles.module.scss";
import { classNames } from "../../utils/classNames";

const SelectFrom = ({ names, selected, setSelected }) => {
    return (
        <div className="flex gap-2 w-full">
            {names.map((name) => {
                const isActive = name === selected;
                return (
                    <div
                        key={Math.random()}
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
            })}
        </div>
    );
};

export default SelectFrom;
