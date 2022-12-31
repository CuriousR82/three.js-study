import * as THREE from 'three';

// animation 
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
    camera.position.z = 5;
    scene.add(camera);


    // light
    // the second parameter is the strength of light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.x = 1;
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
    const clock = new THREE.Clock();
    

    function draw() {
        // console.log(clock.getElapsedTime());
        const time = clock.getElapsedTime();

        // mesh.rotation.y += 0.1;
        // mesh.rotation.y += THREE.MathUtils.degToRad(1);
        mesh.rotation.y = time;
        mesh.position.y += 0.01;

        // we want to apply the clock to the position too, but that doesnt work with the if case we have below, so we will try a method in ex06

        if (mesh.position.y > 2) {
            mesh.position.y = 0;
        }
        renderer.render(scene, camera);

        // below two lines function the same, but only the bottom works with AR/VR content
        // window.requestAnimationFrame(draw);
        renderer.setAnimationLoop(draw);
    }
    draw();

    function setSize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }

    // when the window resizes, then call the function setSize which resizes the page
    window.addEventListener('resize', setSize);

}