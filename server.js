var express = require('express');

var app = express();
app.use(express.json());

// TODO: set this up so that it uses the port environment variable
var port = 8086;

let businesses = []


function on_ready() {
    console.log("server ready!");
} 

app.listen(port, () => {
    on_ready() 
});

// Request: POST /businesses - create a business
app.post("/businesses", (req, res) => {
    if (
        req.body.name &&
        req.body.streetAddress &&
        req.body.city &&
        req.body.state &&
        req.body.zipCode &&
        req.body.phoneNumber &&
        req.body.category &&
        req.body.subcategories
    ) {
        const index = businesses.length
        businesses.push(req.body)
        res.send({
            "businessId": index,
            "businessHref": `/businesses/${index}`
        })
    } else {
        res.status(400).send(
            "Error 400: Missing necessary fields"
        )
    }
})

// Request: PUT /businesses/{businessId} - update a business
app.put("/businesses/:businessId", (req, res) => {
    const businessId = req.params.businessId
    if (businessId > businesses.length || businessId < 0) {
        res.status(400).send(
            "Error 400: Specified resource does not exist"
        )
    } else if (
        req.body.name &&
        req.body.streetAddress &&
        req.body.city &&
        req.body.state &&
        req.body.zipCode &&
        req.body.phoneNumber &&
        req.body.category &&
        req.body.subcategories
    ) {
        businesses[businessId] = req.body
        res.send({
            "businessId": businessId,
            "businessHref": `/businesses/${businessId}`
        })
    } else {
        res.status(400).send(
            "Error 400: Missing necessary fields"
        )
    }
})

// Request: DELETE /businesses/{id} - delete a business
app.delete("/businesses/:businessId", (req, res) => {
    const businessId = req.params.businessId
    if (businessId > businesses.length || businessId < 0) {
        res.status(400).send(
            "Error 400: Specified resource does not exist"
        )
    } else {
        businesses.splice(businessId, 1)
        res.sendStatus(200);
    }
})

// Request: GET /businesses - list all businesses
app.get("", (req, res, next) => {
    res.send()
})

// Request: GET /businesses/{id} - list a specific business's details
app.get("", (req, res, next) => {
    res.send()
})

// Request: POST /reviews - create a review of a business
app.post("/reviews", (req, res) => {
    if (
        req.body.hasOwnProperty("businessId") &&
        req.body.hasOwnProperty("stars") &&
        req.body.hasOwnProperty("expense")
    ) {
        addReview(req.body)
        console.log(reviews)
        res.send({
            "reviewId": reviewId,
        })
        reviewId += 1
    } else {
        res.status(400).send(
            "Error 400: Missing necessary fields"
        )
    }
})

// Request: PUT /reviews/{reviewId} - update a review of a business
// app.put("/reviews", (req, res) => {
//     res.send()
// })

// Request: GET /reviews - list all of a user's reviews
app.get("", (req, res) => {
    res.send()
})

// Request: POST /photos - add a photo of a business
app.post("", (req, res) => {
    res.send()
})

// Request: DELETE /photos/{photoId} - delete a photo
app.delete("", (req, res) => {
    res.send()
})

// Request: PUT /photos/{photoId} - update a photo caption
app.put("", (req, res) => {
    res.send()
})

// Request: GET /photos - retrieve photos a user has uploaded
app.get("", (req, res) => {
    res.send()
})


app.use('*', function (req, res) {
    res.status(404).send({
        err: "The requested resource doesn't exist"
    });
});


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
