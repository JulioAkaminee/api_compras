require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const getdata = require("./src/routes/produtos");


const app = express();

const port = 3050;

app.use(express.json());


app.use('/api/produtos', getdata);


app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });