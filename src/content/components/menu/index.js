// import { disableAccount } from './content/redux/actions';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import TimyoBtnColor from './svg/Timyo-btn-color';
import TimyoBtnGrey from './svg/Timyo-btn-grey';

// import Disable from './components/Disable';
import General from './components/General';

import './styles.scss';

import { openMenu, closeMenu } from './../../redux/modules/menu';

import { connect } from 'react-redux';

const getDisableMenu = (isRemove) => isRemove ? Remove : Disable;

class Menu extends Component {
    constructor(props) {
        super(props);

        const root = document.querySelector('.timyo-extension');
        if (root) {
            root.addEventListener('mousedown', this.handleOutsideClick, false);
        }
    }

    componentWillUnmount() {
        const root = document.querySelector('.timyo-extension');
        if (root) {
            root.removeEventListener('mousedown', this.handleOutsideClick, false);
        }
    }

    handleClick = () => {
        const { dispatch } = this.props;
        const newIsOpen = !this.props.isOpen;

        if (newIsOpen) {
            dispatch(openMenu());
        } else {
            dispatch(closeMenu());
        }
    }

    handleOutsideClick = (e) => {
        if (this.node.contains(e.target) || !this.props.isOpen) {
            return;
        }
        this.props.dispatch(closeMenu());
    }

    render() {
        const {
            // isEnableMenu,
            isOpen,
            dispatch,
            // email,
            // pendingRemoval,
            // helpCenterURL,
        } = this.props;

        // const BtnIcon = isEnableMenu ? TimyoBtnColor : TimyoBtnGrey;

        // const MenuItems = isEnableMenu ? General : getDisableMenu(pendingRemoval);

        return (
            <div ref={node => { this.node = node; }}>
                <div className="trackOvld-toolbar-icon" onClick={this.handleClick}>
                    <TimyoBtnColor className="trackOvld-toolbar-icon-img"/>
                    { isOpen}
                </div>

                {
                    isOpen &&
                    <General
                        // email={email}
                        dispatch={dispatch}
                        action={this.handleClick}
                        // disableTimyo={this.disableTimyo}
                    />
                }
            </div>
        );
    }

    // disableTimyo = () => {
    //     const { dispatch, email, timyoUUID } = this.props;

    //     dispatch({
    //         type: 'MENU_LOG_OUT',
    //         payload: {
    //             timyoUUID,
    //         },
    //         meta: {
    //             request: {
    //                 type: 'timyo_api_call',
    //                 method: 'delete',
    //                 payload: {},
    //                 url: this.props.baseURL + '/api/v3/device',
    //                 success: {
    //                     type: 'timyo_log_out',
    //                 },
    //                 error: {
    //                     type: 'timyo_log_out_error',
    //                     payload: {},
    //                     analytics: {
    //                         event: {
    //                             name: 'MENU_LOG_OUT_ERROR',
    //                         },
    //                     },
    //                 },
    //             },
    //         },
    //     });

    //     dispatch(disableAccount(email));

    //     location.reload();
    // }
}

Menu.propTypes = {
    // pendingRemoval: PropTypes.bool,
    // isEnableMenu: PropTypes.bool,
    isOpen: PropTypes.bool,
    dispatch: PropTypes.func,
    store: PropTypes.object,
    // email: PropTypes.string,
};

const mapStateToProps = (state) => {
    const {
        // session: { currentUserEmail: email },
        // timyoAccounts,
        menu: { isOpen },
        // newSession: { localeLang },
    } = state;
    // const { isEnable, timyoUUID, pendingRemoval } = timyoAccounts[email];
    // const isEnableMenu = Boolean(isEnable);

    return {
        // isEnableMenu,
        isOpen,
        // email,
        // pendingRemoval,
    };
};

export default connect(mapStateToProps)(Menu);
