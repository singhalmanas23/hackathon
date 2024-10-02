const express = require('express');
const router = express.Router();
const getResult = require('../models/gemini');

router.post('/workout', async (req, res) => {
  try {
    const { bmi, age, gender, type } = req.body;

    // Call the workout function with the provided data
    const workoutPlan = await getResult(bmi, age, gender, type);
    console.log("Workout printing");
    console.log(workoutPlan)
    // Send the workout plan back to the frontend
    res.status(200).json({ success: true, workoutPlan });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
