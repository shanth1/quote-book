const Required = ({ children }) => {
    return <p className="after:content-['*'] after:text-red-500">{children}</p>;
};

export default Required;
