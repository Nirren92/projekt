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




module.exports = router;
