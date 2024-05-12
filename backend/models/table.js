const mongoose = require("mongoose");



//skapar schemat för bord/table. 
const tableSchema = new mongoose.Schema({
    tableID:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    capacity:{
        type:Number,
        required:true,
        min:1
    },
    location:{
        type:String,
        required:true,
        enum:['inne','ute']
    }

});

// lägg till bord
tableSchema.statics.add = async function ({tableID,capacity,location}) {
    try
    {
        const table = new this({tableID,capacity,location});
        await table.save();
        return table;
    }
    catch(error)
    {
        throw(error);
    }
};

// uppdatera data bord
tableSchema.statics.updateTable = async function ({tableID,capacity,location}) {
    try
    {

        const updatedTable = await this.findOneAndUpdate(
            {tableID:tableID},
            {capacity,location}
        );
        return updatedTable;
    }
    catch(error)
    {
        throw(error);
    }
};


// Ta bort bord
tableSchema.statics.removeTable = async function ({tableID}) {
    try
    {
        const result = await this.findOneAndDelete({ tableID: tableID });
        if(result)
            return result
        else
            throw new Error("Bord finns ej");
    }
    catch(error)
    {
        throw(error);
    }
};



const Table = mongoose.model("Table",tableSchema);
module.exports = Table;