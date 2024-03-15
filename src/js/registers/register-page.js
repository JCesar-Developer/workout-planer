import { Register } from "./register-model.js";
import { Workout } from "../workouts/workout-model.js";

/**
 * Add workout-list to the workout-selector in the register session page
 */
export function addWorkoutToSelector() {
  const selector = document.getElementById("workout-selector");
  const firstChild = selector.firstElementChild;
  selector.innerHTML = '';

  if (firstChild) {
    selector.appendChild(firstChild);
  }

  Workout.getAll().forEach(workout => {
    const option = document.createElement('option');
    option.value = workout.id;
    option.text = workout.name;
    selector.appendChild(option);
  });
}

addWorkoutToSelector();

/**
 * Render the registers list in the register session page
 */
export function renderRegisters() {
  const registersList = document.getElementById("register-list");
  registersList.innerHTML = '';

  Register.getAll().forEach(({ workout, date, exercisesDone }) => {
    const exercises = exercisesDone.map(({ exercise, weight, reps }) => {
      return `<li class="d-flex gap-2 list-group-item">
        <p><strong>Ejercicio:</strong> ${exercise.name}</p>
        <p><strong>Peso:</strong> ${weight} kg</p>
        <p><strong>Repeticiones:</strong> ${reps}</p>
      </li>`
    });
    
    registersList.innerHTML += 
    `<li class="list-group-item session-item">
      <div class="d-flex flex-row justify-content-between">
        <p><strong>Workout:</strong> ${workout.name}</span></p>
        <p><strong>Fecha y Hora:</strong> ${date}</p>
      </div>
      <ul id="register-list-exercises" class="card list-group">
        ${exercises.join('')}
      </ul>
    </li>`;
  });
}

renderRegisters() 

/**
 * Change the state of the open-register-modal button:
 * If the workout-selector is empty it makes the button disabled.
 * If the workout-selector has a value it makes the button enabled
 */
function toggleOpenBtn(){
  console.log(workoutSelector.value);
  if( !workoutSelector.value ) {
    const selector = document.getElementById("workout-selector");
    const firstChild = selector.firstElementChild;
    btnOpenRegisterModal.disabled = true;
    if (firstChild) selector.value = firstChild.value;
  }
  else btnOpenRegisterModal.disabled = false;
}

// EVENT LISTENERS --------------------------------------------------------------------------------
const sessionTab = document.getElementById('session-tab');
const workoutSelector = document.getElementById('workout-selector');
const btnOpenRegisterModal = document.getElementById("open-register-modal");

/**
 * Toggle the open-register-modal button state.
 * It is activated when the session-tab button is clicked.
 */
sessionTab.addEventListener('click', toggleOpenBtn);

/**
 * Toggle the open-register-modal button state
 * It is activated when the workout-selector changes.
 */
workoutSelector.addEventListener('change', toggleOpenBtn);
