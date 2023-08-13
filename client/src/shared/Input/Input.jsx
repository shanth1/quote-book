const Input = ({
    type = "text",
    name,
    placeholder,
    value,
    onChange,
    autoFocus = false,
    autoSelect = false,
    disabled = false,
}) => {
    const handleFocus = (event) => {
        autoSelect && event.currentTarget.select();
    };
    return (
        <input
            disabled={disabled}
            autoFocus={autoFocus}
            onFocus={handleFocus}
            className=" bg-gray-50 h-10 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-200 focus:outline-none hover:border-gray-400 focus:border-primary-500"
            type={type}
            name={name}
            value={disabled ? "" : value}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};

export default Input;
