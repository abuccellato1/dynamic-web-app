// REQUIREMENTS
var express         =   require("express"),
    router          =   express.Router(),
    expressSanitizer=   require("express-sanitizer"),
    nodemailer      =   require("nodemailer");
    
// Contact 
router.get("/", function (req, res){
    res.render("contact/index");
});

router.post("/", function (req, res){
   var name = req.sanitize(req.body.name);
   var email = req.sanitize(req.body.email);
   var subject = req.sanitize(req.body.subject);
   var message = req.sanitize(req.body.message);
   console.log(req.body);
   
    var authUser = process.env.EMAIL
    var authPass = process.env.PASS

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: authUser, // user
            pass: authPass // password
        }
    });
    
    // setup email data with unicode symbols
    let mailOptions = {
        from: email, // sender address
        to: 'albuccella@gmail.com', // list of receivers
        subject: subject, // Subject line
        html: '<h2>NEW MESSAGE</h2>' + name + '<br>' + email + '<br>' + message // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.redirect("/contact/thankyou");
    });
});

router.get("/thankyou", function(req,res){
    res.render("contact/thank-you");
});
    
// EXPORT TO ROUTER
module.exports = router;