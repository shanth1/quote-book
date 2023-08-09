const Label = ({ children, isActive = true }) => {
    return (
        <label
            className={`block mb-2 text-sm font-medium ${
                isActive ? "text-gray-900" : "text-gray-400"
            } dark:text-white`}
        >
            {children}
        </label>
    );
};

export default Label;
