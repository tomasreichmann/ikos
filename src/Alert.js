import React, {Component} from 'react';
import classNameMapper from './classNameMapper';

const Alert = ({
    children = 'no content',
    className = '',
    warning,
    primary,
    secondary,
    success,
    danger,
    info,
}) => {
	const classMap = {
		warning,
		primary,
		secondary,
		success,
		danger,
		info,
	};
    const classString = ['Alert'].concat(classNameMapper(classMap, 'Alert_'), className.split(' ')).join(' ');
    return <div className={classString} role="alert">{children}</div>;
};

export default Alert;