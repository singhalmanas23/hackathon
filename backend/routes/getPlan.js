const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');
router.post('/getPlans', async (req, res) => {
    try {
        const { id, week } = req.body || req.query;
        console.log(id);
        console.log(week);
        const plans = await Workout.find({
            userid: id,
            week: week
        });

        console.log(plans);
        if (plans.length === 0) {
            return res.status(404).json({ success: false, msg: 'No plans found' });
        }

        res.json({ success: true, plans });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});
router.post('/diet', async (req, res) => {
    try {
      const { bmi, age, gender } = req.body;
      const dietPlan = await getDiet(bmi, age, gender );
      console.log("Diet printing");
      console.log(dietPlan);
      res.status(200).json({ success: true, dietPlan });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  });



module.exports = router;
