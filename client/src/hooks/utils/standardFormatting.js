export const getStandardFormattedValue = (value) => {
    if (/^\s/.test(value)) return;
    if (/(,{2,})|(\s{2,})|(-{2,})/.test(value)) return;

    return value;
};
