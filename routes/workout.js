const express = require("express");
const workoutController = require("../controllers/workout.js");

const router = express.Router();

router.post("/addWorkout", workoutController.addWorkout);

router.get("/getMyWorkouts", workoutController.getMyWorkouts);

router.patch("/updateWorkout/:workoutId", workoutController.updateWorkout);

router.delete("/deleteWorkout/:workoutId", workoutController.deleteWorkout);

router.patch("/completeWorkoutStatus/:workoutId", workoutController.completeWorkoutStatus);

module.exports = router;

