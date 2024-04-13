var express = require("express");

var app = express();
app.use(express.json());

// TODO: set this up so that it uses the port environment variable
var port = 8086;

let businesses = {};
let currentBusinessId = 0;
let reviews = {};
let reviewId = 0;

function addReview(review) {
  let businessId = review.businessId;
  if (businessId in reviews) {
    reviews[businessId].push(review);
  } else {
    reviews[businessId] = [review];
  }
}

function on_ready() {
  console.log("server ready!");
}

function isNotValidBusinessId(businessId) {
  return !businesses.hasOwnProperty(businessId);
}

function hasRequiredProperties(requestBody) {
  return (
    requestBody.hasOwnProperty("name") &&
    requestBody.hasOwnProperty("streetAddress") &&
    requestBody.hasOwnProperty("city") &&
    requestBody.hasOwnProperty("state") &&
    requestBody.hasOwnProperty("zipCode") &&
    requestBody.hasOwnProperty("phoneNumber") &&
    requestBody.hasOwnProperty("category") &&
    requestBody.hasOwnProperty("subcategories")
  );
}

app.listen(port, () => {
  on_ready();
});

// Request: POST /businesses - create a business
app.post("/businesses", (req, res) => {
  if (hasRequiredProperties(req.body)) {
    currentBusinessId++;
    businesses[currentBusinessId] = req.body;
    res.send({
      businessId: currentBusinessId,
      businessHref: `/businesses/${currentBusinessId}`,
    });
  } else {
    res.status(400).send("Error 400: Missing necessary fields");
  }
});

// Request: PUT /businesses/{businessId} - update a business
app.put("/businesses/:businessId", (req, res) => {
  const businessId = req.params.businessId;
  if (isNotValidBusinessId(businessId)) {
    res.status(400).send("Error 400: Specified resource does not exist");
  } else if (hasRequiredProperties(req.body)) {
    businesses[businessId] = req.body;
    res.send({
      businessId: businessId,
      businessHref: `/businesses/${businessId}`,
    });
  } else {
    res.status(400).send("Error 400: Missing necessary fields");
  }
});

// Request: DELETE /businesses/{id} - delete a business
app.delete("/businesses/:businessId", (req, res) => {
  const businessId = req.params.businessId;
  if (isNotValidBusinessId(businessId)) {
    res.status(400).send("Error 400: Specified resource does not exist");
  } else {
    delete businesses.businessId;
    res.sendStatus(200);
  }
});

// Request: GET /businesses - list all businesses
app.get("/businesses", (req, res) => {
  res.send(businesses);
});

// Request: GET /businesses/{businessId} - list a specific business's details
app.get("/businesses/:businessId", (req, res) => {
  const businessId = req.params.businessId;
  if (isNotValidBusinessId(businessId)) {
    res.status(400).send("Error 400: Specified resource does not exist");
  } else {
    let business = businesses[businessId];
    business["reviews"] = reviews[businessId];
    res.send(business);
  }
});

// Request: POST /reviews - create a review of a business
app.post("/reviews", (req, res) => {
  if (
    req.body.hasOwnProperty("businessId") &&
    req.body.hasOwnProperty("stars") &&
    req.body.hasOwnProperty("expense")
  ) {
    addReview(req.body);
    res.send({
      reviewId: reviewId,
    });
    reviewId += 1;
  } else {
    res.status(400).send("Error 400: Missing necessary fields");
  }
});

// Request: PUT /reviews/{reviewId} - update a review of a business
// app.put("/reviews", (req, res) => {
//     res.send()
// })

// Request: GET /reviews - list all of a user's reviews
app.get("", (req, res) => {
  res.send();
});

// Request: POST /photos - add a photo of a business
app.post("", (req, res) => {
  res.send();
});

// Request: DELETE /photos/{photoId} - delete a photo
app.delete("", (req, res) => {
  res.send();
});

// Request: PUT /photos/{photoId} - update a photo caption
app.put("", (req, res) => {
  res.send();
});

// Request: GET /photos - retrieve photos a user has uploaded
app.get("", (req, res) => {
  res.send();
});

app.use("*", function (req, res) {
  res.status(404).send({
    err: "The requested resource doesn't exist",
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
