const mongoose = require("mongoose");
const Table = require('./table');


//skapar schemat för bokning. med referat till TABLE ID samt USER ID 
const bookingSchema = new mongoose.Schema({
        tableID:{
            type: String,
            ref: 'Table',
            required: true
        },
        username:{
            type:String,
            required:true,
            ref:'authprojekt'
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
bookingSchema.statics.findAvailableTables = async function ({bookingDate, numberGuests}) {
    try {
        //kollar vilka bord som har bokingar och sorterar bort dessa bord bland alla som finns. 
        const booked = await this.find({bookingDate: {$eq: bookingDate}}).distinct('tableID');
        return await Table.find({tableID: {$nin: booked}, capacity: {$gte: numberGuests}});
    }
    catch(error)
    {
        throw(error);
    }
}

//kontroll att bord är tillgänligt under bokning
bookingSchema.statics.checkAvailabilityTables = async function (desiredDate,tableID) {
    try {
        //kollar om det finns någon bokning på berörd tid. hittas ingen så returneras true 
        const booked = await this.find({
            tableID: tableID,
            bookingDate: desiredDate
        }).distinct('tableID');
        return booked.length === 0;
    }
    catch
    {
        throw(error);
    }
}

getBooking

// lägg till Booking. kontroll att border inte har blivit taget för att undvika dubbelbokning
bookingSchema.statics.getBooking = async function ({username}) {
    try
    {
        return userBookings = await booking.find({ username });
    }
    catch(error)
    {
        throw(error);
    }
};
// lägg till Booking. kontroll att border inte har blivit taget för att undvika dubbelbokning
bookingSchema.statics.addBooking = async function ({tableID, username,bookingDate,numberGuests}) {
    try
    {
        const isAvailable = await this.checkAvailabilityTables(bookingDate, tableID);
        if (!isAvailable) 
            {
                throw new Error("Border har blivit upptaget");
            }

            const booking = new this({
                tableID,
                username,
                bookingDate,
                numberGuests
            });
            await booking.save();
            return booking;
    }
    catch(error)
    {
        throw(error);
    }
};

// uppdatera Booking
bookingSchema.statics.updateBooking = async function ({bookingId,bookingDate,tableID,numberGuests}) {
    try
    {
        const existingBooking = await this.findById(bookingId);
        if (!existingBooking) {
            throw new Error("Bokning finns ej");
        }

        const isAvailable = await this.checkAvailabilityTables(bookingDate, tableID);
        if (!isAvailable) {
            throw new Error("Bordet är upptaget");
        }

        const updatedBooking = await this.findByIdAndUpdate(bookingId, {bookingDate,numberGuests},);
        return updatedBooking;
    
    } catch (error) {
        throw (error);
    }
};

// Ta bort Booking
bookingSchema.statics.removeBooking = async function ({tableID, username,bookingDate}) {
    try
    {
        const result = await this.findOneAndDelete({ tableID: tableID, username:username,bookingDate:bookingDate });
        if(result)
            return result
        else
            throw new Error("bokning finns ej");
    }
    catch(error)
    {
        throw(error);
    }
};



const Booking = mongoose.model("Booking",bookingSchema);
module.exports = Booking;