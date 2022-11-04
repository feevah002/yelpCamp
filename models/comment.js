const mongoose = require("mongoose");
      
      
let commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        username:String
    }
})
let comment = mongoose.model("comment", commentSchema)

      
module.exports = comment;
 