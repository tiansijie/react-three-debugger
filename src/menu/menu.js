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
			"react-webgl-degbugger-menu-item",
			{"react-webgl-degbugger-menu-active": !isLeaf},
			{"react-webgl-degbugger-menu-disabled": isLeaf}
		)
		return <div className={menuClassNames} onClick={(e) => this.onClick(e)}>{this.props.name}</div>;
	}
}
