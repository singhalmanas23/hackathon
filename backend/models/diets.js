const API_KEY = 'AIzaSyDcY8ubTUnuXxoWyB44rzvHYOCPffcqmFo';
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function formatToJsonString(input) {
    const jsonString = `{${input.trim()}}`;
    return jsonString.replace(/([,\{\[]\s*)\"/g, '$1\\"').replace(/\"([0-9]+)\":/g, '"$1":');
}

const getDiet = async ({ bmi, age, gender }) => {
    try {
        const prompt = `
    Now, using data like BMI:  ${bmi}, Age: ${age}, Gender: ${gender}, create a daily diet routine using the exercises.  
    You have to give the response strictly in the form of a string that looks like a JSON object like the example below:
    {
        "breakfast": {
            "diet": [
                '2 boiled eggs...',
                'Lean meat..',
                ...       
            ]
        },
        "Lunch": {
            diet: [
                ...
            ]
        },
        "Dinner": {
            diet: [
                ...
            ]
        }
    }
    Create the diet according to the information related to BMI, age, gender etc and create foot items for each breakfast, lunch and dinner.
    Avoid creating "json" and other characters at the front and back of the string and dont create any markdown tags.
`;


        const result = await model.generateContent(prompt);
        
        const object = result.response.text();
        
        
        const data = JSON.parse(object);
        console.log(data['0']);
        return data;
    } catch (error) {
        console.log(error);
    }
};

module.exports = getDiet;