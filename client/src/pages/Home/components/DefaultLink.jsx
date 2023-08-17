export const DefaultLink = ({ children, href }) => {
    return (
        <a href={href} rel="noreferrer" target="_blank">
            {children}
        </a>
    );
};
