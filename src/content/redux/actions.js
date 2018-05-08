export const SET_EMAIL = 'SET_EMAIL';

export const setEmail = (userEmail) => ({
    type: SET_EMAIL,
    payload: {
        currentUserEmail: userEmail,
    },
});