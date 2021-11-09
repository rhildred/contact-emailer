const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse multipart/form-data

// set up cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const port = process.env.PORT || 3002;


app.post('/send', function (req, res) {
    const response = {
        name: decodeURI(req.body.name),
        email: decodeURI(req.body.email),
        message: decodeURI(req.body.message)
    }
    res.end(`
Thank-you for your message ${req.body.name}
    `);

});

// start the server
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
