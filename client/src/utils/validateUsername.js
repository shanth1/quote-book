export const validateUsername = (username) => {
    if (username.length < 3 || username.length > 12) return false;
    const reg = /^([a-z])+([.-_]?[a-z0-9@_$!]{0,10})$/;
    return reg.test(username);
};
