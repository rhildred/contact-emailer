let auth = {
    type: "oauth2",
    user: process.env.USER,
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    refreshToken: process.env.REFRESHTOKEN
}
try{
    auth = require('./creds.json');
    console.log("getting credentials from ./creds.json");
}catch(e){
    console.log(e.toString());
    console.log("getting creds from environment variables");
}

const nodemailer = require('nodemailer');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse multipart/form-data
app.use(multer({ dest: __dirname + '/file/uploads/' }).any());

// set up cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const port = process.env.PORT || 3002;


app.post('/send', function (req, res) {
    const response = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    }

    const mailOptions = {
        from: response.name,
        "reply-to": response.email,
        to: auth.user,
        subject: 'My site contact from: ' + response.name,
        text: req.body.message,
        html: 'Message from: ' + response.name + '<br></br> Email: ' + response.email + '<br></br> Message: ' + response.message,
    }; 
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: auth,
    }); 
    transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            return console.log(err);
        } else {
            console.log(JSON.stringify(response));
            res.end("thank-you for your message");
        }
    });
})

// start the server
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
