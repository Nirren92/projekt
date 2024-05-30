require("dotenv").config();

const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const uri = process.env.URLDB;

const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");


mongoose
    .connect(uri)
    .then(() => {console.log("Ansluten till mongodb");})
    .catch((error)=> {console.error("nåt gick fel"+error);})

    const booking = require("../models/bookings.js");    


//hämta lediga bord 
router.post("/freetables", async(req, res) => {
    try
    {

        const {bookingDate,numberGuests} = req.body;
        console.log("indata",bookingDate)
        if(!bookingDate || !numberGuests)
        {
            return res.status(400).json({error:"felaktig input"});
        }
        res.status(200).send(await booking.findAvailableTables({bookingDate,numberGuests}));
    }
    catch(error)
    {
        res.status(500).json({error:"Server fel"+error});
    }
});
    
//addera en booking. 
router.post("/booking", async(req, res) => {
    try
    {
        const {tableID, username,bookingDate,numberGuests} = req.body;
        if(!tableID || !username || !bookingDate || !numberGuests)
        {
            return res.status(400).json({error:"felaktig input"});
        }
        
        res.status(201).send(await booking.addBooking({tableID, username,bookingDate,numberGuests}));
    }
    catch(error)
    {
        res.status(500).json({error:"Server fel"+error});
    }
});

//radera en booking. 
router.delete("/booking", async(req, res) => {
    try
    {
        const {tableID, username,bookingDate} = req.body;
        if(!tableID || !username || !bookingDate )
        {
            return res.status(400).json({error:"felaktig input"});
        }
        
        res.status(200).send(await booking.removeBooking({tableID, username,bookingDate}));
    }
    catch(error)
    {
        res.status(500).json({error:"Server fel"+error});
    }
});

//uppdatera existerande
router.put("/booking", async(req, res) => {
    try 
    {
        const { tableID, bookingDate, numberGuests,bookingId } = req.body;

        if (!tableID || !bookingDate || !numberGuests) {
            return res.status(400).json({ error: "felaktig input" });
        }

        const updatedBooking = await booking.updateBooking({ bookingId,tableID, bookingDate, numberGuests });

        if (!updatedBooking) {
            return res.status(404).json({ error: "Bokning existerar inte eller så är bordet upptaget" });
        }
        res.status(200).json(updatedBooking);
    } 

    catch (error) 
    {
        res.status(500).json({ error: "Serverfel: " + error.message });
    }

});



module.exports = router;
