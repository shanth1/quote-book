export const getStandardFormattedValue = (value) => {
    value = value.trimStart();
    if (!/[A-Za-zА-Яа-я0-9\-()[\]@%.,?!+$#"'\s]/.test(value.at(-1))) return;

    return value;
};
