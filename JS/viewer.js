//SIDEBARMENU
const sideBarText = document
  .getElementById("sidebar")
  .querySelectorAll(".menuText");
let isOnDiv = false;
document.getElementById("menuOpen").addEventListener("click", open);
document.getElementById("menuClose").addEventListener("click", close);
document.getElementById("menuClose").style.display = "none";
document.getElementById("sidebar").style.width = "2.5rem";
function open() {
  console.log("obrir" + isOnDiv);
  document.getElementById("sidebar").style.width = "15rem";
  document.getElementById("menuClose").style.display = "";
  document.getElementById("menuOpen").style.display = "none";
  const iterator = sideBarText.values();
  for (const value of iterator) {
    value.style.visibility = "visible";
    value.style.opacity = "1";
  }
}
function close() {
  console.log("tancar" + isOnDiv);
  document.getElementById("sidebar").style.width = "2.5rem";
  document.getElementById("menuClose").style.display = "none";
  document.getElementById("menuOpen").style.display = "";
  const iterator = sideBarText.values();
  for (const value of iterator) {
    value.style.visibility = "";
    value.style.opacity = "0";
  }
}
function hideText(text) {
  text.style.colot = "pink";
}
//IMPORT PROJECTS INFO
import { projectArray } from "./projects.js";
const urlParam = new URLSearchParams(window.location.search);
const id = urlParam.get("id");
const title = "/ " + projectArray[id].title;
document.getElementById("title").innerText = title;
//THREE
//Three import
import {
  Scene,
  BoxGeometry,
  MeshLambertMaterial,
  Mesh,
  PerspectiveCamera,
  OrthographicCamera,
  WebGLRenderer,
  MOUSE,
  Vector2,
  Vector3,
  Vector4,
  Quaternion,
  Matrix4,
  Spherical,
  Box3,
  Sphere,
  Raycaster,
  MathUtils,
  Clock,
  DirectionalLight,
  AmbientLight,
} from "three";
import CameraControls from "camera-controls";
const subsetOfTHREE = {
  MOUSE,
  Vector2,
  Vector3,
  Vector4,
  Quaternion,
  Matrix4,
  Spherical,
  Box3,
  Sphere,
  Raycaster,
  MathUtils: {
    DEG2RAD: MathUtils.DEG2RAD,
    clamp: MathUtils.clamp,
  },
};
//Scene
const scene = new Scene();
const canvas = document.getElementById("viewer-container");
//Objects
const xSide = parseInt(id) + 1;
const geometry = new BoxGeometry(xSide, 1, 1);
const material = new MeshLambertMaterial({ color: 0xaaaaaa });
const box = new Mesh(geometry, material);
scene.add(box);
//Lights
const directionalLight = new DirectionalLight();
directionalLight.position.set(3, 2, 1).normalize();
const ambientLight = new AmbientLight(0xffffff, 0.2);
scene.add(directionalLight, ambientLight);
//Camera
//const camera = new OrthographicCamera( canvas.clientWidth / - 2, canvas.clientWidth / 2, canvas.clientHeight / 2, canvas.clientHeight / - 2, 1, 1000 );
const camera = new PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight
);
camera.position.z = 3;
scene.add(camera);
// Controls
CameraControls.install({ THREE: subsetOfTHREE });
const clock = new Clock();
const cameraControls = new CameraControls(camera, canvas);
cameraControls.dollyToCursor = true;
//cameraControls.setOrbitPoint(0,0,0);
//Renderer
const renderer = new WebGLRenderer({ canvas: canvas });
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
//Responsivity
window.addEventListener("resize", () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
});
//Animation
function animate() {
  const delta = clock.getDelta();
  cameraControls.update(delta);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
