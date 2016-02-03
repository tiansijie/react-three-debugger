import React from 'react';
import THREE from 'three';

export default class ThreeView extends React.Component {

	webglRender() {
		requestAnimationFrame( this.webglRender.bind(this) );
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

		var light = new THREE.AmbientLight( 0x404040 ); // soft white light
		this.scene.add( light );

		var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
		this.scene.add( light );

		this.raycaster = new THREE.Raycaster();

		for (var i = 0; i < 30; ++i) {
			var geometry = new THREE.BoxGeometry(2, 2, 2);
			var material = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } );
			var cube = new THREE.Mesh(geometry, material);
			cube.position.set(-10 + Math.random() * 15, -10 + Math.random() * 15, Math.random() * 10);
			cube.scale.set( 2 * Math.random(), 2 * Math.random(), 2 * Math.random())
			cube.rotation.x = 90 * Math.random();
			cube.rotation.y = 90 * Math.random();
			this.scene.add(cube);
		}
		this.camera.position.z = 25;
		this.camera.position.y = -5;
		this.camera.position.x = -5;
		this.webglRender();
	}

	onMouseDown(e) {
		e.preventDefault();
		this.mouse.x = ( e.clientX / this.props.width ) * 2 - 1;
		this.mouse.y = - ( e.clientY / this.props.height ) * 2 + 1;

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
				this.props.actions.setSelection(null);
			}
		}
	}

	render() {
		return (
				<canvas
					onMouseDown={(e) => this.onMouseDown(e)}
					ref="webgl"
				/>
		);
	}
}
