// dependencies
var services     = require("../models/services");

// middleware object
var middlewareObj   = {};

// Is logged in
middlewareObj.isLoggedIn= function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = middlewareObj;