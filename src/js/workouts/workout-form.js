import { exercises } from '../exercises/exercises.js';
import { Workout } from './workout-model.js';

import { renderWorkoutList } from './workout-page.js';
import { showNotification } from '../helpers.js';
import { addWorkoutToSelector } from "../registers/register-page.js";

/**
 * Add the exercises to the workput selector.
 */
function addExerciseToSelector() {
  exercises.forEach(({id, name, category}) => {

    const option = document.createElement("option");
    const optionContent =  document.createTextNode(`${name} - ${category}`);
    option.setAttribute("value", id);
    option.appendChild(optionContent);

    document.getElementById("exercise-selector").append(option);
  });
}

addExerciseToSelector();

/**
 * Add the selected exercise to the form.
 */
function addExerciseToForm(exerciseSelected){
  const exerciseId = exerciseSelected.value;
  const {name, category, image} = exercises.find(exercise => exercise.id == exerciseId);

  // Creating DOM element
  const rowExerciseSelected = document.createElement("li");
  rowExerciseSelected.classList.add("list-group-item");
  rowExerciseSelected.innerHTML = `
    <img src="${image}" alt="${name}" class="img-thumbnail">
    <p>${name}</p>
    <p>${category}</p>
    <button class="btn btn-danger">
      <i class="bi bi-trash"></i>
    </button>
  `;

  // Setting delete button
  const deleteBtn = rowExerciseSelected.querySelector('button');
  deleteBtn.addEventListener('click', function() {
    rowExerciseSelected.remove();
  });
  
  // Adding the exercise to the form
  const workoutForm = document.getElementById("exercises-selected");
  workoutForm.appendChild(rowExerciseSelected);
}

/**
 * Create a new workout if it passes the validations.
 */
function createWorkout(formData) {
  try {
    const workoutName = formData.get('workoutName');
    const workoutDuration = formData.get('workoutDuration');
    const workoutExercises = document.getElementById("exercises-selected").children;

    if (workoutName === "" && workoutDuration === "" && workoutExercises.length === 0) {
      throw new Error("Todos los campos son obligatorios");
    }
    if (workoutName.length === "") {
      throw new Error("El nombre es un campo obligatorio");
    }
    if (workoutDuration === "") {
      throw new Error("La duración es un campo obligatorio");
    }
    if (workoutExercises.length === 0) {
      throw new Error("Debes seleccionar al menos un ejercicio");
    }

    //Disable save button
    btnSaveWorkout.setAttribute("disabled", true);

    //Add the exercises to the workout object
    const exerciseList = [];
    for( let i = 0; i < workoutExercises.length; i++) {
      const exerciseName = workoutExercises[i].getElementsByTagName("p")[0].innerHTML;
      const exercise = exercises.find(exercise => exercise.name === exerciseName);
      exerciseList.push(exercise);
    }

    //Create the workout object and save the workout data
    const workout = new Workout(workoutName, workoutDuration, exerciseList);
    workout.save();

    renderWorkoutList();
    showNotification(`Workout "${workoutName}" creado`, "success");
    addWorkoutToSelector();

    //Close and reset the modal
    btnCloseForm.click();

  } catch (error) {
    alert(error);
  }
}

/**
 * Reset the form.
 */
function resetForm() {
  document.getElementById("workout-form").reset();
  document.getElementById("exercises-selected").innerHTML = "";
}

// EVENT LISTENERS --------------------------------------------------------------------------------
const btnOpenForm = document.getElementById('open-workout-form');
const workoutForm = document.getElementById('workout-form');
const exerciseSelector = document.getElementById('exercise-selector');
const btnSaveWorkout = document.getElementById('save-workout-btn');
const btnCloseForm = document.getElementById('close-workout-form');

/**
 * Add a new exercise to the form.
 * It is activated when the workout selector changes input.
 */
exerciseSelector.addEventListener('change', function(event) {
  addExerciseToForm(event.target);
});

/**
 * Dispatch the submit event of the form.
 * It is activated when the save button is clicked.
 */
btnSaveWorkout.addEventListener('click', function(event) {
  event.preventDefault();
  workoutForm.dispatchEvent(new Event('submit'));
});

/**
 * Catch the data of the form to send it to the function that creates the workout.
 * It is activated when the form is submitted.
 */
workoutForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(workoutForm);
  createWorkout(formData);
});

/**
 * Remove the disabled attribute from the save button.
 * It is activated when the open form button is clicked.
 */
btnOpenForm.addEventListener('click', () => {
  if(btnSaveWorkout.hasAttribute('disabled')) {
    btnSaveWorkout.removeAttribute('disabled');
  }
});

/**
 * Closes and reset the form.
 * It is activated when the cancel button is clicked.
 */
btnCloseForm.addEventListener('click', () => {
  resetForm();
})