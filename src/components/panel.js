import React from 'react';

export default class Panel extends React.Component {
	render() {
		console.log(this.props.store);
		return <div>
			I am the Panel
		</div>;
	}
}
