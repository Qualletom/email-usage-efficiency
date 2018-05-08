import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../svg/power-off-icon';

import { openModal } from '../../../redux/modules/modal';
import { modalTypesList } from '../../modals/modalTypesList';

class General extends Component {
  openSettings = () => {
      this.props.dispatch(openModal(modalTypesList.SETTINGS));
  };

  openSecurity = () => {
    this.props.dispatch(openModal(modalTypesList.SECURITY));
};

  render() {
    //   const { props: { email } } = this;

      return (
          <ul className="trackOvld-menu general" onClick={this.props.action}>
              {/* <li className="trackOvld-menu-item" onClick={this.startTutorial}>
                  {i18n.t('Start tutorial')}
              </li> */}
              <li className="trackOvld-menu-item" onClick={this.openSecurity}>
                  TIPS OF THE DAY
              </li>
              <li className="trackOvld-menu-item" onClick={this.openSettings}>
                  Settings
              </li>
              {/* <li className="trackOvld-menu-item" onClick={this.toHelpCenter}>
                  {i18n.t('Help Center')}
              </li>
              <li className="trackOvld-menu-item" onClick={this.contactUs}>
                  {i18n.t('Contact Us')}
              </li> */}
              {/* <li className="trackOvld-footer-item" onClick={this.props.disableTimyo}>
                  <Icon className="trackOvld-footer-item-icon"/>
                  <span className="trackOvld-deactivate-for">{i18n.t('Deactivate Timyo for')} {email}</span>
              </li> */}
          </ul>
      );
  }
}

General.propTypes = {
    dispatch: PropTypes.func,
    store: PropTypes.object,
    // email: PropTypes.string,
    action: PropTypes.func,
    // disableTimyo: PropTypes.func,
};

export default General;
