const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')

const session = require('express-session')

app.use(express.static('Static'));

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port + '/Sign-in.html');
})

app.use(bodyParser.urlencoded({ extended: false}))

var allUsersPasswords = ["admin"];
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
            console.log('evaluating password');
            bcrypt
                .compare(possiblePassword, allUsersPasswords[a], function (err, result) {
                    if (result) {
                        console.log('signed in!');
                        //session management
                        res.redirect('/home.html')
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
                req.session.save (() => {
                    req.session.logged_in = true;
                    req.session.user = {
                        email: newUserEmail,
                        gender: newUserGender,
                        parentEmail: newUserParentEmail,
                    };
                });
                res.redirect('/home.html');
            }
        })
