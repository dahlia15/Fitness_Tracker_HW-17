const Workout = require("../models/db.js")

module.exports = function(app) {
    app.get("/api/workouts", function(req, res) {
        Workout.find({})
        .then(data => res.json(data))
        .catch(e => res.json(e))
    });

    app.get("/api/workouts/range", function(req, res) {
        Workout.find().sort({"day": 1}).limit(7)
        .then(data => res.json(data))
        .catch(e => res.json(e))
    });

    app.put("/api/workouts/:id", function(req, res) {

        let id = req.params.id;
        Workout.update({_id: mongoose.Types.ObjectId(id)}, {
            // pushing schema name to req.body
            $push: {exercises: req.body}
        }, (error, data) => {
            res.json(data)
        })

    });

    //creating new workout
    app.post("/api/workouts", function(req, res) {
        Workout.create({})
        .then(data => res.json(data))
        .catch(e => res.json(e))
    });
};

