// import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
// import CloseIcon from './icons/close';
// import { connect } from 'react-redux';
// import debounce from 'lodash.debounce';

// import { saveSettings } from './../../redux/modules/settings';
// import './scss/settingsModal.scss';

// const SwitchButton = ({isEnabled, onToggle}) => {
//     const activeClass = isEnabled ? 'slider__turnedOn' : 'slider__turnedOff';
//     const sliderClasses = `slider ${activeClass}`;

//     return (
//         <div className='switchButton' onClick={onToggle}>
//             <div className={sliderClasses}>
//                 <div className='slider-circle'/>
//                 <div className='slider-filled' />
//                 <div className='slider-empty' />
//             </div>
//         </div>
//     );
// };

// SwitchButton.propTypes = {
//     isEnabled: PropTypes.bool,
//     onToggle: PropTypes.func.isRequired,
// };

// class SettingsModal extends PureComponent {
//     constructor(props) {
//         super(props);

//         this.save = debounce(
//             (analyticsEvent) => {
//                 props.dispatch(saveSettings({ ...this.state.local }, analyticsEvent));
//                 this.setState({ key: Math.random() });
//             },
//             400,
//         );
//     }

//     state = {
//         local: { ...this.props.settings },
//     }

//     toggle = (type) => {
//         const { local } = this.state;
//         const { isWarningEnabled, isSignatureEnabled } = local;

//         let analyticsEvent;

//         switch (type) {
//             case 'warning': {
//                 this.setState({
//                     local: {
//                         ...local,
//                         isWarningEnabled: !isWarningEnabled,
//                     },
//                 });

//                 analyticsEvent = 'WARNING_' + (!isWarningEnabled ? 'ON' : 'OFF');

//                 break;
//             }
//             case 'signature': {
//                 this.setState({
//                     local: {
//                         ...local,
//                         isSignatureEnabled: !isSignatureEnabled,
//                     },
//                 });
//                 analyticsEvent = 'SIGNATURE_' + (!isSignatureEnabled ? 'ON' : 'OFF');
//                 break;
//             }
//         }

//         this.save(analyticsEvent);
//     }

//     render() {
//         const {
//             key,
//             local: { isWarningEnabled, isSignatureEnabled },
//         } = this.state;

//         return (
//             <div>
//                 <div className='settings'>
//                     <div className='settings-close' onClick={this.props.closeModal}>
//                         <CloseIcon/>
//                     </div>
//                     <div className='settings-content'>
//                         <h2 className='settings-contentHeader'>Timyo settings</h2>
//                         <h4 className='settings-contentGroupName'>Compose</h4>
//                         <div className='settings-contentItem'>
//                             <h4 className='itemName'>Enable warning window if “When” field is empty</h4>
//                             <SwitchButton
//                                 isEnabled={isWarningEnabled}
//                                 onToggle={() => this.toggle('warning')}
//                             />
//                         </div>
//                         <div className='settings-contentItem'>
//                             <h4 className='itemName'>Enable Timyo signature if “When” field is completed</h4>
//                             <SwitchButton
//                                 isEnabled={isSignatureEnabled}
//                                 onToggle={() => this.toggle('signature')}
//                             />
//                         </div>
//                     </div>
//                     <div className={`footer ${key && 'with-key'}`} key={key}>New settings saved!</div>
//                 </div>
//             </div>
//         );
//     }
// }

// SettingsModal.propTypes = {
//     settings: PropTypes.object,
//     isWarningEnabled: PropTypes.bool,
//     store: PropTypes.object,
//     closeModal: PropTypes.func,
//     modalProps: PropTypes.object,
//     dispatch: PropTypes.func.isRequired,
// };

// function mapStateToProps(state) {
//     return { settings: state.settings };
// }

// export default connect(mapStateToProps)(SettingsModal);
