const DeleteButton = ({ children, onClick, isActive = true }) => {
    return (
        <button
            autoFocus
            onClick={onClick}
            disabled={!isActive}
            className={
                isActive
                    ? "w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    : "w-full cursor-default text-gray-50 bg-red-200 focus:ring-4 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-200 dark:focus:ring-red-200"
            }
        >
            {children}
        </button>
    );
};

export default DeleteButton;
