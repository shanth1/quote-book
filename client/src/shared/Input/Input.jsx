const Input = ({
    type = "text",
    name,
    placeholder,
    value,
    onChange,
    autoFocus = false,
    disabled = false,
}) => {
    return (
        <input
            disabled={disabled}
            autoFocus={autoFocus}
            className=" bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};

export default Input;
