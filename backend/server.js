const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());


const authRouters = require("./routers/authrouter")
const tableRouters = require("./routers/tablerouter")
const bookingRouters = require("./routers/bookingrouter")
const foodRouters = require("./routers/foodrouter")
const protectedfoodRouters = require("./routers/protectedfoodrouter")

app.use("/api",cors(), authRouters);


app.use("/api",cors(), bookingRouters);
app.use("/api",cors(), foodRouters);

app.use("/apiprotected",auth_token,cors(), protectedfoodRouters);
app.use("/apiprotected",auth_token,cors(), tableRouters);


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
            return res.status(401).json({error:"inte tillgång"});
        }

        const usernameres = decodedToken.username;


        if (usernameres !== 'admin') {
            return res.status(403).json({ error: "Endast admin har tillgång" });
        }
        
        req.username = username;
        next();
    });
}




//Starta server
app.listen(process.env.PORT, () =>{
    console.log("server startad");   
});
