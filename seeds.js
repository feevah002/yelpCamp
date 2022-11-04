const mongoose = require("mongoose"),
      campground = require("./models/campground"),
      comment = require("./models/comment");
let data = [
        {
            name:"feevah camp", 
            image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris enim, venenatis et sem nec, sagittis posuere turpis. Vivamus posuere arcu felis, in ornare urna mattis et. Morbi placerat nisl lacus, id accumsan quam placerat quis. Etiam urna orci, pellentesque sit amet varius eget, tempor a leo. Quisque a cursus arcu, nec dapibus justo. Vestibulum molestie risus turpis, eu consectetur turpis tincidunt sed. Curabitur ac nunc dignissim, commodo mi sed, pretium augue. Morbi ut eros quis ante luctus cursus."
        },
        {
            name:"charizma camp",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ93MWgE9aT7WBqOhIqbApvw-kCKxwBzrIiIWOaR16f&s",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris enim, venenatis et sem nec, sagittis posuere turpis. Vivamus posuere arcu felis, in ornare urna mattis et. Morbi placerat nisl lacus, id accumsan quam placerat quis. Etiam urna orci, pellentesque sit amet varius eget, tempor a leo. Quisque a cursus arcu, nec dapibus justo. Vestibulum molestie risus turpis, eu consectetur turpis tincidunt sed. Curabitur ac nunc dignissim, commodo mi sed, pretium augue. Morbi ut eros quis ante luctus cursus."
        },
        {
            name:"danny's camp", 
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYUZU-KmW9AjtmpKh7m8nvw7QyDLwtrCYrt2-pkBGh&s",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris enim, venenatis et sem nec, sagittis posuere turpis. Vivamus posuere arcu felis, in ornare urna mattis et. Morbi placerat nisl lacus, id accumsan quam placerat quis. Etiam urna orci, pellentesque sit amet varius eget, tempor a leo. Quisque a cursus arcu, nec dapibus justo. Vestibulum molestie risus turpis, eu consectetur turpis tincidunt sed. Curabitur ac nunc dignissim, commodo mi sed, pretium augue. Morbi ut eros quis ante luctus cursus."
        }
    ];

// function seedDB(){
//     //remove alll campgrounds
//   campground.deleteMany({}, function(err){
//         if(err){console.log(err)}
//         else{console.log("removed campground")}
//           //add a few campgrounds
//         data.forEach(seed => {
//             campground.create(seed, function(err, data){
//                 if(err){console.log(err)}
//                 else{console.log("added a campground")
//                 //add a comment
//                         comment.create({
//                             text:"this place is great, but i won't recommend for anyone with cat allergy",
//                             author:"feevah"
//                         },  function(err, comment){
//                             if(err){console.log(err)}
                            
//                             else{
//                                     data.comments.push(comment)
//                                     data.save();
//                                     console.log("created new comment")
//                                 }
//                             })
                    
//                     }
//         });
//     })
//     }) ;
// }  
function seedDB (){
    // delete everything in campgrounds db
    campground.deleteMany({}, function(err){
        if(err){console.log(err)}
        else{
            console.log("campgrounds deleted")}
        
        // call each object in the data list
        data.forEach(camp=>{
            //use each object to create data in ths db
            campground.create(camp, function(err, created){
                if(err){console.log(err)}
                else{
                    console.log("created a campground")
                    //create comments
                    comment.create({
                            text:"this place is great, but i won't recommend for anyone with cat allergy",
                            author:"feevah"
                        },  function(err, commentC){
                        if(err){console.log(err)}
                        else{
                            console.log("created a comment")
                            created.comments.push(commentC)
                            created.save()
                        }
                    })
                }
            })
        })
            
    })
}

module.exports= seedDB;