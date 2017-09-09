import React, {Component} from 'react';

export default class Menu extends Component {
	
	constructor(props) {
		super(props);
		this.renderMenuItem = this.renderMenuItem.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(item) {
		if ( item.componentName ) {
			this.props.loadContent(item);
		}
	}
	
	renderMenuItem(item, index, path = ['root']) {
		const itemId = 'Menu_item_' + path.join('_') + '_' + index;
		return (<div className={ "Menu_item Menu_item_" + (item.children ? 'branch' : 'leaf') } key={itemId}>
			<input type="checkbox" className="Menu_item_checkbox" id={ itemId } />	
			<label className="Menu_item_trigger" onClick={ this.handleClick.bind(this, item) } htmlFor={ itemId } >
				{item.label}
			</label>
			{
				item.children ? <div className="Menu_item_children" >{ item.children.map( (item, index) => ( this.renderMenuItem(item, index, [...path, index]) ) ) }</div> : null
			}
			
		</div>);
	}
	
	render() {
		const menu = this.props.menu;
		return (<div className="Menu" >
			{
				menu.map( this.renderMenuItem )
			}
		</div>);
	}	
	
};
