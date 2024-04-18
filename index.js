const express = require("express");
const mongoose = require("mongoose")
const router = require("./src/routes/pets.routes");
require("dotenv").config();


const app = express();
const port = process.env.PORT || 8080;

//? middleware
app.use(express.json());
app.use('/api', router);



//?CONEXIÓN MONGO DB

mongoose.connect(process.env.MONGODB_URI)
.then(() => {console.log("BD connected")})
.catch(error => console.error(error));

//?*********************************

app.listen(port, () => {
  console.log("Server run on port", port);
});

