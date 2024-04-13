#!/bin/sh

status() {
    printf "\n=====================================================\n"
    printf "%s\n" "$1"
    printf -- "-----------------------------------------------------\n"
}

# Populate the "database" with fake data
curl -s -X POST \
    -H 'Content-Type: application/json' \
    -d '{"name": "Business 1", "streetAddress": "123 Address St", "city": "Nowhere", "state": "NW", "zipCode": 12345, "phoneNumber": "555-555-5555", "category": "American", "subcategories": ["burgers"], "website": "www.example.com", "email": "example@example.com"}' \
    http://localhost:8086/businesses > /dev/null
curl -s -X POST \
    -H 'Content-Type: application/json' \
    -d '{"name": "Business 2", "streetAddress": "123 Address St", "city": "Nowhere", "state": "NW", "zipCode": 12345, "phoneNumber": "555-555-5555", "category": "American", "subcategories": ["burgers"], "website": "www.example.com", "email": "example@example.com"}' \
    http://localhost:8086/businesses > /dev/null
curl -s -X POST \
    -H 'Content-Type: application/json' \
    -d '{"businessId": 1, "stars": 1, "expense": 1, "review": "not good"}' \
    http://localhost:8086/reviews > /dev/null
curl -s -X POST \
    -H 'Content-Type: application/json' \
    -d '{"businessId": 2, "stars": 4, "expense": 1, "review": "very good"}' \
    http://localhost:8086/reviews > /dev/null
curl -s -X POST \
    -H 'Content-Type: application/json' \
    -d '{"businessId": 1, "photoUrl": "www.com/photo.png", "caption": 1}' \
    http://localhost:8086/photos > /dev/null
curl -s -X POST \
    -H 'Content-Type: application/json' \
    -d '{"businessId": 2, "photoUrl": "www.com/photo.png", "caption": 1}' \
    http://localhost:8086/photos > /dev/null

# businesses endpoint
status 'POST businesses should create a business'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"name": "test business", "streetAddress": "123 Address St", "city": "Nowhere", "state": "NW", "zipCode": 12345, "phoneNumber": "555-555-5555", "category": "American", "subcategories": ["burgers"], "website": "www.example.com", "email": "example@example.com"}' \
    http://localhost:8086/businesses

status 'POST businesses should not create a business if necessary fields are missing'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"streetAddress": "123 Address St", "city": "Nowhere", "state": "NW", "zipCode": 12345, "phoneNumber": "555-555-5555", "category": "American", "subcategories": ["burgers"], "website": "www.example.com", "email": "example@example.com"}' \
    http://localhost:8086/businesses

status 'PUT businesses should update a business by ID'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"name": "New Business Name", "streetAddress": "123 Address St", "city": "Somewhere", "state": "NW", "zipCode": 12345, "phoneNumber": "555-555-5555", "category": "American", "subcategories": ["burgers"], "website": "www.example.com", "email": "example@example.com"}' \
    http://localhost:8086/businesses/1

status 'PUT businesses should not update a business if the ID does not exist'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"name": "New Business Name", "streetAddress": "123 Address St", "city": "Somewhere", "state": "NW", "zipCode": 12345, "phoneNumber": "555-555-5555", "category": "American", "subcategories": ["burgers"], "website": "www.example.com", "email": "example@example.com"}' \
    http://localhost:8086/businesses/-123122312

status 'PUT businesses should not update a business if necessary fields are missing'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"streetAddress": "123 Address St", "city": "Somewhere", "state": "NW", "zipCode": 12345, "phoneNumber": "555-555-5555", "category": "American", "subcategories": ["burgers"], "website": "www.example.com", "email": "example@example.com"}' \
    http://localhost:8086/businesses/1

status 'DELETE businesses should delete a business by ID'
curl -X DELETE \
    http://localhost:8086/businesses/2

status 'DELETE businesses/{businessId} that does not exist returns failure'
curl -X DELETE \
    http://localhost:8086/businesses/-12312

status 'GET businesses should return all of the businesses'
curl http://localhost:8086/businesses/

status 'GET businesses/{businessId} should return detailed info about that business'
curl http://localhost:8086/businesses/1

status 'GET businesses/{businessId} that does not exist should return failure'
curl http://localhost:8086/businesses/3848292849382073

status 'POST reviews should create a review for a business'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"businessId": 1, "stars": 1, "expense": 1, "review": "not good"}' \
    http://localhost:8086/reviews

status 'POST reviews should fail if necessary fields are not included'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"stars": 1, "expense": 1, "review": "not good"}' \
    http://localhost:8086/reviews

status 'PUT reviews/{reviewId} should update a review'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"businessId": 1, "stars": 100, "expense": 1, "review": "not good"}' \
    http://localhost:8086/reviews/1

status 'PUT reviews/{reviewId} should fail if necessary fields are not included'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"stars": 100, "expense": 1, "review": "not good"}' \
    http://localhost:8086/reviews/1

status 'PUT reviews/{reviewId} that does not exist returns failure'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"businessId": 1, "stars": 100, "expense": 1, "review": "not good"}' \
    http://localhost:8086/reviews/123432423

status 'GET reviews returns all of the reviews'
curl http://localhost:8086/reviews/

status 'POST photos adds a photo for a business'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"businessId": 1, "photoUrl": "www.com/url", "caption": 1}' \
    http://localhost:8086/photos

status 'DELETE photos/{photoId} should delete the photo'
curl -X DELETE \
    http://localhost:8086/photos/1

status 'DELETE photos/{photoId} that does not exist returns failure'
curl -X DELETE \
    http://localhost:8086/photos/12342423423423

status 'PUT photos/{photoId} updates a photo for a business'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"businessId": 1, "photoUrl": 1, "caption": "New caption"}' \
    http://localhost:8086/photos/1

status 'PUT photos/{photoId} should fail if necessary fields are not included'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"photoUrl": 1, "caption": "New caption"}' \
    http://localhost:8086/photos/1

status 'PUT photos/{photoId} that does not exist returns failure'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"businessId": 1, "photoUrl": 1, "caption": "New caption"}' \
    http://localhost:8086/photos/11234234234234

status 'GET photos returns all of the photos'
curl http://localhost:8086/photos/

status 'GET an endpoint that does not exist returns failure'
curl http://localhost:8086/notreal