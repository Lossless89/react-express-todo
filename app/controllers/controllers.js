const { User, Card } = require('../db/models.js');

function renderApp(req, res) {
    res.render('index');
}

function userNew(req, res) {
    const payload = req.data;
    if (payload.email && payload.password) {
        const user = new User(payload);
        user
        .save() 
        .then(saved => res.redirect('/'))
    }
    else {
        res.send(400);
    }
}

function userLogin(req, res) {
    const payload = req.data;
    if (payload.email && payload.password) {
        User.authenticate(payload.email, payload.password, (err, user) => {
            if (err) {
              return console.log(err);
            } else {
              req.session.userId = user._id;
              res.redirect('/');
            }
        });
    }
    else {
        res.send(400);
    }
}

function todoNew(req, res) {
    const payload = req.data;
    payload.author = req.session.userId;
    
    if (payload.text && typeof payload.done === 'boolean') {
        const card = new Card(payload);
        card
        .save()
        .then(saved => res.send(saved))
        .catch(e => res.send(500));
    }
    else {
        res.send(400);
    }
}

function todoGetAll(req, res) {
    Card.find({author: req.session.userId})
    .then(data => res.send(data))
    .catch(e => { throw new Error(e) });
}

function todoUpdate(req, res) {
    const payload = req.data;
    if (payload.text && typeof payload.done === 'boolean') {
        Card
        .findById(payload._id)
        .then(card => {
            card.set({text: payload.text, done: payload.done});
            return card.save();
        })
        .then(updated => res.send(updated))
        .catch(e => {
            res.send(500);
        })
    }
    else {
        res.send(400);
    }
}

function todoDelete(req, res) {
    const payload = req.data;
    if (payload._id) {
        Card
        .deleteOne({_id: payload._id})
        .then(deleted => {
            res.send(200);
        })
        .catch(e => {
            res.send(500);
        })
    }
    else {
        res.send(400);
    }
}


module.exports = { renderApp, userNew, userLogin, todoNew, todoGetAll, todoUpdate, todoDelete }