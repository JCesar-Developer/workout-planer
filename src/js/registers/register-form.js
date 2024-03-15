import { Register } from "./register-model.js";
import { Workout } from "../workouts/workout-model.js";
import { exercises } from "../exercises/exercises.js";

import { renderRegisters } from "./register-page.js";
import { showNotification } from "../helpers.js";

/**
 * Change the title of the register modal depending on the workout selected 
 */
function changeTitle(workoutSelected) {
  const title = document.getElementById("register-name");
  title.innerText = workoutSelected.name;
}

/**
 * Change the date of the register modal to the current date and hour
 */
function changeDate() {
  const dateNode = document.getElementById("register-date");
  let dateAndHour = new Date().toISOString().split('T');
  const date = dateAndHour[0];
  const hour = dateAndHour[1].split('.')[0];
  dateNode.innerHTML = `<b>Fecha:</b> ${date} ${hour}`
}

/**
 * Set the options of the especific-exercise-selector depending on the workout selected
 */
function setOptions(workoutSelected) {
  const spExSelector = document.getElementById("especific-exercise-selector");
  const firstChild = spExSelector.firstElementChild;
  spExSelector.innerHTML = '';

  if (firstChild) {
    spExSelector.appendChild(firstChild);
  }

  workoutSelected.exercises.forEach(exercise => {
    const option = document.createElement('option');
    option.value = exercise.id;
    option.text = exercise.name;
    spExSelector.appendChild(option);
  });
}

/**
 * Add a serie to the serie-list in the register modal
 */
function addSerieToForm(formData) {
  try {
    const exerciseId = formData.get('exerciseSelected');
    const weight = formData.get('weight');
    const reps = formData.get('reps');

    // Validate form data
    if (!exerciseId && weight == "" && reps == "") {
      throw new Error("Por favor, complete todos los campos");
    }
    if (!exerciseId) {
      throw new Error("Por favor, seleccione un ejercicio");
    }
    if (weight == "") {
      throw new Error("Por favor, ingrese el peso");
    }
    if (reps == "") {
      throw new Error("Por favor, ingrese el número de repeticiones");
    }
    
    // Create new serie element
    const newSerie = document.createElement("li");
    const {id,  name} = exercises.find(exercise => exercise.id == exerciseId);
    newSerie.classList.add("d-flex", "gap-2", "list-group-item");
    newSerie.innerHTML = `<li class="list-group-item w-100">
      <p class="mb-0">
        <input type="hidden" name="exerciseId" value="${id}">
        <span><strong>Ejercicio:</strong> ${name}</span>, 
        <span><strong>Peso:</strong> ${weight} kg</span>,
        <span><strong>Repeticiones:</strong> ${reps}</span>
      </p>
    </li>`;

    // Add serie to the list and reset the form
    serieList.appendChild(newSerie);
    serieForm.reset();

  } catch (error) {
    alert(error);
  }
}

/**
 * Register the new session saving the data in the registers array
 */
function registerSession() {
  try {
    // Validate form data
    if (serieList.children.length === 0) {
      throw new Error("Debes añadir al menos un ejercicio");
    }

    // Get workout
    const workoutId = document.getElementById("workout-selector").value;
    const workout = Workout.getAll().find(workout => workout.id == workoutId);

    // Get date
    const date = document.getElementById("register-date").innerText.replace("Fecha: ", "");

    // Get exercises done
    const exercisesDone = [];
    for (let i = 0; i < serieList.children.length; i++) {
      const exerciseId = serieList.children[i].querySelector('input[name="exerciseId"]').value;
      const exercise = exercises.find(exercise => exercise.id == exerciseId);
      const weight = parseInt(serieList.children[i].querySelector('span:nth-child(3)').innerText.split(' ')[1]);
      const reps = parseInt(serieList.children[i].querySelector('span:nth-child(4)').innerText.split(' ')[1]);
      exercisesDone.push({ exercise, weight, reps });
    }

    //Create the register object and save the register data
    const newRegister = new Register(workout, date, exercisesDone);
    newRegister.save();

    renderRegisters();
    showNotification(`Sesión "${workout.name}" registrada`, "success");

    //Close and reset the modal
    btnCloseModal.click();

  } catch (error) {
    alert(error);
  }
}

// EVENT LISTENERS --------------------------------------------------------------------------------
const buttonOpenModal = document.getElementById("open-register-modal");
const serieForm = document.getElementById("serie-form");
const serieList = document.getElementById("serie-list");
const btnCloseModal = document.getElementById("close-series-btn");
const btnSaveSession = document.getElementById("save-register-btn");

/**
 * Activate the changeTitle, changeDate and setOptions functions passing them the workout selected.
 * It is activated when the open-register-modal button is clicked.
 */
buttonOpenModal.addEventListener("click", () => {
  const workoutSelector = document.getElementById("workout-selector");  
  const workoutId = workoutSelector.options[workoutSelector.selectedIndex].value;
  const workoutSelected = Workout.getAll().find(workout => workout.id == workoutId);
  changeTitle(workoutSelected);
  changeDate();
  setOptions(workoutSelected);
});

/**
 * Submit the serie form-data and pass it to the addSerieToForm function
 * It is activated when the serie-form is submitted.
 */
serieForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(serieForm);
  addSerieToForm(formData);
});

/**
 * Close the serie modal and reset the form-serie
 * It is activated when the close-series-btn is clicked.
 */
btnCloseModal.addEventListener("click", () => {
  serieForm.reset();
  serieList.innerHTML = '';
});

/**
 * Activates the registerSession function to save the session
 * It is activated when the save-register-btn is clicked.
 */
btnSaveSession.addEventListener("click", registerSession);
