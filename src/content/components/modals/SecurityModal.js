import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CloseIcon from './icons/close';
import LockIcon from './icons/lock';

import './scss/SecurityModal.scss';

import { startAuthetnicate } from '../../authenticate';
import { disableAccount } from '../../redux/modules/accounts';

class SecurityModal extends Component {
    close = () => {
        this.props.closeModal();
    };

    activate = (userEmail) => {
        this.close();
        startAuthetnicate(userEmail);
    };

    render() {
        const mainCssClass = 'securityModal';
        const test = this.props.store.getState();
        
        const { session } = this.props.store.getState();

        return (
            <div className={mainCssClass}>
                <div className={`${mainCssClass}__close`} onClick={this.close}>
                    <CloseIcon />
                </div>

                <div>
                    <h2 className={`${mainCssClass}__welcome`}>Welcome to Track your email overload</h2>

                    <p className={`${mainCssClass}__please-click`}>Please click below to securely upgrade your email.</p>
                </div>

                <button className={`${mainCssClass}__btn`} onClick={() => this.activate(session.currentUserEmail)}>
                    Activate Extension
                </button>

                <div>
                    <LockIcon />
                    <span className={`${mainCssClass}__secure-connection`}> Secure connection</span>
                </div>

                <hr className={`${mainCssClass}__separator`}/>

                <div className="dont-upgrade">
                    <span className="dont-upgrade__link" onClick={(e) => {
                        this.close(e);
                    }}>
                        Don't upgrade this account:
                    </span>
                    <span> {session.currentUserEmail}</span>
                </div>
            </div>
        );
    }
};

SecurityModal.propTypes = {
    store: PropTypes.object,
    closeModal: PropTypes.func,
    modalProps: PropTypes.object,
};

export default SecurityModal;
