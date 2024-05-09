const mongoose = require("mongoose");
const Table = require('./table');


//skapar schemat för bokning. 
const bookingSchema = new mongoose.Schema({
        tableID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Table',
            required: true
        },
        customerID:{
            type:Number,
            required:true,
            min:1
        },
        bookingDate: {
            type: Date,
            required: true
        },
        numberGuests: {
            type: Number,
            required: true,
            min: 1
        }    
    },
    {
        timestamps: true
    }
);

//tillgängliga bord
bookingSchema.statics.findAvailableTables = async function (desiredDate) {
    try {
        //kollar vilka bord som har bokingar och sorterar bort dessa bord bland alla som finns. 
        const booked = await this.find({bookingDate:{$eq:desiredDate}}).distinct('tableID');
        return await Table.find({_id:{$nin:booked}});
    }
    catch
    {
        throw(error);
    }
}

//kontroll att bord är tillgänligt
bookingSchema.statics.checkAvailabiltyTables = async function (desiredDate,tableID) {
    try {
        //kollar om det finns någon bokning på berörd tid. hittas ingen så returneras true 
        const booked = await this.find({tableID: tableID,bookingDate: desiredDate}).distinct('tableID');
        return !booked;
    }
    catch
    {
        throw(error);
    }
}

// lägg till Booking(ska jag ha en kontroll att bordet verkliglen är ledigt....hmm ja de ska jag. nån annan kanske hinner boka innan. )
bookingSchema.statics.addBooking = async function ({tableID,capacity,location}) {
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

// uppdatera Booking
bookingSchema.statics.updateBooking = async function ({tableID,capacity,location}) {
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


// Ta bort Booking
bookingSchema.statics.removeBooking = async function ({tableID}) {
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



const Table = mongoose.model("Table",bookingSchema);
module.exports = Table;