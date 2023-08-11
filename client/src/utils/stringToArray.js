export const getArrayFromString = (string) => {
    const array = string.split(", ");
    if (!string) return [];
    if (array.at(-1) === "" && array.length > 1) {
        return array.slice(0, -1);
    } else {
        return array;
    }
};
