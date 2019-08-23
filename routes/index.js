// REQUIREMENTS
var express     =   require("express"),
    router      =   express.Router(),
    passport    =   require("passport"),
    User        =   require("../models/user");

// LANDING
router.get("/", function (req, res){
    res.render("landing");
});

// LOGIN PAGE
router.get("/login", function(req,res){
   res.render("login");
});

// LOGIN LOGIC
router.post("/login", passport.authenticate("local", {
    successRedirect: "/services",
    failureRedirect: "/login"
    }) ,function(req, res){
});

// REGISTER PAGE
router.get("/register", function (req, res){
    res.render("register");
})

// REGISTER LOGIC
router.post("/register", function (req, res){
    var newUser= new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            // DISPLAYS PASSPORT ERROR
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/services/new");
        });
    });
});

// LOGOUT
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});


//ROUTER EXPORT
module.exports = router;