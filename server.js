const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const crypto = require('crypto');
const { engine } = require('express-handlebars');
let userInfo = {
    email: '',
    parentEmail: '',
    gender: ''
}
let allRideRequests = [];
let alldriverAcceptedRides = [];
let allConfirmedRides = [];


app.use(express.static('views'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.redirect('sign-in.html' +
        '');
});

function generateSecretKey(length) {
    return crypto.randomBytes(length).toString('hex');
}
const secretKey = generateSecretKey(32);
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
    console.log('Server started at http://localhost:' + port);
})

app.use(bodyParser.urlencoded({ extended: false}))

const adminSaltRounds = 10;
const adminSalt = bcrypt.genSaltSync(adminSaltRounds);
const adminHashedPassword = bcrypt.hashSync('admin', adminSalt);

let allUsersPasswords = [adminHashedPassword];
let allUsersGender = ["male"];
let allUsersParentEmail = ["holden.bronson07.com"];
let allUsersEmail = ["admin@gmail.com"];
let studentNumbers = ["1", '2', '3'];

app.post('/signIn', (req, res) => {
    const { emailSignIn, passwordSignIn } = req.body;
    let userIndex = allUsersEmail.findIndex(email => email === emailSignIn);

    if (userIndex === -1) {
        // Email not found
        return res.send('Account Not Made');
    }

    //check the password
    bcrypt.compare(passwordSignIn, allUsersPasswords[userIndex], function (err, result) {
        if (err) {
            return res.status(500).send('Error during password comparison');
        }

        if (result) {
            // Password matches
            console.log('signed in!');
            req.session.user = {
                email: allUsersEmail[userIndex],
                parentEmail: allUsersParentEmail[userIndex],
                gender: allUsersGender[userIndex]
            };
            return res.redirect('/signedIn');
        } else {
            // Password does not match
            return res.send('Wrong Password');
        }
    });
});


app.post('/signUp', (req, res) => {
    let data = req.body;
    //Sign Up
    let newUserEmail = data.email;
    let newUserPassword = data.password;
    let newUserStudentNum = data.studentNumber;
    let newUserParentEmail = data.parentEmail;
    let newUserGender = data.gender;
    let validStuNum = false;
    let previousUser = false;
    for (let i = 0; i < allUsersEmail.length; i++) {
        if (newUserEmail === allUsersEmail[i]) {
            previousUser = true;
            res.send('Email already in use');
        }
    }
    for (let p = 0; p < studentNumbers.length; p++) {
        if (newUserStudentNum === studentNumbers[p]) {
            validStuNum = true;
        }
    }
    if (validStuNum === false) {
        res.send('Invalid Student Number');
    }
    if ((validStuNum === true) && (previousUser === false)) {
        console.log('valid!')
        allUsersGender.push(newUserGender);
        allUsersParentEmail.push(newUserParentEmail);
        allUsersEmail.push(newUserEmail);
        console.log(allUsersEmail);
        //window.location.assign('./home.handlebars');
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
        res.redirect('/signedIn');
    }
})

app.post('/logout', (req, res) => {
    console.log('logout initiated')
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            res.status(500).send('Error logging out');
        } else {
            // Clear client-side session information (e.g., cookies)
            console.log('logout completed');
            userInfo = {
                email: '',
                parentEmail: '',
                gender: ''
            }
        }
    });
    res.redirect('sign-in.html')
});

app.get('/signedIn', (req, res) => {
    //check is session exists
    if (req.session.user) {
        userInfo = {
            email: req.session.user.email,
            parentEmail: req.session.user.parentEmail,
            gender: req.session.user.gender
        }
        console.log(userInfo);
        console.log('hello user');
        res.redirect('/home');
    }
});

//Nav-Bar directing
app.get('/home', (req, res) => {
    if (req.session.user) {
        res.render('home', {
            userEmail: req.session.user.email
        });
    } else {
        res.send('no user signed in')
    }
});

app.get('/request', (req, res) => {
    if (req.session.user) {
        res.render('request', {

        });
    } else {
        res.send('no user signed in')
    }
});

app.get('/current', (req, res) => {
    if (req.session.user) {
        if (alldriverAcceptedRides[0] === undefined) {
            res.render('current', {
                driverEmailPossible: '',
                riderEmailPossible: '',
                eventPossible: '',
                timeDatePossible: '',
                locationPossible: '',
                paymentPossible: '',
                driverEmailConfirmed: allConfirmedRides[0].driverEmail,
                riderEmailConfirmed: allConfirmedRides[0].riderEmail,
                eventConfirmed: allConfirmedRides[0].event,
                timeDateConfirmed: allConfirmedRides[0].timeDate,
                locationConfirmed: allConfirmedRides[0].location,
                paymentConfirmed: '$' + allConfirmedRides[0].payment
            });
        } else {
            res.render('current', {
                driverEmailPossible: alldriverAcceptedRides[0].driverEmail,
                riderEmailPossible: alldriverAcceptedRides[0].riderEmail,
                eventPossible: alldriverAcceptedRides[0].event,
                timeDatePossible: alldriverAcceptedRides[0].timeDate,
                locationPossible: alldriverAcceptedRides[0].location,
                paymentPossible: '$' + alldriverAcceptedRides[0].payment,
                driverEmailConfirmed: '',
                riderEmailConfirmed: '',
                eventConfirmed: '',
                timeDateConfirmed: '',
                locationConfirmed: '',
                paymentConfirmed: ''
            });
        }
    } else {
        res.send('no user signed in')
    }
});

app.get('/accept', (req, res) => {
    if (req.session.user) {
        if (allRideRequests[0] === undefined) {
            res.render('accept', {
                riderEmail: '',
                event: '',
                timeDate: '',
                location: '',
                payment: ''
            });
        } else {
            res.render('accept', {
                riderEmail: allRideRequests[0].riderEmail,
                event: allRideRequests[0].event,
                timeDate: allRideRequests[0].timeDate,
                location: allRideRequests[0].location,
                payment: '$' + allRideRequests[0].payment
            });
        }
    } else {
        res.send('no user signed in')
    }
});

app.get('/feedback', (req, res) => {
    if (req.session.user) {
        res.render('feedback', {

        });
    } else {
        res.send('no user signed in')
    }
});

//Request Ride
app.post('/requestRide', (req, res) => {
    const requestRideInfo = {
        riderEmail: req.session.user.email,
        driverEmail: '',
        event: req.body.event,
        timeDate: req.body.pickUpTimeDate,
        location: req.body.pickUpLocation,
        payment: req.body.paymentAmount
    };
    allRideRequests.push(requestRideInfo);
    console.log(allRideRequests[0]);
    res.render('request');
});

app.post( '/driverAccept', (req, res) => {
    alldriverAcceptedRides[0] = allRideRequests[0];
    allRideRequests.splice(0,1);
    alldriverAcceptedRides[0].driverEmail = req.session.user.email;
    res.redirect('accept');
});

app.post('/riderAccept', (req, res) => {
    allConfirmedRides[0] = alldriverAcceptedRides[0];
    alldriverAcceptedRides.splice(0,1);
    res.redirect('current');
});


