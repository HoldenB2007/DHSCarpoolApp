


//Sign-in/up code
var currentUserIndex = -1;
var allUsersPasswords = ["password123"];
var allUsersGender = ["male"];
var allUsersParentEmail = ["bronsonbrett518@gmail.com"];
var allUsersEmail = ["holdenbronson@gmail.com"];
var studentNumbers = ["1", 2, 3]

function signIn () {
    var possibleUserEmail = document.getElementById("email-input-sign-in").value;
    var possiblePassword = document.getElementById("password-input-sign-in").value;
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

function SignUpFunction () {
    var newUserEmail = document.getElementById("email-input-sign-up").value;
    var newUserPassword = document.getElementById("password-input-sign-up").value;
    var newUserStudentNum = document.getElementById("sign-up-student-number").value;
    var newUserParentEmail = document.getElementById("sign-up-parent-email").value;
    var newUserGender = document.getElementById("Birth-Assigned-Sex").value;
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
function signout () {
    window.location.replace("./Sign-in.html");
    currentUserIndex = -1;
}


//Reqest Ride Function
function requestRide () {

}