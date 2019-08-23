// REQUIREMENTS
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    methodOverride  = require("method-override"),
    nodemailer      = require("nodemailer"),
    expressSanitizer= require("express-sanitizer"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local");

// MODELS
var Services        = require("./models/services"),
    User           = require("./models/user");

// ROUTES LOCATIONS
var indexRoutes     = require("./routes/index"),
    contactRoutes   = require("./routes/contact"),
    aboutRoutes     = require("./routes/about"),
    servicesRoutes  = require("./routes/services");

// SETUP 
mongoose.connect("mongodb://localhost/goodfellas");
// mongoose.connect(process.env.MONGO);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(expressSanitizer());

// PASSPORT LOGIC
app.use(require("express-session")({
    secret: "testsecret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// reading session, encoding and uncoding for log ins (passport-local-mongoose does that for you)
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser  = req.user;
    // GO TO NEXT STEP
    next();
});

// ROTUES INDEX
app.use("/", indexRoutes);
app.use("/contact", contactRoutes);
app.use("/about", aboutRoutes);
app.use("/services", servicesRoutes);


// PORT INFORMATION
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server Has Started!!!");
});