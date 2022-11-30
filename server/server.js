const express = require('express'); //Line 1
const cors = require('cors')
const bodyParser = require('body-parser');
const { Client } = require('pg')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express(); 
app.use(cors())
app.use(bodyParser.json());

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

client.connect()

// ################## USERS ##############
app.get('/users', (req, res) => {
    client.query(`SELECT * FROM users`, (err, result) => {
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/users/:id', (req, res)=>{
    client.query(`Select * FROM users WHERE user_id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.post('/users', (req, res)=> {
    const user = req.body;
    const insertQuery = `INSERT INTO users(username, password) 
                       VALUES('${user.username}', '${user.password}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send([true, 'User registered successfully!'])
        }
        else{ 
            res.send([false, err.message])
            console.log(err.message)
        }
    })
    client.end;
})

app.delete('/users/:id', (req, res)=> {
    const insertQuery = `DELETE FROM users WHERE user_id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.post('/login', (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;

    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`
    client.query(query, (err, result)=>{
        if(err){
            res.send(err.message)
        }

        console.log(result)
        if (result.rowCount > 0) {
            res.send([true, 'Login success!'])
        }
        else{ 
            res.send([false, 'Wrong username or password.'])
            console.log('Wrong username or password.')
        }
    })
    client.end;
})

// ################ CONTESTS ###############

app.get('/contests', (req, res) => {
    client.query(`SELECT * FROM contests`, (err, result) => {
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/contests/:id', (req, res)=>{
    client.query(`Select * FROM contests WHERE conest_id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.post('/contests', (req, res)=> {
    const contest = req.body;
    const insertQuery = `INSERT INTO contests (contest_name, start_date, end_date) 
                       VALUES('${contest.contestName}', '${contest.startDate}', '${contest.endDate}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send([true, 'Contest added successfully!'])
        }
        else{ 
            res.send([false, err.message])
            console.log(err.message)
        }
    })
    client.end;
})


const port = process.env.PORT || 3001; //Line 3
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6