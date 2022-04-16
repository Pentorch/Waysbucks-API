require("dotenv").config();
// const cors = require('cors')
// const express = require('express')
// require('express-group-routes')
// var bodyParser = require('body-parser')
// const app = express()
// const port = 5000

// app.use(express.json())
// app.use(cors())

// const router = require('./src/routes');
// app.use('/api/v1',router)

const express = require("express");
const cors = require("cors");
const router = require("./src/routes");
const app = express();
// const port = 5000;
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/v1/", router);
// app.use("/uploads", express.static("uploads"));
app.listen(port, () => console.log(`Listening on port ${port}!`));
