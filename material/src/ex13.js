import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//  Loading manager

export default function example() {
	
	const loadingManager = new THREE.LoadingManager();
	loadingManager.onStart = () => {
		console.log('start loading');
	}
	loadingManager.onProgress = img => {
		console.log(img + ' loading');
	}
	loadingManager.onLoad = () => {
		console.log('finished loading');
	}
	loadingManager.onError = () => {
		console.log('error');
	}

	const textureLoader = new THREE.TextureLoader(loadingManager);
	const baseColorTex = textureLoader.load('/textures/brick/Stylized_Bricks_001_basecolor.jpg');
	const ambientTex = textureLoader.load('/textures/brick/Stylized_Bricks_001_ambientOcclusion.jpg');
	const normalTex = textureLoader.load('/textures/brick/Stylized_Bricks_001_normal.jpg');
	const roughnessTex = textureLoader.load('/textures/brick/Stylized_Bricks_001_roughness.jpg');
	const heightTex = textureLoader.load('/textures/brick/Stylized_Bricks_001_height.png');

	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	// camera.position.y = 1.5;
	camera.position.z = 4;
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);

	// Mesh
	const geometry = new THREE.BoxGeometry(2, 2, 2);
	// const material = new THREE.MeshBasicMaterial({
	const material = new THREE.MeshStandardMaterial({
		map: baseColorTex,
        roughness: 0.3,
        normalMap: normalTex,
        roughnessMap: roughnessTex,
        aoMap: ambientTex,
        color: 'red'
	});
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);


	// ?????????
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

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
