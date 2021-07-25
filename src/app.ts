import * as THREE from "three";

export default class App{
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  
  constructor() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1);

    this.createScene();
    this.createCamera();
    this.addDirectionalLight(0xffffff, { x: 300, y: 100, z: 1000 });
    this.addSpotLight(0xffffff, 0.2, { x: 100, y: 1000, z: 2000 });
    this.addSpotLight(0xffffff, 0.2, { x: -100, y: 1000, z: 2000 });
    this.addSpotLight(0xffffff, 0.2, { x: 100, y: 1000, z: 4000 });
    this.addSpotLight(0xffffff, 0.2, { x: -100, y: 1000, z: 4000 });
    this.createSphere();
    this.animate();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  createScene() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.body.appendChild(this.renderer.domElement);
  }

  createCamera() {
    this.camera.position.set(0, -120, 1000);
    this.scene.add(this.camera);
  }

  addDirectionalLight(color: number, position: { x: number, y: number, z: number }){
    const light = new THREE.DirectionalLight(color);
    light.position.set(position.x, position.y, position.z);
    this.scene.add(light);
  }

  addSpotLight(color: number, intensity: number,  position: { x: number, y: number, z: number }){
    const light = new THREE.SpotLight(color, intensity);
    light.position.set(position.x, position.y, position.z);
    this.scene.add(light);
  }

  createSphere(){
    const geometry = new THREE.SphereGeometry(250, 64, 64);
    const material = new THREE.MeshPhongMaterial( {color: 0xD09a32} );
    const sphere = new THREE.Mesh(geometry, material);
    this.scene.add(sphere);
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));
  }

  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}

