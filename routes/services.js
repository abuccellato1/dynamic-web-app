// REQUIREMENTS
var express     =   require("express"),
    router      =   express.Router(),
    Services    =   require("../models/services"),
    Users       =   require("../models/user"),
    middleware  =   require("../middleware");

// GET Services index
router.get("/", function(req,res){
    // find all services
    Services.find({}, function(err, allServices){
        if(err){
            console.log(err);
        } else{
            // this is index because lots of paths are derived from it (landing pages are separate entities)
            res.render("services/index",{Services: allServices});
        }
    });
});

// GET CREATE PAGE
router.get("/create", middleware.isLoggedIn, function(req,res){
   res.render("services/create");
});

// CREATE THE SERVICE (POST ROUTE)
router.post("/", middleware.isLoggedIn, function(req,res){
    var product         =   req.body.product;
    var image           =   req.body.image;
    var description     =   req.body.description;
    var productNumber   =   req.body.productNumber;
    var price           =   req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    // link dB to post values
    var newService= {product:product, image:image, description:description, price:price, productNumber:productNumber, author:author};
    Services.create(newService, function(err, newlyCreated) {
        if (err){
            console.log(err);
        }else{
            console.log(newService);
            res.redirect("/services");
        }
    });
});

// GET THE EDIT PAGE
router.get("/:id/edit", middleware.isLoggedIn, function(req,res){
    Services.findById(req.params.id, function(err, foundService){
        res.render("services/edit", {Services: foundService});
    });
});

// POST THE EDIT PAGE
router.put("/:id", middleware.isLoggedIn, function(req, res){
    // find and update
    Services.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedService){
        if(err){
            res.redirect("/services");
        }else{
            res.redirect("/services/" + req.params.id);
        }
    });
});

// Show a specific service on a new page
router.get("/:id", function(req,res){
    // find posts by mongoDB ID
    Services.findById(req.params.id, function(err, foundService){
        if(err){
            console.log(err);
        } else{
            res.render("services/show", {services: foundService});
        }
    });
});

// EXPORT TO ROUTER
module.exports = router;

