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
  BoxBufferGeometry,
  EdgesGeometry,
  LineSegments,
  LineBasicMaterial,
  MeshBasicMaterial,
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
  HemisphereLight,
  AxesHelper,
  GridHelper,
  MeshPhongMaterial,
  WireframeGeometry,
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
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
//Scene
const scene = new Scene();
const canvas = document.getElementById("viewer-container");
//Helpers
const axes = new AxesHelper();
axes.material.depthTest = false;
axes.renderOrder = 2;
scene.add(axes);
const grid = new GridHelper();
grid.renderOrder = 1;
scene.add(grid);
//Objects
const xSide = parseInt(id) + 1;
const geometry = new BoxGeometry(xSide, 1, 1);
const geometry2 = new BoxGeometry(1, xSide, 1);
const material = new MeshLambertMaterial({ color: 0x02be6e });
const material2 = new MeshLambertMaterial({ color: 0xffff00 });
const box = new Mesh(geometry, material);
box.name = "Box 1";
const box2 = new Mesh(geometry2, material2);
box2.position.set(2, 0, 2);
box2.name = "Box 2";
scene.add(box);
scene.add(box2);
//Lights
const directionalLightMain = new DirectionalLight();
directionalLightMain.position.set(3, 2, 1);
const directionalLight = new DirectionalLight();
directionalLight.position.set(0xffffff, 0.1);
directionalLight.position.set(-3, -2, -1);
const ambientLight = new AmbientLight(0xffffff, 0.2);
const hemisphereLight = new HemisphereLight(0xffffff, 0x000000, 0.2);
scene.add(
  directionalLightMain,
  directionalLight,
  ambientLight,
  hemisphereLight
);
//Camera
//const camera = new OrthographicCamera( canvas.clientWidth / - 2, canvas.clientWidth / 2, canvas.clientHeight / 2, canvas.clientHeight / - 2, 1, 1000 );
const camera = new PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight
);
camera.position.x = 3;
camera.position.y = 3;
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
renderer.setClearColor(0xfafafa, 1);
//Label renderer
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.pointerEvents = "none";
labelRenderer.domElement.style.top = "0";
document.body.appendChild(labelRenderer.domElement);

//Responsivity
window.addEventListener("resize", () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  labelRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
});
//Raycaster
const raycaster = new Raycaster();
const mouse = new Vector2();
const container = document.getElementById("viewer-container");
//Raycaster + Label Objects
let drag = false;
document.addEventListener("mousedown", () => (drag = false));
document.addEventListener("mousemove", () => (drag = true));
document.addEventListener("click", (event) => {
  if (drag === false) {
    mouse.x =
      ((event.clientX - container.offsetLeft) / container.clientWidth) * 2 - 1;
    mouse.y =
      -((event.clientY - container.offsetTop) / container.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children);
    intersects = intersects.filter((found) => found.object.type === "Mesh");
    if (!intersects.length) return;
    const location = intersects[0].point;
    const message = intersects[0].object.name;
    const label = document.createElement("h4");
    label.classList.add("label");
    label.textContent = message;
    const labelObject = new CSS2DObject(label);
    labelObject.position.copy(location);
    scene.add(labelObject);
  }
});

//Animation
function animate() {
  const delta = clock.getDelta();
  cameraControls.update(delta);
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
//Listeners
let wireframeStatus = false;
const meshArray = [];
scene.traverse((object) => {
  if (object.isMesh) {
    meshArray.push(object);
  }
});
for (i = 0; i < meshArray.length; i++) {
  meshArray[i].userData = meshArray[i].material;
}
const wireframeButton = document.getElementById("wireframeButton");
wireframeButton.addEventListener("click", wireframeFunc);
function wireframeFunc() {
  for (i = 0; i < meshArray.length; i++) {
    meshArray[i].visible = false;
  }
  if (wireframeStatus === false) {
    for (i = 0; i < meshArray.length; i++) {
      wireframeObject(meshArray[i]);
    }
  }
}
const hiddenlineButton = document.getElementById("hiddenlineButton");
hiddenlineButton.addEventListener("click", hiddenlineFunc);
function hiddenlineFunc() {
  const fillMaterial = new MeshBasicMaterial({
    color: 0xffffff,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });
  for (i = 0; i < meshArray.length; i++) {
    meshArray[i].material = fillMaterial;
    meshArray[i].visible = true;
  }
  box.material = fillMaterial;
  box.visible = true;
  if (wireframeStatus === false) {
    for (i = 0; i < meshArray.length; i++) {
      wireframeObject(meshArray[i]);
    }
  }
}
const shadedButton = document.getElementById("shadedButton");
shadedButton.addEventListener("click", shadedFunc);
function shadedFunc() {
  for (i = 0; i < meshArray.length; i++) {
    meshArray[i].material = meshArray[i].userData;
    meshArray[i].visible = true;
  }
  if (wireframeStatus === true) {
    const wireframeArray = [];
    scene.traverse((object) => {
      if (
        object.isLineSegments &&
        object.getObjectByName("Wireframe element")
      ) {
        wireframeArray.push(object);
      }
    });
    for (i = 0; i < wireframeArray.length; i++) {
      scene.remove(wireframeArray[i]);
      wireframeArray[i].geometry.dispose();
      wireframeArray[i].material.dispose();
    }
  }
  wireframeStatus = false;
}
function wireframeObject(element) {
  const wireframeGeometry = new EdgesGeometry(element.geometry);
  const wireframeMaterial = new LineBasicMaterial({
    color: 0x000000,
    linewidth: 2,
  });
  const wireframe = new LineSegments(wireframeGeometry, wireframeMaterial);
  const vector = element.position;
  wireframe.position.set(vector.x, vector.y, vector.z);
  wireframe.name = "Wireframe element";
  scene.add(wireframe);
  wireframeStatus = true;
}
const axesButton = document.getElementById("axesButton");
axesButton.addEventListener("click", function () {
  visibilityFunc(axes);
});
const gridButton = document.getElementById("gridButton");
gridButton.addEventListener("click", function () {
  visibilityFunc(grid);
});
function visibilityFunc(object) {
  object.visible = !object.visible;
}
