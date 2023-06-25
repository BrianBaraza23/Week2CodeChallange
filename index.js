const characterBar = document.getElementById("character-bar");
const animalName = document.getElementById("name");
const image = document.getElementById("image");
const form = document.getElementById("votes-form");
const animalVotes = document.getElementById("vote-count");
const input = document.getElementById("votes");
const resetVotes = document.getElementById("reset-btn");

// Reset 
resetVotes.addEventListener("click", () => {
  if (currentAnimal) {
    currentAnimal.votes = 0;
    showAnimal(currentAnimal);
  }
});

// Fetch data 
function getCharacters() {
  fetch("db.json")
    .then((response) => response.json())
    .then((data) => {
      renderAnimals(data.characters);
    });
}

getCharacters();

function renderAnimals(animals) {
  animals.forEach(renderCharacters);
}

// Render Charcters
function renderCharacters(animal) {
  const animalElement = document.createElement("span");
  animalElement.innerHTML = animal.name;
  animalElement.style.cursor = "pointer";
  characterBar.appendChild(animalElement);
  animalElement.addEventListener("click", () => {
    currentAnimal = animal;
    showAnimal(animal);
  });
}

function showAnimal(animal) {
  animalName.innerHTML = animal.name;
  image.src = animal.image;
  animalVotes.innerHTML = animal.votes;

  // Submit votes
  form.removeEventListener("submit", handleVoteSubmission);
  form.addEventListener("submit", handleVoteSubmission);
}

// add vote count

function handleVoteSubmission(e) {
  e.preventDefault();
  if (currentAnimal) {
    const votes = parseInt(input.value);
    if (!isNaN(votes) && votes >= 0) {
      currentAnimal.votes += votes;
      showAnimal(currentAnimal);
    }
    input.value = "";
  }
}