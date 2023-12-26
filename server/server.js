const express = require("express");
const axios = require("axios");
const config = require("dotenv").config()
const path = require("path");
const app = express();

const router = express.Router();
const URL = process.env.BASE_URL;
const headReqAuth = { headers: { "Authorization": `Bearer ${process.env.API_KEY}` } };
router.use(
    express.urlencoded({
        extended: true
    })
)
router.use(express.json())
router.use((req, res, next) => { // router middleware
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
    next();
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/src", express.static(path.resolve(__dirname, '../src')));
app.use("/style", express.static(path.resolve(__dirname, '../style')));

// simple route
app.get("/", async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.get("/latest", async (req, res) => {
    try {
        let response = await axios.get(URL + "/latest/USD", headReqAuth)
        res.json(response.data);
    } catch (error) {
        res.status(500).send({ error: error });
    }
});

app.get("/conversCurrency", async (req, res) => {
    try {
        let response = await axios.get(URL + "/pair/RUB/USD", headReqAuth);
        res.json(response.data);
    } catch (error) {
        res.status(500).send({ error: error });
    }
});

app.get("/quota", async (req, res) => {
    try {
        let response = await axios.get(URL + "/quota", headReqAuth);
        res.json(response.data);
    } catch (error) {
        res.status(500).send({ error: error });
    }
});

app.get("/getCodes", async (req, res) => {
    try {
        let response = await axios.get(URL + "/codes", headReqAuth);
        res.json(response.data);
    } catch (error) {
        res.status(500).send({ error: error });
    }
});



// set port, listen for requests
app.listen(process.env.PORT, function () {
    console.log(
        "Server is running on port 5000"
    );
});