export const getStringFromDate = (date) => {
    const localeDate = date.toLocaleDateString();
    return String.prototype.concat(
        date.toLocaleTimeString().slice(0, 5),
        " ",
        localeDate.slice(0, -4),
        localeDate.slice(-2),
    );
};
