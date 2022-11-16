const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000;
// database name
const DB = "pets"

// middleware
app.use(cors())
app.use(express.json(), express.urlencoded({extended:true}));

// connect to the DB w/ mongoose
require("./config/mongoose.config")(DB)

// modularize routes
require("./routes/pet.routes")(app)

// start the server
app.listen(PORT, () => console.log(`>>> The server is up on ${PORT} <<<`));