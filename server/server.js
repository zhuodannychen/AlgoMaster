const express = require('express'); //Line 1
const cors = require('cors')
const bodyParser = require('body-parser');
const { Client } = require('pg')

// const users = require("./routes/users")
// const contests = require("./routes/contests")

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

// use these routes
// app.use("/users", users)
// app.use("/contests", contests)

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
    const insertQuery = `INSERT INTO users(firstname, lastname, username, password, isadmin) 
                       VALUES('${user.firstname}', '${user.lastname}', '${user.username}', '${user.password}', false)`
    
    if (user.firstname === '' || user.lastname === '') {
        return res.send([false, 'name field cannot be empty'])
    } else if (user.username === '') {
        return res.send([false, 'username cannot be empty'])
    } else if (user.password.length < 8) {
        return res.send([false, 'password needs to be at least 8 characters long!'])
    }

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


// ################ Problems ###############
app.get('/problems', (req, res) => {
    client.query(`SELECT * FROM problems`, (err, result) => {
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/problems/:id', (req, res)=>{
    client.query(`Select * FROM problems WHERE problem_id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.post('/problems', (req, res)=> {
    const problem = req.body;
    const insertQuery = `INSERT INTO problems (problem_name, problem_desc, problem_url) 
                       VALUES('${problem.problemName}', '${problem.problemDesc}', '${problem.problemUrl}') RETURNING problem_id`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send([true, result['rows'][0]['problem_id']]) // send back id generated in psql serial id
        }
        else{ 
            res.send([false, err.message])
            console.log(err.message)
        }
    })
    client.end;
})

app.delete('/problems/:id', (req, res)=> {
    const insertQuery = `DELETE FROM problems WHERE problem_id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})



// ################ CONTESTS ###############
app.get('/contests', (req, res) => {
    client.query(`SELECT * FROM contests ORDER BY start_date`, (err, result) => {
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/contests/:id', (req, res)=>{
    client.query(`Select * FROM contests WHERE contest_id=${req.params.id}`, (err, result)=>{
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

    const curDate = new Date(Date.now())
    const curTS = curDate.getUTCFullYear() + '-' + (curDate.getUTCMonth()+1) + '-' + curDate.getUTCDate() + ' ' + curDate.getUTCHours() + ':' + curDate.getMinutes() + ':' + curDate.getSeconds()
    if (contest.contestName == '') {
        return res.send([false, 'Contest name cannot be empty!'])
    } else if (contest.endDate <= contest.startDate) {
        return res.send([false, 'end time before start time!'])
    } else if (contest.startDate < curTS) {
        return res.send([false, 'start time is before current time!'])
    }


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


// ########## LOGIN ###########
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


const port = process.env.PORT || 3001; //Line 3
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6
