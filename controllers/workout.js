const Workout = require("../models/Workout.js");
const { errorHandler } = require('../auth.js');

module.exports.addWorkout = (req, res) => {
    let newWorkout = new Workout({
        userId: req.body.userId,
        name: req.body.name,
        duration: req.body.duration
    });

    Workout.findOne({ name: req.body.name })
        .then(existingWorkout => {
            if (!existingWorkout) {
                return newWorkout.save()
                .then(result => res.status(201).send(result));
            } else {
                return res.status(409).send({ message: 'Workout already exists' });
            }
        })
        .catch(err => errorHandler(err, req, res));
};

module.exports.getMyWorkouts = (req, res) => {

    return Workout.find({ userId: req.body.userId })
    .then(result => {
        if(result.length === 0){
            return res.status(500).send({message: 'No workouts'});
            
        }
        else{
            return res.status(201).send({"workouts": result});
        }
    })
    .catch(error => errorHandler(error, req, res));

};

module.exports.updateWorkout = async (req, res) => { // Mark the function as async
    try {
        const updatedWorkout1 = {
            userId: req.body.userId,
            name: req.body.name,
            duration: req.body.duration,
            status: req.body.status,
        };

        const updatedWorkout = await Workout.findByIdAndUpdate(
            req.params.workoutId,
            updatedWorkout1,
            { new: true }
        );

        if (!updatedWorkout) {
            res.status(404).send({ message: 'Workout not found' });
        } else {
            res.status(200).send({ message: 'Workout updated successfully', updatedWorkout });
        }
    } catch (error) {
        // Handle any errors
        errorHandler(error, req, res);
    }
};


module.exports.deleteWorkout = (req, res) => {
    Workout.findByIdAndDelete(req.params.workoutId)
        .then(workout => {
            if (!workout) {
                return res.status(404).send({ message: 'Workout not found' });
            } else {
                return res.status(200).send({ 
                    message: 'Workout deleted successfully' 
                });
            }
        })
        .catch(error => {
            errorHandler(error, req, res);
        });
};

module.exports.completeWorkoutStatus = async (req, res) => {
    try {
        // Find the workout by ID first
        const workout = await Workout.findById(req.params.workoutId);

        
        if (!workout) {
            return res.status(404).send({ message: 'Workout not found' });
        }

        // Check if the workout is already completed
        // if (workout.status === "completed") {
        //     return res.status(200).send({
        //         message: 'Workout status updated already',
        //     });
        // }

        // Update the workout status to "completed"
        const updatedWorkout = await Workout.findByIdAndUpdate(
            req.params.workoutId,
            { status: "completed" },
            { new: true }
        );

        return res.status(200).send({
            message: 'Workout status updated successfully',
            updatedWorkout: updatedWorkout
        });

    } catch (error) {
        errorHandler(error, req, res);
    }
};
