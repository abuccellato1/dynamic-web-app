// REQUIREMENTS
var express     =   require("express"),
    router      =   express.Router();

//GET ABOUT PAGE
router.get("/", function (req, res){
   res.render("about/index");
});

//ROUTER EXPORT
module.exports = router;