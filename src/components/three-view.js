import React from 'react';
import THREE from 'three';

export default class ThreeView extends React.Component {

	webglRender() {
		requestAnimationFrame( this.webglRender.bind(this) );
		this.raycaster.setFromCamera( this.mouse, this.camera );

		const intersects = this.raycaster.intersectObjects( this.scene.children );

		if ( intersects.length > 0 ) {
			if ( this.INTERSECTED != intersects[ 0 ].object ) {
				if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
				this.INTERSECTED = intersects[ 0 ].object;
				this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
				this.INTERSECTED.material.emissive.setHex( 0xff0000 );
				this.props.actions.setSelection(this.INTERSECTED);
			}
		} else {
			if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
			this.INTERSECTED = null;
			if (this.props.store.threeView.uuid) {
				//this.props.actions.setSelection(null);
			}
		}
		this.renderer.render( this.scene, this.camera );
	}


	componentDidMount() {
		this.mouse = new THREE.Vector2();
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 75, this.props.width / this.props.height, 0.1, 1000 );

		this.renderer = new THREE.WebGLRenderer({
			canvas: this.refs.webgl,
			antialias: true,
			alpha: true
		});
		this.renderer.setSize( this.props.width, this.props.height );

		this.raycaster = new THREE.Raycaster();
		var geometry = new THREE.BoxGeometry(1, 1, 1);
		var material = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } );
		var cube = new THREE.Mesh(geometry, material);
		cube.rotation.x = 20;
		this.scene.add(cube);
		this.camera.position.z = 5;
		this.webglRender();
	}

	onMouseMove(e) {
		e.preventDefault();
		this.mouse.x = ( e.clientX / this.props.width ) * 2 - 1;
		this.mouse.y = - ( e.clientY / this.props.height ) * 2 + 1;
	}

	render() {
		return (
				<canvas
					onMouseMove={(e) => this.onMouseMove(e)}
					ref="webgl"
				/>
		);
	}
}
