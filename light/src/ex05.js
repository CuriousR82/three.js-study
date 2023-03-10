import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import dat from 'dat.gui';

// HemisphereLight

export default function example() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    // shadow
    renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // renderer.shadowMap.type = THREE.BasicShadowMap;

	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.y = 1.5;
	camera.position.z = 4;
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.25);
    scene.add(ambientLight);

	const light = new THREE.HemisphereLight('pink', 'lime', 1);
	light.position.x = -5;
	light.position.y = 3;

	const lightHelper = new THREE.HemisphereLightHelper(light);
	scene.add(light, lightHelper);

    // shadow setting
    // hemispherelight doesnt have shadow
    // light.castShadow = true;
    // light.shadow.mapSize.width = 2048;
    // light.shadow.mapSize.height = 2048
    // light.shadow.radius = 5;

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);

	// Geometry
	const planeGeometry = new THREE.PlaneGeometry(10, 10);
	const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
	const sphereGeometry = new THREE.SphereGeometry(0.7, 16, 16);

	// Material
	const material1 = new THREE.MeshStandardMaterial({ color: 'white' });
	const material2 = new THREE.MeshStandardMaterial({ color: 'white' });
	const material3 = new THREE.MeshStandardMaterial({ color: 'white' });

	// Mesh
	const plane = new THREE.Mesh(planeGeometry, material1);
	const box = new THREE.Mesh(boxGeometry, material2);
	const sphere = new THREE.Mesh(sphereGeometry, material3);

	plane.rotation.x = - Math.PI * 0.5;
	box.position.set(1, 1, 0);
	sphere.position.set(-1, 1, 0);

    plane.receiveShadow = true;
    box.castShadow = true;
    box.receiveShadow = true;
    sphere.castShadow = true;
    sphere.receiveShadow = true;

	scene.add(plane, box, sphere);

	// AxesHelper
	const axesHelper = new THREE.AxesHelper(3);
	scene.add(axesHelper);

	// Dat GUI
	const gui = new dat.GUI();
	gui.add(light.position, 'x', -5, 5, 0.1).name('light X');
	gui.add(light.position, 'y', -5, 5, 0.1).name('light Y');
	gui.add(light.position, 'z', 2, 10, 0.1).name('light Z');

	// ?????????
	const clock = new THREE.Clock();

	function draw() {
		// const delta = clock.getDelta();
		const time = clock.getElapsedTime();

		// light.position.x = Math.cos(time) * 5;
		// light.position.z = Math.sin(time) * 5;

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// ?????????
	window.addEventListener('resize', setSize);

	draw();
}
