import { registers } from "./registers.js";

export class Register {
  constructor(workout, date, exercisesDone) {
    this.id = this.generateId();
    this.workout = workout;
    this.date = date;
    this.exercisesDone = exercisesDone;
  }

  //PUBLIC METHODS
  static getAll() {
    return registers;
  }

  save() {
    try {
      this.validateRegister(this);
      registers.push(this);
    } catch (error) {
      alert(error);
    }
  }

  //PRIVATE METHODS
  generateId() {
    return Math.random().toString(36).slice(2, 9)
  }

  validateRegister(register) {
    if(!register.workout || register.workout === "") {
      throw new Error("El workout es un campo obligatorio");
    }
    if(!register.date || register.date === "") {
      throw new Error("La fecha es un campo obligatorio");
    }
    if(!register.exercisesDone || register.exercisesDone.length === 0) {
      throw new Error("Debes añadir al menos un ejercicio");
    }
  }

}