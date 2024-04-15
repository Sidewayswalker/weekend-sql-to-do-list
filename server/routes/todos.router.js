const router = require('express').Router();
const pool = require('../modules/pool');

//! GET - START
router.get('/', (req, res) => {
    console.log('GET /todos!');
    // Here's the SQL query I need to send to the db:
    const sqlText = `
        SELECT * FROM todos
        ORDER BY id;
    `

    // Use our pool object to query thee db:
    pool.query(sqlText)
        .then((dbResult) => {
            let todosWeAskedFor = dbResult.rows;
            res.send(todosWeAskedFor);
        })
        .catch((dbError) => {
            console.log('DB query failed inside GET /todos!');
            console.log('Error is:', dbError);
            res.sendStatus(500);
        })
});


//* GET - END


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

//* POST -END

//! DELETE - START
router.delete('/:todo_id', (req, res) => {
    console.log('req.params is:', req.params);

    const todoIdToDelete = req.params.todo_id;

    const sqlText = `
        DELETE FROM todos
            WHERE id = $1;
    `

    const sqlValues = [todoIdToDelete];

    pool.query(sqlText, sqlValues)
  .then((dbRes) => {
     res.sendStatus(200);
  })
  .catch((dbErr) => {
    console.log('DELETE /todos/:todo_id fail:', dbErr);
    res.sendStatus(500);
  })
})





module.exports = router;
