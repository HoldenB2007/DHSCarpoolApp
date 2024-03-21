const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const crypto = require('crypto')

function generateSecretKey(length) {
    return crypto.randomBytes(length).toString('hex');
}
const secretKey = generateSecretKey(32);

app.use(express.static('Static'));
app.use(cookieParser());
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, //set to true once using a https
        maxAge: 24 * 60 * 60 * 1000 //session expiry time in millisecond (optional)
    }
}));
app.listen(port, () => {
    console.log('Server started at http://localhost:' + port + '/Sign-in.html');
})

app.use(bodyParser.urlencoded({ extended: false}))

const adminSaltRounds = 10;
const adminSalt = bcrypt.genSaltSync(adminSaltRounds);
const adminHashedPassword = bcrypt.hashSync('admin', adminSalt);

var allUsersPasswords = [adminHashedPassword];
var allUsersGender = ["male"];
var allUsersParentEmail = ["holden.bronson07.com"];
var allUsersEmail = ["admin@gmail.com"];
var studentNumbers = ["1", '2', '3'];

app.post('/signIn', (req, res) => {
    const data = req.body;
    //Sign In
    var possibleUserEmail = data.emailSignIn;
    const possiblePassword = data.passwordSignIn;
    var validCorrespondingPassword = false;
    for (var a = 0; a < allUsersEmail.length; a++) {
        if (possibleUserEmail === allUsersEmail[a]) {
            const userIndex = a;
            console.log('evaluating password');
            bcrypt
                .compare(possiblePassword, allUsersPasswords[a], function (err, result) {
                    if (result) {
                        console.log('signed in!');
                        //session management
                        req.session.user = {
                            email: allUsersEmail[userIndex],
                            parentEmail: allUsersParentEmail[userIndex],
                            gender: allUsersGender[userIndex]
                        }
                        res.redirect('/');
                    }
                });
        }
    }
})

app.post('/signUp', (req, res) => {
    var data = req.body;
    //Sign Up
    var newUserEmail = data.email;
    var newUserPassword = data.password;
    var newUserStudentNum = data.studentNumber;
    var newUserParentEmail = data.parentEmail;
    var newUserGender = data.gender;
    var validStuNum = false;
    var previousUser = false;
    for (var i = 0; i < allUsersEmail.length; i++) {
        if (newUserEmail === allUsersEmail[i]) {
            previousUser = true;
            res.send('Email already in use');
        }
    }
    for (var p = 0; p < studentNumbers.length; p++) {
        if (newUserStudentNum === studentNumbers[p]) {
            validStuNum = true;
        }
    }
    if (validStuNum === false) {
        res.send('Invalid Student Number');
    }
    if ((validStuNum === true) && (previousUser === false)) {
        allUsersGender.push(newUserGender);
        allUsersParentEmail.push(newUserParentEmail);
        allUsersEmail.push(newUserEmail);
        //window.location.assign('./home.html');
        const plaintextPassword = newUserPassword;
        // Generate a salt (a random string) to add complexity to the hashing process
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)
        // Hash the password using the generated salt
        const hashedPassword = bcrypt.hashSync(plaintextPassword, salt)
        allUsersPasswords.push(hashedPassword);
        //session management
        req.session.user = {
            email: newUserEmail,
            parentEmail: newUserParentEmail,
            gender: newUserGender
        }
        res.redirect('/');
    }
})

app.post('/logout', (req, res) => {
    console.log('logout initiated')
    const data = 'hello';
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            res.status(500).send('Error logging out');
        } else {
            // Clear client-side session information (e.g., cookies)
            console.log('logout completed');
            res.clearCookie('sessionID');
        }
    });
});

app.get('/', (req, res) => {
    //check is session exists
    if (req.session.user) {
        //res.send(`Welcome ${req.session.user.email}!`);
        console.log('hello ' + req.session.user.email);
        res.redirect('/home.html');
    }
})

app.get('/api/data', (req, res) => {
    const data = 'what is up ' + req.session.user.email;
    console.log('front-end communication');
    res.json(data);
})
/*
function signedIn (email) {
    const newDiv = document.createElement('div');
    const newContent = document.createTextNode('Hi there, ' + email);
    newDiv.appendChild(newContent);
}
*/
/*Trash
app.get('/loadCurrent', (req, res) => {
    console.log('step 2 started')
})
*/