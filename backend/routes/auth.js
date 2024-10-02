const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Workout = require('../models/workout')
const dotenv = require('dotenv');
const getResult = require('../models/gemini');
dotenv.config();

const router = express.Router();

const calculateBMI = (weight, height) => {
    if (height <= 0) return null;
    return (weight / (height * height)).toFixed(2);
};

router.post('/signup', async (req, res) => {
    const { name, email, password, age, gender, type, height, weight } = req.body;

    try {
        let user = await User.findOne({ email });
        // if (user) {
        //     return res.status(400).json({ success: false, msg: 'User already exists' });
        // }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const bmi = calculateBMI(weight, height);

        const workoutPlan = await getResult(bmi, age, gender, type);
        // console.log(workoutPlan['0']);
        for (let key in workoutPlan) {
            if (workoutPlan.hasOwnProperty(key)) {
                const workouts = workoutPlan[key].workout;
                // console.log(`Workout for day ${key}:`);
                for (let i = 0; i < workouts.length; i++) {
                    const workoutdata = await Workout.create({
                        userid:email,
                        week:key,
                        workoutId:workouts[i].id,
                        name:workouts[i].name,
                        reps:workouts[i].reps,
                        sets:workouts[i].sets
                      });
                    //   console.log("DAta saved");
                    // console.log(`- ${workouts[i].name}: ${workouts[i].reps} reps, ${workouts[i].sets} sets`);
                }
            }
        }
        // console.log(workoutPlan);
        user = new User({
            name : name,
            email : email,
            password: hashedPassword,
        });

        await user.save();
        console.log("user is saved");

        const payload = {
            user: {
                id: user.email,
                email: user.email,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ success: true, token, userId: user.id, email: user.email });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                email: user.email,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ success: true, token, userId: user.id, email: user.email });
            }
        );
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
