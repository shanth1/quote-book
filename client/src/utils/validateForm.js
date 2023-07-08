export const validateForm = (requiredFields = [], email, password) => {
    let isValid = true;

    for (let index = 0; index < requiredFields.length; index++) {
        const element = requiredFields[index];
        if (!element) return false;
    }

    return isValid;
};
