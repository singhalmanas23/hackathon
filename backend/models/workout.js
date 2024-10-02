const mongoose =require("mongoose");
const {Schema}=mongoose;
const workout=new Schema({
    userid:{type:String,required:true},
    week:{type:String,required:true},
    workoutId:{type:Number,required:true},
    name:{type:String,required:true},
    reps:{type:Number,required:true},
    sets:{type:Number,required:true}

})

module.exports=mongoose.model("workout",workout);