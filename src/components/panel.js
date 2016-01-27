import React from 'react';
import { MenuComponent } from './menu/menu';
import InfinityMenu from 'react-infinity-menu';
import './panel.less';

export default class Panel extends React.Component {
	componentWillMount() {
		this.setState({
			tree: []
		});
	}

	travelChildObj(selected, node) {
		node.children = Object.keys(selected).reduce((prev, curr, index) => {
			let subTree = {};
			subTree.name = curr;
			subTree.id = index;
			subTree.isOpen = false;
			subTree.customComponent = MenuComponent;
			const currObj = selected[curr];
			if (typeof currObj === 'object') {
				this.travelChildObj(currObj, subTree);
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
		if (selected) {
			const tree = Object.keys(selected).reduce((prev, curr, index) => {
				if (curr === "position" || curr === "type" || curr === "rotation" || curr === "userData" || curr === "scale" || curr === "uuid" || curr === "matrix") {
					let subTree = {};
					subTree.name = curr;
					subTree.id = index;
					subTree.isOpen = false;
					subTree.customComponent = MenuComponent;
					const currObj = selected[curr];
					if (typeof currObj === 'object') {
						this.travelChildObj(currObj, subTree);
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
			width: '100%',
			display: 'block'
			}}
		>
			<InfinityMenu
				tree={this.state.tree}
				onNodeMouseClick={this.onNodeMouseClick.bind(this)}
			/>
		</div>;
	}
}
