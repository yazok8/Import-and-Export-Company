const express = require("express");
const bodyParser = require("body-parser");
//step4
const request = require("request");
const exphbs = require("express-handlebars");
const path = require('path');
const nodemailer = require("nodemailer");

const app = express();

// to view engine setup

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//we have to let expess know that we are using public file for the css and images for the website.btnContact.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {

    res.render('homepage', { layout: false });
});

app.post("/send", function(req, res) {

    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
    <li> Name: ${req.body.name}</li>
    <li> Email: ${req.body.email}</li>
    <li> Phone number: ${req.body.phone}</li>
    </ul>;
    <h3> Message: </h3>
    <p>${req.body.message}</p>
    `;

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 465,
        secure: true,
        auth: {
            user: 'testAccount.user',
            pass: 'testAccount.pass'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let mailOptions = {
        from: 'Fred Foo 👻" <foo@example.com>',
        to: "bar@example.com, baz@example.com",
        subject: "Hello ✔",
        text: "Hello world?",
        html: output
    };
    transporter.sendMail(mailOptions, function(error, res) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + res.message);
            response.json(res.message);
        }
        transporter.close();
    });
    res.render('homepage', { layout: false, msg: 'Email has been sent' });




});

app.listen(process.env.PORT || 3000, function() {

    console.log("Server is running on port 3000.");
});