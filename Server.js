/*const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static('Static'))

// app.get('/', (req, res) => {
//
//     res.sendFile(path.join(__dirname, './home.html'));
// })

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port);
})



//signIn
app.post('/signIn', (req, res) => {
    const data = req.body;
    signIn()
})


//SignUp
app.post('/signUp', (req, res) => {
    const data = req.body;
    SignUpFunction()
    console.log(data.email);
})

//Sign-In Function
//Sign-in/up code
var currentUserIndex = -1;
var allUsersPasswords = ["admin"];
var allUsersGender = ["male"];
var allUsersParentEmail = ["holden.bronson07.com"];
var allUsersEmail = ["admin.com"];
var studentNumbers = ["1", 2, 3]

function signIn () {
    var possibleUserEmail = data.email;
    var possiblePassword = data.password;
    var possibleUserIndex = -1;
    var validUserEmail = false;
    var validCorrespondingPassword = false;
    for (var a = 0; a < allUsersEmail.length; a++) {
        if (possibleUserEmail === allUsersEmail[a]) {
            validUserEmail = true;
            possibleUserIndex = a;
            if (possiblePassword === allUsersPasswords[a]) {
                validCorrespondingPassword = true;
            }
        }
    }
    if ((validUserEmail === true) && (validCorrespondingPassword === false)) {
        currentUserIndex = possibleUserIndex;
        window.location.replace("./home.html");
    }
}

function SignUpFunction() {
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
        currentUserIndex = allUsersEmail.length - 1;
    }
}


//Sign-out code
app.post('/signOut', (req, res) => {

})

//Reqest Ride Function
function requestRide () {

}
*/