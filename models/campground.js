const mongoose = require("mongoose");
//set up schema/patters
const campSchema = new mongoose.Schema({
    name:String,
    author: {
            id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"User"
                },
            user : String
        },
    image:       String,
    description: String,
    price : Number,
    comments:[
          {
         type: mongoose.Schema.Types.ObjectId,
         ref: "comment"
      }
    ]
});

//set up model
module.exports = mongoose.model("campground", campSchema);