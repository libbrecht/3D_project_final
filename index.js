import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118.1/build/three.module.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()


const loader = new GLTFLoader()
loader.load('./assets/projet3D_maison.glb', function(gltf){
    console.log(gltf)
    const root = gltf.scene;
    root.scale.set(0.05,0.05,0.05);
    root.rotation.y = Math.PI +0.5;
    scene.add(root);
    
}, function(xhr){
    console.log((xhr.loaded/xhr.total * 100) + "% loaded")
}, function(error){
    console.log("an error occurred")
})


const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 0.4 );
hemiLight.position.set( 0, 20, 0 );
scene.add( hemiLight );

const dirLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
dirLight.position.set( - 3, 10, - 10 );
scene.add( dirLight );


//const geometry = new THREE.BoxGeometry(1,1,1)
//const material = new THREE.MeshBasicMaterial({
//    color : 0x00ff00
//})

//const boxMesh = new THREE.Mesh(geometry,material)
//scene.add(boxMesh)

// boiler
const sizes = {
    width : window.innerWidth,
    height : window.innerHeight
}

const camera = new THREE.PerspectiveCamera(50, sizes.width/sizes.height, 0.1, 100)
camera.position.set( 1, 0.7, 3 );
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas : canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enable = true
renderer.gammaOuput = true 
renderer.outputEncoding = THREE.sRGBEncoding;

animate()
function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera);
}
