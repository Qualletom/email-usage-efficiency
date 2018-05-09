export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export function openModal(type, props = {}) {
    return {
        type: OPEN_MODAL,
        payload: {
            modalType: type,
            modalProps: {
                ...props,
            },
            isOpen: true,
        }
    };
}

export function closeModal(type) {
    return {
        type: CLOSE_MODAL,
        payload: {
            modalType: type,
            isOpen: false,
        }
    };
}

export const modalState = {
    modalType: null,
    modalProps: {},
};

export default(state = modalState, action) => {
    switch (action.type) {
        case OPEN_MODAL:
        case CLOSE_MODAL:
            return {
                ...action.payload,
            };
        default:
            return state;
    }
}