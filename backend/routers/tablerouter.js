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

    const Table = require("../models/table.js");    

//addera ett bord. lägg till kontroll av location mer
router.post("/table", async(req, res) => {
    try
    {
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
router.delete("/table", async(req, res) => {
    try
    {
       
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
router.put("/table", async(req, res) => {
    try
    {
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
