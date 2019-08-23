var mongoose = require("mongoose");

var ServiceSchema = new mongoose.Schema({
   product: String,
   price: String,
   image: String,
   description: String,
   productNumber: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
});


module.exports = mongoose.model("Services", ServiceSchema);