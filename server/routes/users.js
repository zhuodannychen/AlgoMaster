const express = require('express'); //Line 1
const router = express.Router();
const { Client } = require('pg')

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  })
  

// ################## USERS ##############
router.get('/', (req, res) => {
    client.query(`SELECT * FROM users`, (err, result) => {
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

router.get('/:id', (req, res)=>{
    client.query(`Select * FROM users WHERE user_id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

router.post('/', (req, res)=> {
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

router.delete('/:id', (req, res)=> {
    const insertQuery = `DELETE FROM users WHERE user_id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

module.exports = router;