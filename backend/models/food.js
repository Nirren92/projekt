const mongoose = require("mongoose");
//skapar schemat för maträtter
const foodSchema = new mongoose.Schema({
    foodID:{
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    group:{
        type:String,
        required:true,
        enum:['förrätt','huvudrätt','efterrätt']
    },
    name:{
        type:String,
        required:true,
        unique: true
    },
    description:{
        type:String,
        required:true
    },
    contains:{
        type:[String],
        required:true
    },
    price:{
        type:Number,
        required:true
    }
});


//hämta alla maträtter
foodSchema.statics.getFood = async function () {
    try
    {
        const allFoods = await this.find({});
        return allFoods;        
    }
    catch(error)
    {
        throw(error);
    }
};

// lägg till maträtt
foodSchema.statics.addFood = async function ({foodID,group,name,description,contains,price}) {
    try
    {
        const food = new this({
            foodID: Number(foodID),
            group: group,
            name: name,
            description: description,
            contains: contains,
            price: Number(price) 
        });

        console.log("data",food)
       
        await food.save();
        return food;
    }
    catch(error)
    {
        console.log("fel",error)
        throw(error);
    }
};

// uppdatera data maträtt
foodSchema.statics.updateFood = async function ({foodID,group,name,description,contains,price}) {
    try
    {

        const updatedFood = await this.findOneAndUpdate(
            {foodID:foodID},
            {group,name,description,contains,price},
            { new: true}
        );
        return updatedFood;
    }
    catch(error)
    {
        throw(error);
    }
};


// Ta bort maträtt
foodSchema.statics.removeFood = async function ({foodID}) {
    try
    {
        const result = await this.findOneAndDelete({ foodID: foodID });
        if(result)
            return result
        else
            throw new Error("maträtt finns ej");
    }
    catch(error)
    {
        throw(error);
    }
};




const Food = mongoose.model("Food",foodSchema);
module.exports = Food;

