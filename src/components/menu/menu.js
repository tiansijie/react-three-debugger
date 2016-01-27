import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

export class MenuComponent extends React.Component {
	render() {
		const isLeaf = this.props.isOpen === undefined;
		return <RaisedButton fullWidth={true} style={{display: 'block', borderBottomStyle: 'ridge', borderBottomWidth: '1', borderColor: 'black'}} disabled={isLeaf} onClick={(e) => this.props.onClick(e)}>{this.props.name}</RaisedButton>;
	}
}
