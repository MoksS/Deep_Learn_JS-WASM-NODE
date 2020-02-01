'use strict';

process.env.NODE_ENV = "production";

const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname,"public")));

const listener = app.listen(3000,(err) =>{
    if (err) console.log(err);

    console.log(`EXPRESS \nserver is listening on ${listener.address().port}`); 
});