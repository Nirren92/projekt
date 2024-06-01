require("dotenv").config();

const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const uri = process.env.URLDB;

const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

//kontroller av indata till API
const validateFoodData = () => {
    console.log("kontrollerar data");
    return [
        body('foodID').isNumeric().custom(value => value > 0).withMessage('foodID måste vara större än 0 och ett nummer'),
        body('group').custom(value => ["förrätt", "huvudrätt", "efterrätt"].includes(value)).withMessage('group måste vara måstem antagligen förrätt,huvudrätt,efterrätt'),
        body('name').custom(value => value != "").withMessage('Får inte vara tomt'),
        body('description').custom(value => value != "").withMessage('description Får inte vara tomt'),
        body('contains').custom((array) => array.every(item => typeof item === 'string')).withMessage('contains måste vara en array med string'),
        body('price').isNumeric().custom(value => value > 0).withMessage('price måste vara större än 0'),
    ];
};

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
router.post("/food", validateFoodData(),async(req, res) => {
    try
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {foodID,group,name,description,contains,price} = req.body;
        if(!foodID || !group || !name || !description ||  !price)
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
router.put("/food",validateFoodData(), async(req, res) => {
    try
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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
