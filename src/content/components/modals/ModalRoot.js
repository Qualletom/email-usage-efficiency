import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    closeModal,
} from '../../redux/modules/modal';

import './scss/modals.scss';

import SecurityModal from './SecurityModal';
// import SettingsModal from './SettingsModal';

import { modalTypesList } from './modalTypesList';

const MODALS = {
    [modalTypesList.SECURITY]: {
        component: SecurityModal,
        classes: {
            base: 'warning-popover_body',
            afterOpen: 'warning-popover_body_after-open',
            beforeClose: 'warning-popover_body_before-close',
        },
    },
    // [modalTypesList.SETTINGS]: {
    //     component: SettingsModal,
    //     classes: {
    //         base: 'warning-popover_body',
    //         afterOpen: 'warning-popover_body_after-open',
    //         beforeClose: 'warning-popover_body_before-close',
    //     },
    // },
    /* other modals */
};

class ModalRoot extends Component {
    closeModal = () => {
        const { store, modalType } = this.props;

        store.dispatch(closeModal(modalType));
    };

    render() {
        const { modalType, modalProps, isOpen, store } = this.props;

        const {
            component: SpecificModal,
            classes: modalClasses,
        } = MODALS[modalType] || {};

        return !modalType ? <span /> : (
            <Modal
                isOpen={isOpen}
                onRequestClose={this.closeModal}
                appElement={document.querySelector('body')}
                className={modalClasses}
                overlayClassName={{
                    base: 'warning-popover',
                    afterOpen: 'warning-popover_after-open',
                    beforeClose: 'warning-popover_before-close',
                }}
            >
                <SpecificModal
                    modalProps={modalProps}
                    store={store}
                    closeModal={this.closeModal}
                    modalType={modalType}
                />
            </Modal>
        );
    };
};

ModalRoot.propTypes = {
    modalType: PropTypes.string,
    modalProps: PropTypes.object,
    isOpen: PropTypes.bool,
    store: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        modalType: state.modal.modalType,
        modalProps: state.modal.modalProps,
        isOpen: state.modal.isOpen,
    };
}

export default connect(mapStateToProps)(ModalRoot);
