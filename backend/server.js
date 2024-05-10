const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());


const authRouters = require("./routers/authrouter")
const tableRouters = require("./routers/tablerouter")
const bookingRouters = require("./routers/bookingrouter")
app.use("/api",cors(), authRouters);
app.use("/api",cors(), tableRouters);
app.use("/api",cors(), bookingRouters);
//const courses_protected = require("./routers/workexperience")
//app.use("/api", auth_token,cors(), courses_protected);


//skyddad sida. 
app.get("/api/skyddad", auth_token, (req,res) => {
    return res.status(200).json({message:"Tillgång"});
});


//validera token
function auth_token(req, res, next)
{
    const token = req.headers['authorization'].split(' ')[1];
    if(token == null)
    {
        return res.status(401).json({error:"inte tillgång"});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, username) =>{
        if(err)
        {
            return res.status(401).json({error:"inte tillgång(JWT)"});
        }
        req.username = username;
        next();
    });
}




//Starta server
app.listen(process.env.PORT, () =>{
    console.log("server startad");   
});
