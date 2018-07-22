const express = require('express');
const router = express.Router();
const { 
    renderApp,
    userNew,
    userLogin,
    todoNew,
    todoGetAll,
    todoUpdate,
    todoDelete
} = require('../controllers/controllers');

// render main page
router.get('/', renderApp);
// post data to create new userw
router.post('/user_new', userNew);
// loging user
router.post('/login', userLogin);
// create a new todo note
router.post('/todo_new', todoNew);
// get all notes
router.get('/todos', todoGetAll);
// update note
router.put('/todos/:id', todoUpdate);
// delete note 
router.delete('/todos/:id', todoDelete);

module.exports = router;