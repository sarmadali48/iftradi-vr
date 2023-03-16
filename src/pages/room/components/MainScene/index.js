import React, { Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class GLTFScene extends Component {
  constructor(props) {
    super(props);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.state = {
      model: null,
    };
  }

  componentDidMount() {
    // Add renderer to DOM
    this.mount.appendChild(this.renderer.domElement);

    // Load gltf model
    const loader = new GLTFLoader();
    loader.load("/models/classroom/scene.gltf", (gltf) => {
      this.scene.add(gltf.scene);
      this.setState({ model: gltf.scene });
    });

    // Set up camera position
    this.camera.position.z = 5;

    // Start animation loop
    this.animate();
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    if (this.state.model) {
      // Rotate the model
      this.state.model.rotation.y += 0.01;
    }

    // Render the scene
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return <div ref={(mount) => (this.mount = mount)} />;
  }
}

export default GLTFScene;
