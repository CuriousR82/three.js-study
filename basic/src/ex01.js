import * as THREE from 'three';

// creating a basic scene, using mesh

export default function example() {

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// applying from html canvas
const canvas = document.querySelector('#three-canvas');
// const renderer = new THREE.WebGLRenderer({ canvas: canvas });
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Scene
const scene = new THREE.Scene();

// Camera
// Perspective Camera
const camera = new THREE.PerspectiveCamera(
    75, // 시야각(field of view)
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1, // near
    1000 // far
);
camera.position.x = 2.5;
camera.position.y = 1;
camera.position.z = 5;
scene.add(camera);

// Orthographic Camera
// const camera = new THREE.OrthographicCamera(
// 	-(window.innerWidth / window.innerHeight), // left
// 	window.innerWidth / window.innerHeight, // right,
// 	1, // top
// 	-1, // bottom
// 	0.1,
// 	1000
// );
// camera.position.x = 1;
// camera.position.y = 2;
// camera.position.z = 5;
// camera.lookAt(0, 0, 0);
// camera.zoom = 0.5;
// camera.updateProjectionMatrix();
// scene.add(camera);

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    // color: 0xff0000
    // color: '#ff0000'
    color: 'red'
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// drawing the actual thing
renderer.render(scene, camera);
}