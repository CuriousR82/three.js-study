import * as THREE from 'three';
import gsap from 'gsap';

// animation using libraries
export default function example() {

    // applying from html canvas
    const canvas = document.querySelector('#three-canvas');
    // const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        // alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // console.log(window.devicePixelRatio);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    // below sets the alpha half clear
    // renderer.setClearAlpha(0.5);
    //renderer.setClearColor(0x00ff00);


    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog('blue', 2, 7);
    // note that scene is above the renderer, so the color set on scene is prioritized over renderer, meaning that the color we set on renderer is ignored
    // scene.background = new THREE.Color('blue');


    // Camera
    // Perspective Camera
    const camera = new THREE.PerspectiveCamera(
        75, // 시야각(field of view)
        window.innerWidth / window.innerHeight, // 종횡비(aspect)
        0.1, // near
        1000 // far
    );
    camera.position.y = 1;
    camera.position.z = 5;
    scene.add(camera);


    // light
    // the second parameter is the strength of light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.x = 1;
    light.position.y = 3;
    light.position.z = 5;
    scene.add(light);


    // Mesh
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
        // color: 0xff0000
        // color: '#ff0000'
        color: 'red'
    });


    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // drawing the actual thing
    // console.log(Date.now());
    let oldTime = Date.now(); 

    function draw() {
        const newTime = Date.now();
        const deltaTime = newTime - oldTime;
        oldTime = newTime;
        
        renderer.render(scene, camera);
        // below two lines function the same, but only the bottom works with AR/VR content
        // window.requestAnimationFrame(draw);
        renderer.setAnimationLoop(draw);
    }
    draw();


    // gsap
    gsap.to(
        mesh.position,
        {
            duration: 1,
            y: 2,
            z: 3
        }
    );


    function setSize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }

    // when the window resizes, then call the function setSize which resizes the page
    window.addEventListener('resize', setSize);

}