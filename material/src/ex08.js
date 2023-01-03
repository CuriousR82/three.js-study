import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//  Converting texture images

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
    const texture = textureLoader.load(
        '/textures/skull/Material_2055.jpg',
    );

    // converting texture
    texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;

	// texture.offset.x = 0.3;
	// texture.offset.y = 0.3;

	// texture.repeat.x = 2;
	// texture.repeat.y = 2;

	// texture.rotation = Math.PI * 0.25;
	texture.rotation = THREE.MathUtils.degToRad(60);
	texture.center.x = 0.5;
	texture.center.y = 0.5;

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
    scene.background = new THREE.Color('white');

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
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 'white',
        map: texture
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);


    // 그리기
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

    // 이벤트
    window.addEventListener('resize', setSize);

    draw();
}
