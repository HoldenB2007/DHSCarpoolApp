const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static('Static'))

// app.get('/', (req, res) => {
//
//     res.sendFile(path.join(__dirname, './home.html'));
// })

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port + '/Sign-in.html');
})


var allUsersPasswords = ["admin"];
var allUsersGender = ["male"];
var allUsersParentEmail = ["holden.bronson07.com"];
var allUsersEmail = ["admin.com"];
var studentNumbers = ["1", '2', '3']

app.post('/signIn', (req, res) => {
    console.log(req.body)
    var data = req.body;
    //Sign In
    var possibleUserEmail = data.email;
    var possiblePassword = data.password;
    var validUserEmail = false;
    var validCorrespondingPassword = false;
    for (var a = 0; a < allUsersEmail.length; a++) {
        if (possibleUserEmail === allUsersEmail[a]) {
            validUserEmail = true;
            if (possiblePassword === allUsersPasswords[a]) {
                validCorrespondingPassword = true;
            }
        }
    }
    if ((validUserEmail === true) && (validCorrespondingPassword === false)) {
        window.location.replace("./home.html");
        const bcrypt = require('bcrypt')

        const plaintextPassword = possiblePassword;

// Generate a salt (a random string) to add complexity to the hashing process
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)

// Hash the password using the generated salt
        const hashedPassword = bcrypt.hashSync(plaintextPassword, salt)
        allUsersPasswords.push(hashedPassword);
    }
})


app.post('/signUp', (req, res) => {
    console.log(req.body)
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
            alert("This email already has an account");
        }
    }
    for (var p = 0; p < studentNumbers.length; p++) {
        if (newUserStudentNum === studentNumbers[p]) {
            validStuNum = true;
        }
    }
    if (validStuNum === false) {
        alert("Invalid Student Number");
    }
    if ((validStuNum === true) && (previousUser === false)) {
        allUsersPasswords.push(newUserPassword);
        allUsersGender.push(newUserGender);
        allUsersParentEmail.push(newUserParentEmail);
        allUsersEmail.push(newUserEmail);
        window.location.replace("./home.html");

    }
})