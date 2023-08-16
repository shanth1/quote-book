const Button = ({ children, onClick, isActive = true }) => {
    return (
        <button
            onClick={onClick}
            disabled={!isActive}
            className={
                isActive
                    ? "w-full text-white bg-primary-600 hover:bg-primary-700 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    : "w-full cursor-default text-gray-50 bg-primary-200  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-200 dark:focus:ring-primary-200"
            }
        >
            {children}
        </button>
    );
};

export default Button;
