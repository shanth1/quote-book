export const validateUsername = (username) => {
    const reg = /^([a-z])+([a-z0-9])$/;
    return reg.test(username);
};
