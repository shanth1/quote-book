export const Tooltip = ({ message, children }) => {
    return (
        <div className="group/tooltip relative flex cursor-help">
            {children}
            <div className="absolute whitespace-pre top-3 left-2 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover/tooltip:scale-100">
                {message}
            </div>
        </div>
    );
};
