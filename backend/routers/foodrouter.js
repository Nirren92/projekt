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
 
    const Food = require("../models/food");


//hämta alla maträtter 
router.get("/food", async(req, res) => {
    try
    {
        res.status(200).send(await Food.getFood());
    }
    catch(error)
    {
        res.status(500).json({error:"Server fel"+error});
    }
});

//addera en maträtt. 
router.post("/food", async(req, res) => {
    try
    {
        const {foodID,group,name,description,contains,price} = req.body;
        if(!foodID || !group || !name || !description || !contains || !price)
        {
            return res.status(400).json({error:"felaktig input"});
        }
        
        res.status(201).send(await Food.addFood({foodID,group,name,description,contains,price}));
    }
    catch(error)
    {
        res.status(500).json({error:"Server fel"+error});
    }
});

// radera en maträtt. 
router.delete("/food", async(req, res) => {
    try
    {
        const {foodID} = req.body;
        if(!foodID)
        {
            return res.status(400).json({error:"felaktig input"});
        }
        
        res.status(201).send(await Food.removeFood({foodID}));
    }
    catch(error)
    {
        res.status(500).json({error:"Server fel"+error});
    }
});


//uppdatera en maträtt. 
router.put("/food", async(req, res) => {
    try
    {
        const {foodID,group,name,description,contains,price} = req.body;
        if(!foodID || !group || !name || !description || !contains || !price)
        {
            return res.status(400).json({error:"felaktig input"});
        }
        
        res.status(201).send(await Food.updateFood({foodID,group,name,description,contains,price}));
    }
    catch(error)
    {
        res.status(500).json({error:"Server fel"+error});
    }
});


module.exports = router;
