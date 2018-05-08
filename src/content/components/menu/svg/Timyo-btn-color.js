import React from 'react';
import PropTypes from 'prop-types';

const TimyoBtnColor = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <g fill="none" fillRule="evenodd">
            <path fill="#FFF" d="M16,0 C24.8352,0 32,7.1632 32,16 C32,24.8352 24.8352,32 16,32 C7.1632,32 0,24.8352 0,16 C0,7.1632 7.1632,0 16,0"/>
            <g transform="translate(9.5 6.5)">
                <polygon fill="#666" points=".557 .532 2.934 .532 6.054 9.348 4.866 12.692"/>
                <polygon fill="#028EFF" points="12.443 .532 9.917 .532 8.58 4.636 11.106 4.636"/>
                <polygon fill="#FFD400" points="8.283 5.548 7.095 9.044 9.472 9.044 10.809 5.548"/>
                <polygon fill="#7BC198" points="6.649 9.956 5.46 13.452 7.986 13.452 9.174 9.956"/>
                <polygon fill="#FC4E67" points="5.163 14.364 3.826 18.468 6.203 18.468 7.689 14.364"/>
            </g>
        </g>
    </svg>
);

TimyoBtnColor.propTypes = {
    className: PropTypes.string,
};

export default TimyoBtnColor;
