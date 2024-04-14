const router = require('express').Router();
const pool = require('../modules/pool');

//! GET - START



//! GET - END


//! POST - START
router.post('/', (req, res) => {
    console.log('req.body', req.body);

    const text = req.body.text;

    const sqlText = `
        INSERT INTO "todos"
            (text)
            VALUES 
            ($1);
    `
    const sqlValues = [text];

    // use pool to send this SQL query to our database:
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
        res.sendStatus(201);
        })
        .catch((dbErr) => {
        console.log('Failsauce in POST /todos', dbErr);
        res.sendStatus(500);
        })
});

//! POST -END



module.exports = router;
