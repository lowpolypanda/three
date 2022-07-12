//SIDEBARMENU
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
}
function close() {
  console.log("tancar" + isOnDiv);
  document.getElementById("sidebar").style.width = "2.5rem";
  document.getElementById("menuClose").style.display = "none";
  document.getElementById("menuOpen").style.display = "";
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
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
//Scene
const scene = new Scene();
const canvas = document.getElementById("viewer-container");
//Objects
const xSide = parseInt(id) + 1;
const geometry = new BoxGeometry(xSide, 1, 1);
const material = new MeshBasicMaterial({ color: "white" });
const box = new Mesh(geometry, material);
scene.add(box);
//Camera
const camera = new PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight);
camera.position.z = 3;
scene.add(camera);
//Renderer
const renderer = new WebGLRenderer({ canvas: canvas });
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
//Responsivity
window.addEventListener('resize', ()=> {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
});
//Animation
function animate() {
  box.rotation.x += 0.01;
  box.rotation.z += 0.01;
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}
animate();
