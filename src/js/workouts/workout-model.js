import { workouts } from './workouts.js';

export class Workout {
  constructor(name, duration, exercises) {
    this.id = this.generateId();
    this.name = name;
    this.duration = duration;
    this.exercises = exercises;
  }

  //PUBLIC METHODS
  static getAll() {
    return workouts;
  }

  save() {
    try {
      this.validateWorkout(this);
      workouts.push(this);
    } catch (error) {
      alert(error);
    }
  }

  static delete(id) {
    const index = workouts.findIndex(workout => workout.id === id);
    workouts.splice(index, 1);
  }

  //PRIVATE METHODS
  generateId() {
    return Math.random().toString(36).slice(2, 9)
  };
  
  validateWorkout(workout) {
    if(!workout.id) {
      throw new Error("¡Cuidado! No estás asignando un id al workout");
    }
    if(workout.name === "") {
      throw new Error("El nombre es un campo obligatorio");
    }
    if(workout.duration === "") {
      throw new Error("La duración es un campo obligatorio");
    }
    if(workout.exercises.length === 0) {
      throw new Error("Debes seleccionar al menos un ejercicio");
    }
  }
}