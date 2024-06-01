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

    const Table = require("../models/table.js");    

//kontroller av indata till API
const validatetableData = () => {
    console.log("kontrollerar data");
    return [
        body('location').custom(value => ["inne", "ute"].includes(value)).withMessage('location måste vara måstem antagligen inne eller ute'),
        body('tableID').custom(value => value != "").withMessage('tableID Får inte vara tomt'),
        body('capacity').isNumeric().custom(value => value > 0).withMessage('capacity måste vara större än 0'),
    ];
};


//addera ett bord. lägg till kontroll av location mer
router.post("/table",validatetableData(), async(req, res) => {
    try
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {tableID, capacity,location} = req.body;
        if(!tableID || !capacity || !location)
        {
            return res.status(400).json({error:"felaktig input"});
        }
        res.status(201).send(await Table.add({ tableID, capacity, location }));
    }
    catch(error)
    {
        res.status(500).json({error:"Server fel"});
    }
});

//radera ett bord. 
router.delete("/table",validatetableData(), async(req, res) => {
    try
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {tableID} = req.body;
        if(!tableID)
        {
            return res.status(400).json({error:"felaktig input"});
        }
        
        res.status(202).send(await Table.removeTable({tableID}));
    }
    catch(error)
    {
        res.status(500).json({error:"Server fel"});
    }
});


//uppdatera ett bord. lägg till kontroll av location mer
router.put("/table",validatetableData(), async(req, res) => {
    try
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const {tableID, capacity,location} = req.body;
        if(!tableID || !capacity || !location)
        {
            return res.status(400).json({error:"felaktig input"});
        }
        const updatetable = await Table.updateTable({tableID,capacity,location});
        if(updatetable)
            res.status(200).send(updatetable);
        else
            res.status(404).json({ message:"saknas angivet bord i databas"});
    }
    catch(error)
    {
        res.status(500).json({error:"Server fel"});
    }
});

//hämta alla bord. 
router.get("/table", async(req, res) => {
    try
    {       
        const tables = await Table.find({});
        res.status(200).json(tables);
    }
    catch(error)
    {
        res.status(500).json({error:"Server fel"});
    }
});







module.exports = router;
