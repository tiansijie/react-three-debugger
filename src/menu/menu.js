import React from 'react';
import classNames from 'classnames';

export class MenuComponent extends React.Component {
	onClick(e) {
		e.preventDefault();
		this.props.onClick(e)
	}

	render() {
		const isLeaf = this.props.isOpen === undefined;
		const menuClassNames = classNames(
			"react-threejs-degbugger-menu-item",
			{"react-threejs-degbugger-menu-active": !isLeaf},
			{"react-threejs-degbugger-menu-disabled": isLeaf}
		)
		return <div className={menuClassNames} onClick={(e) => this.onClick(e)}>{this.props.name}</div>;
	}
}
