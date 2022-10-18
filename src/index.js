import VanillaTilt from "vanilla-tilt";

const mainContainer = document.querySelector(".main-container");

const characters = [];

const getEpisodes = (urls) => {
  const episodes = [];
  for (let i = 0; i < urls.length; i++) {
    const splittedUrl = urls[i].split("/");
    episodes.push(splittedUrl[splittedUrl.length - 1]);
  }
  return episodes;
};

const createCard = (character) => {
  const card = document.createElement("div");
  card.classList.add("card-container");
  const cardImage = document.createElement("img");
  cardImage.classList.add("card-image");
  const cardData = document.createElement("div");
  cardData.classList.add("card-data");
  const cardName = document.createElement("div");
  cardName.classList.add("card-name");
  const cardStatus = document.createElement("div");
  cardStatus.classList.add("card-status");
  const cardSpecies = document.createElement("div");
  cardSpecies.classList.add("card-species");
  const cardEpisodes = document.createElement("div");
  cardEpisodes.classList.add("card-episodes");

  cardImage.src = character.image;
  cardName.textContent = character.name;
  cardStatus.textContent = character.status;
  cardSpecies.textContent = character.species;
  if (character.episode.length > 15) {
    cardEpisodes.textContent = `${getEpisodes(character.episode.slice(0, 15)).join(", ")}...`;
  } else {
    cardEpisodes.textContent = getEpisodes(character.episode).join(", ");
  }

  card.appendChild(cardImage);
  cardData.appendChild(cardName);
  cardData.appendChild(cardStatus);
  cardData.appendChild(cardSpecies);
  cardData.appendChild(cardEpisodes);
  card.appendChild(cardData);
  mainContainer.appendChild(card);
};

fetch("https://rickandmortyapi.com/api/character")
  .then(response => response.json())
  .then(data => {
    characters.push(...data.results);
    characters.forEach((character) => createCard(character));
    VanillaTilt.init(document.querySelectorAll(".card-container"), {
      max: 25,
      speed: 1000,
    });
  });

// ParticleJS library functionality
particlesJS.load("particles-js", "assets/particles.json", function() {
  console.log("callback - particles.js config loaded");
});
