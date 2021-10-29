import React from 'react';
// import PropTypes from 'prop-types';

function Alert(props) {
    return (
        <div className={`alert alert-info alert-dismissible fade show`} role="alert">
            <strong>{props.alert.msg}</strong>
        </div>
    )
}

export default Alert
