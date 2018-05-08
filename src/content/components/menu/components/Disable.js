import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import { enableAccount } from '../../../redux/actions';

const i18n = getI18n();

class Disable extends Component {
  enableTimyo = () => {
      const { dispatch, email } = this.props;

    //   dispatch(enableAccount(email));

      // TODO: Refact these logic after content/content.js file refactoring
      location.reload();
  }

  render() {
      return (
          <div className="trackOvld-menu disabled" onClick={this.props.action}>
              <div className="trackOvld-dropdown-content">
                  <h3>{i18n.t('Timyo is disabled for this account.')}</h3>
                  <p>{i18n.t('You should click below to re-enable:')}</p>
                  <button className="trackOvld-enable-button" onClick={this.enableTimyo}>
                      {i18n.t('Enable Timyo extension')}
                  </button>
              </div>
          </div>
      );
  }
}

Disable.propTypes = {
    dispatch: PropTypes.func,
    action: PropTypes.func,
    email: PropTypes.string,
};

export default Disable;
