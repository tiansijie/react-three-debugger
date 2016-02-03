import React from 'react';
import classNames from 'classnames';
import './menu.less';

export class MenuComponent extends React.Component {

	onClick(e) {
		e.preventDefault();
		this.props.onClick(e)
	}

	render() {
		const isLeaf = this.props.isOpen === undefined;
		const menuClassNames = classNames(
			"menu-item",
			{"menu-active": !isLeaf},
			{"menu-disabled": isLeaf}
		)
		return <div className={menuClassNames} onClick={(e) => this.onClick(e)}>{this.props.name}</div>;
	}
}
