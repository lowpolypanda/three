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
};
function close() {
  console.log("tancar" + isOnDiv);
  document.getElementById("sidebar").style.width = "2.5rem";
  document.getElementById("menuClose").style.display = "none";
  document.getElementById("menuOpen").style.display = "";
};
//IMPORT PROJECTS INFO
import { projectArray } from "./projects.js";
const urlParam = new URLSearchParams(window.location.search);
const id = urlParam.get('id');
const title = "/ " + projectArray[id].title;
document.getElementById("title").innerText = title;
//THREE



