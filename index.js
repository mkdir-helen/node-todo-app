require('dotenv').config();
const express = require('express');
const Todo = require('./models/Todo');
const User = require('./models/User');
const app = express();
const bodyParser = require('body-parser');
const page = require('./views/page');
const userList = require('./views/userList');
const userForm = require('./views/userForm');

app.use(express.static('public'));

//Configure body-parser to read data sent by HTML form tags
app.use(bodyParser.urlencoded({ extended: false }));

// Configure body-parser to read JSON bodies
app.use(bodyParser.json());


app.get('/', (req, res) => {
    const thePage = page('hey there');
    res.send(thePage);
})


//Listen for a GET request
app.get('/users', (req, res) => {
    User.getAll()
        .then(allUsers => {
            // res.send(allUsers);
            const usersUL = userList(allUsers);
            const thePage = page(usersUL);
            res.send(thePage);
            // res.send(page(userList(allUsers)));
        })
});

//Listen for POST requests
app.post('/users', (req, res) => {
    const newUsername = req.body.name;
    User.add(newUsername)
        .then(theUser => {
            res.send(theUser);
        })
});
//Process the form for editing one user's info
app.post('/users/:id([0-9]+)/edit', (req, res) => {
    const id = req.params.id;
    const newName = req.body.name;
    //Get the user by their id
    User.getById(id)
        .then(theUser => {
            //call that user's updateName method
            theUser.updateName(newName)
                .then(didUpdate => {
                    if (didUpdate){
                        // res.send("Yeah you did");
                        // res.redirect(`/users/${id}/edit`);
                        res.redirect(`/users/`);
                    }else{
                        res.send("oops");
                    }
                });
        });
});

//GET the form for editing one user's info
app.get(`/users/:id([0-9]+)/edit`, (req, res) => {
    // console.log(req.params.id);
    User.getById(req.params.id)
        .catch(err => {
            res.send({
                message: `no soup for you`
            });
        })
        .then(theUser => {
            res.send(page(userForm(theUser)));
        })
});

//Retrieve one user's info
app.get(`/users/:id([0-9]+)`, (req, res) => {
    // console.log(req.params.id);
    User.getById(req.params.id)
        .catch(err => {
            res.send({
                message: `no soup for you`
            });
        })
        .then(theUser => {
            res.send(page(userForm(theUser)));
        })
});

app.get(`/users/:id(\\d+)/todos`, (req, res) => {
    User.getById(req.params.id)
        .then(theUser => {
            theUser.getTodos()
                .then(allTodos => {
                    const todosUL = todoList(allTodos);
                    const thePage = page(todosUL);
                    res.send(thePage);
                })
        })
});

app.get('/users/register', (req, res) => {
    res.send('you are on the registration page. no really.');
});

app.get('/users/:id(\\d+)/rename/:newName', (req, res) => {
    User.getById(req.params.id)
        .then(user => {
            user.updateName(req.params.newName)
                .then(() => {
                    res.send('you just renamed them!');
                })
        })
});

app.listen(3000, () => {
    console.log('You express app is ready!');
});
