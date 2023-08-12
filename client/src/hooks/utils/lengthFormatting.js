export const checkValidLength = (value, maximumLength, isRemove) => {
    return value.length > maximumLength && !isRemove;
};
