import { projectArray } from "./projects.js";
function createCard(card, i) {
  const title = document.createElement("h2");
  title.textContent = card.title;
  const type = document.createElement("h3");
  type.textContent = card.type;
  const updated = document.createElement("p");
  updated.textContent = "Last updated: " + card.updated;
  const img = document.createElement("img");
  img.src = `./PROJECTS/${i}/thumbnail.jpg`;
  img.alt = card.title;
  const link = document.createElement("a");
  link.href = `./viewer.html?id=${i}`;
  link.appendChild(title);
  const imgLink = document.createElement("a");
  imgLink.href = `./viewer.html?id=${i}`;
  imgLink.appendChild(img);
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.appendChild(imgLink);
  cardDiv.appendChild(type);
  cardDiv.appendChild(link);
  cardDiv.appendChild(updated);
  return cardDiv;
}
const cardContainer = document.getElementById("cardContainer");
let i = 0;
for (const project of projectArray) {
  console.log(project,i);
  const card = createCard(project, i);
  cardContainer.appendChild(card);
  i++;
}