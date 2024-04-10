var express = require('express');

var app = express();
app.use(express.json());

// TODO: set this up so that it uses the port environment variable
var port = 8086;

function on_ready() {
    console.log("server ready!");
}

// option 2
app.listen(port, () => {
    on_ready() 
});

// Request: POST /businesses - create a business
app.post("", (req, res, next) => {
    res.send()
})

// Request: PUT /businesses/{businessId} - update a business
app.put("", (req, res, next) => {
    res.send()
})

// Request: DELETE /businesses/{id} - delete a business
// Request: GET /businesses - list all businesses
app.get("", (req, res, next) => {
    res.send()
})

// Request: GET /businesses/{id} - list a specific business's details
app.get("", (req, res, next) => {
    res.send()
})

// Request: POST /reviews - create a review of a business
app.post("", (req, res, next) => {
    res.send()
})

// Request: PUT /reviews/{reviewId} - update a review of a business
app.put("", (req, res, next) => {
    res.send()
})

// Request: GET /reviews - list all of a user's reviews
app.get("", (req, res, next) => {
    res.send()
})

// Request: POST /photos - add a photo of a business
app.post("", (req, res, next) => {
    res.send()
})

// Request: DELETE /photos/{photoId} - delete a photo
app.delete("", (req, res, next) => {
    res.send()
})

// Request: PUT /photos/{photoId} - update a photo caption
app.put("", (req, res, next) => {
    res.send()
})

// Request: GET /photos - retrieve photos a user has uploaded
app.get("", (req, res, next) => {
    res.send()
})



/*************************************/

// app.delete("", (req, res, next) => {
//     res.send()
// })

// app.put("", (req, res, next) => {
//     res.send()
// })

// app.post("", (req, res, next) => {
//     res.send()
// })

// app.get("", (req, res, next) => {
//     res.send()
// })


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
