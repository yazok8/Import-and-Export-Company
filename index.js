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
        host: "smtp.yandex.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'ykhirfan@yandex.com', // generated ethereal user
            pass: 'Lifofifo10' // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let mailOptions = {
        from: '"Nodemailer Contact 👻" <ykhirfan@yandex.com, // sender address"',
        to: "tio.uk@msn.com", // list of receivers
        subject: "Node Contact Request ✔", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
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

// var name = $('.name').val()
// var email = $('.email').val()
//  var phoneNumber = $('.phone').val()
//  var message = $('.message').val()
//  var statusElement = $('.status')
//  statusElement.empty()

//  var data = {
//     members: [{
//             email_address: email,
//             status: "subscribed",
//             merge_fields: {
//                 FNAME: firstName,
//                 LNAME: lastName
//             }
//         }

//     ]
// };

// // console.log("It works!");

// // $(document).ready(function() {
// //     $('.btnContact').click(function(event) {


// //         console.log('button clicked');

// //         var name = $('.name').val()
// //         var email = $('.email').val()
// //         var phoneNumber = $('.phone').val()
// //         var message = $('.message').val()
// //         var statusElement = $('.status')
// //         statusElement.empty()

// //         if (email.length > 5 && email.includes('@') && email.includes('.')) {
// //             statusElement.append('<div>Email is valid</div>')

// //         } else {
// //             event.preventDefault()
// //             statusElement.append('<div>Email is not valid</div>')
// //         }

// //         if (phoneNumber.length > 6) {
// //             statusElement.append('<div>Phone number is valid</div>')
// //         } else {
// //             event.preventDefault()
// //             statusElement.append('<div>Phone number is not valid</div>')
// //         }

// //         if (message.length > 20) {

// //             statusElement.append('<div>message is valid</div>')
// //         } else {
// //             event.preventDefault()
// //             statusElement.append('<div>Message is not valid</div>')
// //         }

// //     })

// // });



app.listen(3000, function() {

    console.log("Server is running on port 3000.");
});