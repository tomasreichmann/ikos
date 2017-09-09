import React, {Component} from 'react';

export default class Loading extends Component {
	render() {
		return <div className="Loading">{ this.props.children || 'Načítá se...' }</div>;
	}	
};
