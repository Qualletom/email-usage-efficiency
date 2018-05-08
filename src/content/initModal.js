import React from 'react';
import ReactDOM from 'react-dom';
import ModalRoot from './components/modals/ModalRoot';

export default (store) => {
    const modalContainer = document.createElement('div');

    modalContainer.className = 'timyo-modal-container';

    document.body.appendChild(modalContainer);

    // TODO: need to wrap with Provider for Redux
    ReactDOM.render(
        <ModalRoot store={store}/>,
        modalContainer
    );
};