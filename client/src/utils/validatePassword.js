export const validatePassword = (password) => {
    if (!/.{6,20}/.test(password)) return false;
    if (!/([0-9]+)/.test(password)) return false;
    return true;
};
