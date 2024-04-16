var express = require("express");

function getBusinessIdFromCompoundKey(key) {
  // match on b or (r or p)
  return key.split(/[b|(r|p)]/)[1];
}

function addReview(review) {
  currentReviewId++;
  let businessId = review.businessId;
  const reviewId = `b${businessId}r${currentReviewId}`;
  if (!reviews[businessId]) {
    reviews[businessId] = {
      [reviewId]: review,
    };
  } else {
    reviews[businessId][reviewId] = review;
  }
}

function addPhoto(photo) {
  currentphotoId++;
  let businessId = photo.businessId;
  const photoId = `b${businessId}p${currentphotoId}`;
  if (!photos[businessId]) {
    photos[businessId] = {
      [photoId]: photo,
    };
  } else {
    photos[businessId][photoId] = photo;
  }
}

function on_ready() {
  console.log("Server running on port:", port);
}

function isNotValidId(dataObject, id) {
  return !dataObject.hasOwnProperty(id);
}

function hasRequiredBusinessProperties(requestBody) {
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

function hasRequiredReviewProperties(requestBody) {
  return (
    requestBody.hasOwnProperty("businessId") &&
    requestBody.hasOwnProperty("stars") &&
    requestBody.hasOwnProperty("expense")
  );
}

function hasRequiredPhotoProperties(requestBody) {
  return (
    requestBody.hasOwnProperty("businessId") &&
    requestBody.hasOwnProperty("photoUrl")
  );
}

function preparePaginatedResponse(req, data, dataName, hateoasUrl) {
  // Adapted from Exploration 2

  let dataValues = Object.values(data);

  const numPerPage = 1;
  const lastPage = Math.ceil(dataValues.length / numPerPage);

  let page = parseInt(req.query.page) || 1;
  page = page < 1 ? 1 : page;
  page = page > lastPage ? lastPage : page;

  let start = (page - 1) * numPerPage;
  let end = start + numPerPage;
  let pageData = dataValues.slice(start, end);

  let links = {};
  if (page < lastPage) {
    links.nextPage = `/${hateoasUrl}?page=` + (page + 1);
    links.lastPage = `/${hateoasUrl}?page=` + lastPage;
  }
  if (page > 1) {
    links.prevPage = `/${hateoasUrl}?page=` + (page - 1);
    links.firstPage = `/${hateoasUrl}?page=1`;
  }

  return {
    pageNumber: page,
    totalPages: lastPage,
    pageSize: numPerPage,
    totalCount: dataValues.length,
    [dataName]: pageData,
    links: links,
  };
}

var app = express();
app.use(express.json());

const port = process.env.PORT || 8086;

let businesses = {};
let currentBusinessId = 0;
let reviews = {};
let currentReviewId = 0;
let photos = {};
let currentphotoId = 0;

app.listen(port, () => {
  on_ready();
});

app.use(function (req, res, next) {
  console.log("== Request received");
  console.log("  - Method:", req.method);
  console.log("  - URL:", req.url);
  next();
});

// Request: POST /businesses - create a business
app.post("/businesses", (req, res) => {
  if (hasRequiredBusinessProperties(req.body)) {
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
  if (isNotValidId(businesses, businessId)) {
    res.status(400).send("Error 400: Specified resource does not exist");
  } else if (hasRequiredBusinessProperties(req.body)) {
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
  if (isNotValidId(businesses, businessId)) {
    res.status(400).send("Error 400: Specified resource does not exist");
  } else {
    delete businesses.businessId;
    res.sendStatus(200);
  }
});

// Request: GET /businesses - list all businesses
app.get("/businesses", (req, res) => {
  const response = preparePaginatedResponse(
    req,
    businesses,
    "businesses",
    "businesses"
  );
  res.send(response);
});

// Request: GET /businesses/{businessId} - list a specific business's details
app.get("/businesses/:businessId", (req, res) => {
  const businessId = req.params.businessId;
  if (isNotValidId(businesses, businessId)) {
    res.status(400).send("Error 400: Specified resource does not exist");
  } else {
    let business = businesses[businessId];
    business["reviews"] = reviews[businessId];
    business["photos"] = photos[businessId];
    res.send(business);
  }
});

// Request: POST /reviews - create a review of a business
app.post("/reviews", (req, res) => {
  if (hasRequiredReviewProperties(req.body)) {
    addReview(req.body);
    res.send({
      reviewId: currentReviewId,
    });
  } else {
    res.status(400).send("Error 400: Missing necessary fields");
  }
});

// Request: PUT /reviews/{reviewId} - update a review of a business
app.put("/reviews/:reviewId", (req, res) => {
  const review = req.body;
  const reviewId = req.params.reviewId;
  const businessId = review.businessId;

  if (!businessId || isNotValidId(reviews[businessId], reviewId)) {
    res.status(400).send("Error 400: Specified resource does not exist");
  } else if (hasRequiredReviewProperties(req.body)) {
    reviews[businessId][reviewId] = review;
    res.send({
      reviewId: reviewId,
    });
  } else {
    res.status(400).send("Error 400: Missing necessary fields");
  }
});

// Request: DELETE /reviews/{reviewId} - deletes a review of a business
app.delete("/reviews/:reviewId", (req, res) => {
  const reviewId = req.params.reviewId;
  const businessId = getBusinessIdFromCompoundKey(reviewId);
  if (!businessId || isNotValidId(reviews[businessId], reviewId)) {
    res.status(400).send("Error 400: Specified resource does not exist");
  } else {
    delete reviews[businessId].reviewId;
    res.sendStatus(200);
  }
});

// Request: GET /reviews - list all of a user's reviews
app.get("/reviews", (req, res) => {
  // Convert a list of review objects
  // to a single object containing all of the reviews
  let condensedReviews = Object.assign({}, ...Object.values(reviews));

  const response = preparePaginatedResponse(
    req,
    condensedReviews,
    "reviews",
    "reviews"
  );
  res.send(response);
});

// Request: POST /photos - add a photo of a business
app.post("/photos", (req, res) => {
  if (hasRequiredPhotoProperties(req.body)) {
    addPhoto(req.body);
    res.send({
      photoId: currentphotoId,
    });
  } else {
    res.status(400).send("Error 400: Missing necessary fields");
  }
});

// Request: DELETE /photos/{photoId} - delete a photo
app.delete("/photos/:photoId", (req, res) => {
  const photoId = req.params.photoId;
  const businessId = getBusinessIdFromCompoundKey(photoId);
  if (!businessId || isNotValidId(photos[businessId], photoId)) {
    res.status(400).send("Error 400: Specified resource does not exist");
  } else {
    delete photos[businessId].photoId;
    res.sendStatus(200);
  }
});

// Request: PUT /photos/{photoId} - update a photo caption
app.put("/photos/:photoId", (req, res) => {
  const photo = req.body;
  const photoId = req.params.photoId;
  const businessId = photo.businessId;

  if (!businessId || isNotValidId(photos[businessId], photoId)) {
    res.status(400).send("Error 400: Specified resource does not exist");
  } else if (hasRequiredPhotoProperties(photo)) {
    photos[businessId][photoId] = photo;
    res.send({
      photoId: photoId,
    });
  } else {
    res.status(400).send("Error 400: Missing necessary fields");
  }
});

// Request: GET /photos - retrieve photos a user has uploaded
app.get("/photos", (req, res) => {
  // Convert a list of review objects
  // to a single object containing all of the reviews
  let condensedPhotos = Object.assign({}, ...Object.values(photos));
  const response = preparePaginatedResponse(
    req,
    condensedPhotos,
    "photos",
    "photos"
  );
  res.send(response);
});

app.use("*", function (req, res) {
  res.status(404).send({
    err: "The requested resource doesn't exist",
  });
});
