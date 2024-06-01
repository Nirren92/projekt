require("dotenv").config();

const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const uri = process.env.URLDB;

const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const { body, validationResult } = require('express-validator');

mongoose
    .connect(uri)
    .then(() => {console.log("Ansluten till mongodb");})
    .catch((error)=> {console.error("nåt gick fel"+error);})

    const booking = require("../models/bookings.js");    



    //kontroller av indata till API
const validatebookingData = () => {
    console.log("kontrollerar data");
    return [
        body('tableID').custom(value => value != "").withMessage('tableID Får inte vara tomt'),
        body('numberGuests').isNumeric().custom(value => value > 0).withMessage('numberGuests måste vara större än 0'),
        body('username').custom(value => value != "").withMessage('username Får inte vara tomt'),
        body('bookingDate').custom(value =>{
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                throw new Error('Ogiltigt datum');
            }
            return true;
        }).withMessage('Ogiltigt datum'),
        
    
    ];
};

//hämta lediga bord 
router.post("/freetables",validatebookingData(), async(req, res) => {
    try
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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
router.post("/booking",validatebookingData(), async(req, res) => {
    try
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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
router.delete("/booking",validatebookingData(), async(req, res) => {
    try
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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
router.put("/booking",validatebookingData(), async(req, res) => {
    try 
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
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
