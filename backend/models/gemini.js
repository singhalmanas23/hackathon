const API_KEY = 'AIzaSyDcY8ubTUnuXxoWyB44rzvHYOCPffcqmFo';
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function formatToJsonString(input) {
    // Wrap the input string in curly braces to form a valid JSON object
    const jsonString = `{${input.trim()}}`;

    // Replace double quotes around keys with escaped double quotes
    return jsonString.replace(/([,\{\[]\s*)\"/g, '$1\\"').replace(/\"([0-9]+)\":/g, '"$1":');
}

const getResult = async ({ bmi, age, gender, type }) => {
    try {
        const prompt = `
    ['Biceps Curl', 'Tricep Dips', 'Overhead Press', 'Lateral Raise', 'Squats', 'Lunges', 'Plank', 'Mountain Climbers']
    ['Arms', 'Arms', 'Shoulders', 'Shoulders', 'Legs', 'Legs', 'Core', 'Core']
    These are some of the workouts and their types respectively (index number of exercise and their type is the same in both the arrays).
    Now, using data like BMI:  ${bmi}, Age: ${age}, Gender: ${gender}, Type: ${type}, create a workout routine using the exercises 
    given above. Consider info like bmi, age, gender, type for getting appropriate reps and sets for each exercise. For type of exercise, use the type parameter
    which is one of ['Full Body', 'Shoulder', 'Arms', 'Legs', 'Core']. For full body, create a routine taking random exercises of each type. 
    You have to give the response strictly in the form of a string that looks like a JSON object like the example below:
    {
        "0": {
            "workout": [
                {
                    "id": 0,
                    "name": "Biceps curls",
                    "reps": 4,
                    "sets": 2
                }, 
                {
                    "id": 1,
                    "name": "Tricep dips",
                    "reps": 4,
                    "sets": 2
                }
            ]
        },
        "1": {
            "workout": [
                {
                    "id": 2,
                    "name": "Overhead press",
                    "reps": 4,
                    "sets": 2
                }, 
                {
                    "id": 3,
                    "name": "Lateral raise",
                    "reps": 4,
                    "sets": 2
                }
            ]
        }
    }
    Include workouts for all 7 days, denoting each day by a number, for example, Sunday as 0, Monday as 1, and so on. Each day should have 5 workouts.
    Avoid creating "json" and other characters at the front and back of the string and dont create any markdown tags.
`;


        const result = await model.generateContent(prompt);
        
        const object = result.response.text();
        // console.log(object);

        //const d1 = formatToJsonString(object)
        
        
        const data = JSON.parse(object);
        console.log(data['0']);
        return data;
    } catch (error) {
        console.log(error);
    }
};

module.exports = getResult;
