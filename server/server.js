const express = require('express'); //Line 1
const cors = require('cors')
const bodyParser = require('body-parser');
const { Client } = require('pg')
const bcrypt = require('bcrypt');

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

const hashRounds = 10;
const hashPassword = async (password, rounds) => {
    const hash = await bcrypt.hash(password, rounds)
    // console.log(hash)
    return hash
}


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

app.get('/user/:username', (req, res) => {
  client.query(`Select * FROM userIdByUsernameView WHERE username='${req.params.username}'`, (err, result) => {
    if(!err) {
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

app.post('/users', async (req, res)=> {
    const user = req.body;
    
    if (user.firstname === '' || user.lastname === '') {
        return res.send([false, 'name field cannot be empty'])
    } else if (user.username === '') {
        return res.send([false, 'username cannot be empty'])
    } else if (user.password.length < 8) {
        return res.send([false, 'password needs to be at least 8 characters long!'])
    }

    const hash = await hashPassword(user.password, hashRounds); // the higher the number, the more secure the hash, but also more computation time

    const insertUser = `INSERT INTO users(firstname, lastname, username, password, isadmin) 
                       VALUES('${user.firstname}', '${user.lastname}', '${user.username}', '${hash}', false)`

    client.query(insertUser, (err, result)=>{
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

app.post('/users/:id', (req, res)=> {
    const user = req.body;
    const updateQuery = `UPDATE users SET isadmin = true WHERE user_id = ${req.params.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send([true, 'admin added'])
        }
        else{ 
            res.send([false, err.message])
            console.log(err.message)
        }
    })
    client.end;
})

app.delete('/users/:id', async (req, res)=> {
    const deleteUserContest= `DELETE FROM user_contest WHERE user_id=${req.params.id}`
    await client.query(deleteUserContest)
    const deleteUserComment = `DELETE FROM comments WHERE user_id=${req.params.id}`
    await client.query(deleteUserComment)
    const deleteUsers = `DELETE FROM users WHERE user_id=${req.params.id}`

    client.query(deleteUsers, (err, result)=>{
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

app.post('/problems', async (req, res)=> {
    const problem = req.body;
    const insertProblem = `INSERT INTO problems (problem_name, problem_desc, problem_url) 
                       VALUES('${problem.problemName}', '${problem.problemDesc}', '${problem.problemUrl}') RETURNING problem_id`


    const result = await client.query(insertProblem)
    const problemId = result['rows'][0]['problem_id']

    // console.log('reached', problemId)
    const insertBridge = `INSERT INTO contest_problem (contest_id, problem_id) 
    VALUES (${problem.contestId}, ${problemId})`

    client.query(insertBridge, (err, result)=>{
        if(!err){
            res.send([true, problemId])
        }
        else{ 
            res.send([false, err.message])
            console.log(err.message)
        }
    })

    client.end;
})

app.delete('/problems/:id', (req, res)=> {
    const deleteQuery = `DELETE FROM problems WHERE problem_id=${req.params.id}`

    client.query(deleteQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

// ################ COMMENTS ###############
app.get('/comments/:contest_id', (req, res)=>{
  client.query(`select * from comments inner join users on comments.user_id = users.user_id and comments.contest_id=${req.params.contest_id};`, (err, result)=>{
    if(!err){
        res.send(result.rows);
    }
})
  client.end;
})

app.post('/comments', (req, res)=> {
  const user_id = req.body.user_id;
  const contest_id = req.body.contest_id;
  const comment_desc = req.body.comment_desc;

  const query = `INSERT INTO comments(user_id, contest_id, comment_desc) VALUES(${user_id}, ${contest_id}, '${comment_desc}') RETURNING comment_id`
  client.query(query, (err, result)=>{
    if(!err){
      res.send([true, result['rows'][0]['comment_id']])
    }
    else{ 
        res.send([false, err.message])
        console.log(err.message)
    }
  })
  client.end;
})

app.delete('/comments/:comment_id', (req, res) => {
  client.query(`delete from comments where comment_id=${req.params.comment_id};`, (err, result) => {
    if(!err) 
    {
      res.send('Deletion was successful')
    } 
    else 
    { 
      console.log(err.message) 
    }
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
    client.query(`SELECT * FROM contests WHERE contest_id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/user_contests', (req, res)=>{
    const username = req.query.username;
    client.query(`SELECT contest_id, contest_name, start_date, end_date FROM UserContestView
                    WHERE username='${username}'`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        } else {
            console.log(err)
        }
    });
    client.end;
})

app.post('/contests', (req, res)=> {
    const contest = req.body;
    const insertQuery = `INSERT INTO contests (contest_name, start_date, end_date) 
                       VALUES('${contest.contestName}', '${contest.startDate}', '${contest.endDate}') RETURNING contest_id`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send([true, result['rows'][0]['contest_id']])
        }
        else{ 
            res.send([false, err.message])
            console.log(err.message)
        }
    })

    client.end;
})

app.delete("/contests/:contestid", (req, res) => {
    const contestId = req.params.contestid
    const deleteContest = `DELETE FROM contests WHERE contest_id=${contestId}`

    client.query(deleteContest, (err, result) => {
        if(!err){
            console.log(result)
            res.send("Success")
        }
        else { 
            res.send([false, err.message])
            console.log(err.message)
        }
    })
})

app.put('/editContest/:contestid', (req, res) => {
    const contest = req.body
    const updateQuery = `UPDATE contests SET contest_name='${contest.contestName}', start_date='${contest.startDate}', end_date='${contest.endDate}' WHERE contest_id=${req.params.contestid}`
    client.query(updateQuery, (err, result) => {
        if(!err){
            res.send("Success")
        }
        else { 
            res.send([false, err.message])
            console.log(err.message)
        }
    })

    client.end;
})


// ########## LOGIN ###########
app.post('/login', async (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;

    const query = `SELECT * FROM users WHERE username = '${username}'`
    client.query(query, (err, result)=>{
        if(err){
            res.send(err.message)
        }

        console.log(result)
        if (result.rowCount > 0) {
            bcrypt.compare(password, result.rows[0].password, (err, isMatch) => {
                if (err) {
                    res.send(err.message)
                } else if (isMatch) {
                    res.send([true, 'Login success!', result.rows[0].username, result.rows[0].isadmin])
                } else {
                    res.send([false, 'Wrong username or password.'])
                }
            })
            // res.send([true, 'Login success!', result.rows[0].username, result.rows[0].isadmin])
        }
        else{ 
            res.send([false, 'Wrong username or password.'])
            console.log('Wrong username or password.')
        }
    })
    client.end;
})

app.post('/add_user_contest', (req, res)=> {
    const username = req.body.username
    const contest_id = req.body.contest_id
    // INSERT INTO user_contest (user_id, contest_id) VALUES ((SELECT user_id FROM users WHERE username = 'admin'), contest_id)
    // need to find id with username first

    const query = `INSERT INTO user_contest (user_id, contest_id) VALUES ((SELECT user_id FROM users WHERE username = '${username}'), ${contest_id}) ON CONFLICT (user_id, contest_id) DO NOTHING`

    client.query(query, (err, result)=>{
        if(err){
            res.send(err.message)
        }

        console.log(result)
        if (result.rowCount > 0) {
            res.send([true, 'success!'])
        }
        else{ 
            res.send([false, err])
            console.log(err)
        }
    })
    client.end;
})

app.get('/contestdetails/:id', (req, res)=> {
    const contestid = req.params.id
    const selectProblems = `SELECT problem_id, problem_name, problem_desc, problem_url FROM contest_problem JOIN problems ON contest_problem.problem_id=problems.problem_id WHERE contest_id = ${contestid}`
    console.log(selectProblems)
    client.query(selectProblems, (err, result)=>{
        console.log(result)
        if(err){
            res.send(err.message)
        } else {
            res.send([true, result.rows])
        }
    })
    client.end;
})

const port = process.env.PORT || 3001; //Line 3
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6
