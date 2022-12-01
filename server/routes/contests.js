const express = require('express'); //Line 1
const router = express.Router();
const { client } = require('../server')


// ################ CONTESTS ###############
router.get('/', (req, res) => {
    client.query(`SELECT * FROM contests ORDER BY start_date`, (err, result) => {
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

router.get('/:id', (req, res)=>{
    client.query(`Select * FROM contests WHERE contest_id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

router.post('/', (req, res)=> {
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

module.exports = router;