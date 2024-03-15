import { workouts } from '../workouts/workouts.js';
import { exercises } from '../exercises/exercises.js';

export const registers = [
  { id: 1, workout: workouts[0], date: "2022-05-10 09:00:00", exercisesDone: [
    { exercise: exercises[0], weight: 50, reps: 12 },
    { exercise: exercises[1], weight: 0, reps: 18 },
  ]},
  { id: 2, workout: workouts[1], date: "2022-06-10 09:00:00", exercisesDone: [
    { exercise: exercises[3], weight: 20, reps: 12 },
    { exercise: exercises[4], weight: 10, reps: 18 },
  ]},
]