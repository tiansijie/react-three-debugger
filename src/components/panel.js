import React from 'react';
import InfinityMenu from 'react-infinity-menu';
import '../../node_modules/react-infinity-menu/src/infinity-menu.css';

export default class Panel extends React.Component {
	componentWillMount() {
		this.setState({
			tree: []
		});
	}


	travelObj(selected, node) {
		node.children = Object.keys(selected).reduce((prev, curr, index) => {
			let subTree = {};
			subTree.name = curr;
			subTree.id = index;
			subTree.isOpen = false;
			const currObj = selected[curr];
			if (typeof currObj === 'object') {
				this.travelObj(currObj, subTree);
			}
			if (typeof currObj === 'string' || typeof currObj === 'number' || typeof currObj === 'boolean') {
				subTree.name += " - " + currObj;
			}

			prev.push(subTree);
			return prev;
		}, []);
	}

	componentWillReceiveProps(nextProps) {
		const selected = nextProps.store.threeView;
		console.log(selected);
		if (selected) {
			const tree = Object.keys(selected).reduce((prev, curr, index) => {
				if (curr === "position" || curr === "type" || curr === "rotation" || curr === "userData" || curr === "scale" || curr === "uuid") {
					let subTree = {};
					subTree.name = curr;
					subTree.id = index;
					subTree.isOpen = false;
					const currObj = selected[curr];
					if (typeof currObj === 'object') {
						this.travelObj(currObj, subTree);
					}
					if (typeof currObj === 'string' || typeof currObj === 'number' || typeof currObj === 'boolean') {
						subTree.name += " - " + currObj;
					}
					prev.push(subTree);
				}
				return prev;
			}, []);

			this.setState({
				tree: tree
			});
		}
	}

	onNodeMouseClick(event, tree) {
		this.setState({
			tree: tree
		});
	}

	render() {
		return <div
			style={{
			height: '100%',
			display: 'block'
			}}
		>
			I am the Panel
			<InfinityMenu
				tree={this.state.tree}
				onNodeMouseClick={this.onNodeMouseClick.bind(this)}
			/>
		</div>;
	}
}
