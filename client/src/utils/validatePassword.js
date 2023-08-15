export const validatePassword = (password) => {
    if (!/.{6,20}/.test(password)) return false;
    if (!/([A-ZА-Я]+)/.test(password)) return false;
    if (!/([a-zа-я]+)/.test(password)) return false;
    if (!/([0-9]+)/.test(password)) return false;
    return true;
};
