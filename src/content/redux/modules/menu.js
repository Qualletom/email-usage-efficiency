export const OPEN_MENU = 'OPEN_MENU';
export const CLOSE_MENU = 'CLOSE_MENU';

export const openMenu = () => ({
    type: OPEN_MENU,
    payload: {
        isOpen: true,
    },
});

export const closeMenu = () => ({
    type: CLOSE_MENU,
    payload: {
        isOpen: false,
    },
});

const menuState = {
    isOpen: false,
};

export default (state = menuState, { type, payload }) => {
    switch (type) {
        case OPEN_MENU:
            return {
                ...payload,
            };
        case CLOSE_MENU:
            return {
                ...payload,
            };
        default:
            return state;
    }
};
