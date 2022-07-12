const projectArray = [
    {
      type: "ARC",
      title: "01 OFAB EDI GEN LLS",
      updated: "28/05/2022",
    },
    {
      type: "ARC",
      title: "2 UPC EDI GEN MSC",
      updated: "29/05/2022",
    },
    {
      type: "STR",
      title: "03 OFC STR GEN CHU",
      updated: "30/05/2022",
    },
    {
      type: "MEP",
      title: "04 UPC MEP GEN JAV",
      updated: "02/06/2022",
    },
    {
      type: "MEP",
      title: "05 OFC MEP GEN MMA",
      updated: "02/06/2022",
    },
    {
      type: "ARC",
      title: "06 OFAB EDI GEN LLS",
      updated: "16/06/2022",
    },
    {
      type: "ARC",
      title: "07 UPC EDI GEN MSC",
      updated: "16/06/2022",
    },
    {
      type: "STR",
      title: "08 OFC STR GEN CHU",
      updated: "16/06/2022",
    },
    {
      type: "MEP",
      title: "09 UPC MEP GEN JAV",
      updated: "16/06/2022",
    },
    {
      type: "MEP",
      title: "10 OFC MEP GEN MMA",
      updated: "18/06/2022",
    },
  ];

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
const urlParam = new URLSearchParams(window.location.search);
const id = urlParam.get('id');
const title = "/ " + projectArray[id].title;
document.getElementById("title").innerText = title;
