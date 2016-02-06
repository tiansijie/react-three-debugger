import React, { Component, PropTypes } from 'react'
import ThreeView from './three-view';
import Panel from '../../../src/three-debugger-menu';
import "../../../src/three-debugger-menu.css";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ThreeViewActions from '../actions/threeView'
import './app.less';

export default class App extends React.Component {
	render() {
		const { store, actions } = this.props
		const threeViewWidth = window.innerWidth * 0.7;
		const panelWidth = window.innerWidth * 0.2;
		return (
			<div>
				<div
					className="three-view-container"
					style={{
					width: threeViewWidth,
					display: 'inline-block'
					}}
				>
					<ThreeView
						width={threeViewWidth}
						height={window.innerHeight}
						actions={actions}
						store={store}
					/>
				</div>
				<div
					className="panel-container"
					style={{
						position: 'absolute',
						height: '100%',
						width: panelWidth,
						display: 'inline-block'
					}}
				>
					<Panel
						actions={actions}
						store={store}
					/>
				</div>
			</div>
		);
	}
}


App.propTypes = {
  store: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    store: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ThreeViewActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
