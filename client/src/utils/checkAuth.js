export const getUserId = (context) => {
    return context.auth.user?.id;
};
