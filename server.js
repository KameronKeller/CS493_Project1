var express = require('express');

var app = express();
app.use(express.json());

// TODO: set this up so that it uses the port environment variable
var port = 8086;

// option 2
app.listen(port, () => {
    on_ready() 
});

// Request: POST /businesses - create a business
// Request: PUT /businesses/{businessId} - update a business
// Request: DELETE /businesses/{id} - delete a business
// Request: GET /businesses - list all businesses
// Request: GET /businesses/{id} - list a specific business's details

// Request: POST /reviews - create a review of a business
// Request: PUT /reviews/{reviewId} - update a review of a business
// Request: GET /reviews - list all of a user's reviews

// Request: POST /photos - add a photo of a business
// Request: DELETE /photos/{photoId} - delete a photo
// Request: PUT /photos/{photoId} - update a photo caption
// Request: GET /photos - retrieve photos a user has uploaded



// // Handle certain API endpoints
// app.get("/messages", (req, res, next) => {
//     res.send(messages)
// })

// app.post("/messages", (req, res, next) => {
//     const index = messages.length
//     messages.push(req.body)
//     console.log(req.body)
//     res.send({
//         "index": index,
//         "links": {
//             "message": `/messages/${index}`
//         }
//     })
// })

// app.get("/messages/:index", (req, res, next) => {
//     const index = req.params.index

//     if (index < 0 || index >= messages.length) {
//         res.status(404).send({"error": `Message ${index} not found`});

//         // Do what is next in expresses chain of functions
//         next();
//     }

//     res.send(messages[req.params.index])
// })
