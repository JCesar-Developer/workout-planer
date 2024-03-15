import { exercises } from './exercises.js';

/**
 * Render the exercise cards
 */
function renderExerciseCards() {
  const exerciseList = document.getElementById("exercise-list-complete");

  exercises.forEach(exercise => {
    const card = document.createElement("div");
    card.classList.add("exercise-card");

    const image = document.createElement("img");
    image.src = exercise.image;

    const name = document.createElement("h3");
    name.textContent = exercise.name;

    card.appendChild(image);
    card.appendChild(name);
    exerciseList.append(card);
  });
}

renderExerciseCards();