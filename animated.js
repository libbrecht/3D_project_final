import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118.1/build/three.module.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';


function main() {
    // renderer                                                                 
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(800, 600);
    document.body.appendChild(renderer.domElement);

    // camera                                                                   
    const sizes = {
        width : window.innerWidth,
        height : window.innerHeight
    }
    
    const camera = new THREE.PerspectiveCamera(50, sizes.width/sizes.height, 0.1, 100)
    camera.position.set(0.25, 0.25, 0.5);
    //camera.up.set(0, 1, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // scene and lights                                                         
    const scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xcccccc));

    // load fbx model and texture                                               
    const objs = [];
    
    const loader = new FBXLoader();
    loader.load("./assets/creeper_texture_embeded.fbx", model => {
        model.scale.set(0.0001, 0.0001, 0.0001)
        // model is a THREE.Group (THREE.Object3D)                              
        const mixer = new THREE.AnimationMixer(model);
        // animations is a list of THREE.AnimationClip                          
        mixer.clipAction(model.animations[0]).play();
        scene.add(model);
        objs.push({model, mixer});
    });
    
    // animation rendering                                                      
    const clock = new THREE.Clock();
    (function animate() {
        // animation with THREE.AnimationMixer.update(timedelta)                
        objs.forEach(({mixer}) => {mixer.update(clock.getDelta());});
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    })();
    return objs;
}
const objs = main();