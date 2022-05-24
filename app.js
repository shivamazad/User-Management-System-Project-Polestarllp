const express = require('express');
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const connection = require('./db');
require('./db');



require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Static files
app.use(express.static('public'));

// Templating engine
app.engine('hbs', exphbs.engine( {extname: '.hbs'}));
app.set('view engine', 'hbs');

// Router
app.get('/loginas', (req,res) => {
    res.render('./layouts/login');
});

app.get('/show',(req,res)=>{
    connection.query('select * from user_profile',(err,rows)=>{
        if(err)
        console.log(err);
        else{
            res.render('./layouts/home',{rows});
            console.log(rows);
        }
    })
})
app.listen(port,() => console.log(`listening on port ${port}`));