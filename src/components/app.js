import React, { Component, PropTypes } from 'react'
import ThreeView from './three-view';
import Panel from './panel';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ThreeViewActions from '../actions/threeView'

export default class App extends React.Component {
	render() {
		const { store, actions } = this.props
		return (
			<div>
				<ThreeView
					width={window.innerWidth}
					height={window.innerHeight}
					actions={actions}
					store={store}
				/>
				<Panel
					actions={actions}
					store={store}
				/>
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
