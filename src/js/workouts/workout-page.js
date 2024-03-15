import { Workout } from "./workout-model.js";

import { showNotification } from "../helpers.js";
import { addWorkoutToSelector } from "../registers/register-page.js";

/**
 * Render workout list in the workout page
 */
export function renderWorkoutList() {
  const workoutList = Workout.getAll().map(({id, name, duration, exercises}) => {
    // Creating exercises list
    const exercisesList = exercises.map(exercise => {
      return `<li class="list-group-item">${exercise.name} (${exercise.category})</li>`
    }).join("");

    // Create workout card
    const workoutCard = document.createElement("li");
    workoutCard.innerHTML = `<article class="card">
        <div class="card-body">
          <header class="card-title mb-1 d-flex flex-row justify-content-between">
            <h5>${name}</h5>
            <p>${duration}min</p>
          </header>
          <ul class="list-group list-group-flush">
            ${exercisesList}
          </ul>
          <div class="d-flex justify-content-end">
            <button type="button" class="delete-workout-btn btn btn-danger">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </article>
    `;

    // Set delete button
    const deleteBtn = workoutCard.querySelector(".delete-workout-btn");
    deleteBtn.addEventListener("click", () => {
      deleteWorkout(id);
    });

    return workoutCard;
  });

  // Clear & rendering new workout list
  document.getElementById("workout-list").innerHTML = "";
  workoutList.forEach(workout => {
    document.getElementById("workout-list").appendChild(workout)
  });
}

renderWorkoutList();

/**
 * Delete a workout from the list
 */
function deleteWorkout(id) {
  const index = Workout.getAll().findIndex(workout => workout.id === id);
  const workoutName = Workout.getAll()[index].name;
  Workout.delete(id);

  renderWorkoutList();
  addWorkoutToSelector();
  showNotification(`Workout "${workoutName}" eliminado`, "danger");
}