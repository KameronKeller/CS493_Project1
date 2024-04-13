#!/bin/sh

status() {
    printf "\n=====================================================\n"
    printf "%s\n" "$1"
    printf -- "-----------------------------------------------------\n"
}

if [ -z "$PORT" ]; then
    echo "Error: PORT environment variable is not set"
    echo "Defaulting to 8086"
    PORT=8086
fi

# Populate the "database" with fake data
curl -s -X POST \
    -H 'Content-Type: application/json' \
    -d '{"name": "Business 1", "streetAddress": "123 Address St", "city": "Nowhere", "state": "NW", "zipCode": 12345, "phoneNumber": "555-555-5555", "category": "American", "subcategories": ["burgers"], "website": "www.example.com", "email": "example@example.com"}' \
    http://localhost:$PORT/businesses > /dev/null
curl -s -X POST \
    -H 'Content-Type: application/json' \
    -d '{"name": "Business 2", "streetAddress": "123 Address St", "city": "Nowhere", "state": "NW", "zipCode": 12345, "phoneNumber": "555-555-5555", "category": "American", "subcategories": ["burgers"], "website": "www.example.com", "email": "example@example.com"}' \
    http://localhost:$PORT/businesses > /dev/null
curl -s -X POST \
    -H 'Content-Type: application/json' \
    -d '{"businessId": 1, "stars": 1, "expense": 1, "review": "not good"}' \
    http://localhost:$PORT/reviews > /dev/null
curl -s -X POST \
    -H 'Content-Type: application/json' \
    -d '{"businessId": 2, "stars": 4, "expense": 1, "review": "very good"}' \
    http://localhost:$PORT/reviews > /dev/null
curl -s -X POST \
    -H 'Content-Type: application/json' \
    -d '{"businessId": 1, "photoUrl": "www.com/photo.png", "caption": 1}' \
    http://localhost:$PORT/photos > /dev/null
curl -s -X POST \
    -H 'Content-Type: application/json' \
    -d '{"businessId": 2, "photoUrl": "www.com/photo.png", "caption": 1}' \
    http://localhost:$PORT/photos > /dev/null

status 'POST businesses should create a business'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"name": "test business", "streetAddress": "123 Address St", "city": "Nowhere", "state": "NW", "zipCode": 12345, "phoneNumber": "555-555-5555", "category": "American", "subcategories": ["burgers"], "website": "www.example.com", "email": "example@example.com"}' \
    http://localhost:$PORT/businesses

status 'POST businesses should not create a business if necessary fields are missing'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"streetAddress": "123 Address St", "city": "Nowhere", "state": "NW", "zipCode": 12345, "phoneNumber": "555-555-5555", "category": "American", "subcategories": ["burgers"], "website": "www.example.com", "email": "example@example.com"}' \
    http://localhost:$PORT/businesses

status 'PUT businesses should update a business by ID'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"name": "New Business Name", "streetAddress": "123 Address St", "city": "Somewhere", "state": "NW", "zipCode": 12345, "phoneNumber": "555-555-5555", "category": "American", "subcategories": ["burgers"], "website": "www.example.com", "email": "example@example.com"}' \
    http://localhost:$PORT/businesses/1

status 'PUT businesses should not update a business if the ID does not exist'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"name": "New Business Name", "streetAddress": "123 Address St", "city": "Somewhere", "state": "NW", "zipCode": 12345, "phoneNumber": "555-555-5555", "category": "American", "subcategories": ["burgers"], "website": "www.example.com", "email": "example@example.com"}' \
    http://localhost:$PORT/businesses/-123122312

status 'PUT businesses should not update a business if necessary fields are missing'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"streetAddress": "123 Address St", "city": "Somewhere", "state": "NW", "zipCode": 12345, "phoneNumber": "555-555-5555", "category": "American", "subcategories": ["burgers"], "website": "www.example.com", "email": "example@example.com"}' \
    http://localhost:$PORT/businesses/1

status 'DELETE businesses should delete a business by ID'
curl -X DELETE \
    http://localhost:$PORT/businesses/2

status 'DELETE businesses/{businessId} that does not exist returns failure'
curl -X DELETE \
    http://localhost:$PORT/businesses/-12312

status 'GET businesses should return a paginated response of businesses'
curl http://localhost:$PORT/businesses/

status 'GET businesses?page=2 should return page 2'
curl http://localhost:$PORT/businesses?page=2

status 'GET businesses/{businessId} should return detailed info about that business'
curl http://localhost:$PORT/businesses/1

status 'GET businesses/{businessId} that does not exist should return failure'
curl http://localhost:$PORT/businesses/3848292849382073

status 'POST reviews should create a review for a business'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"businessId": 1, "stars": 1, "expense": 1, "review": "not good"}' \
    http://localhost:$PORT/reviews

status 'POST reviews should fail if necessary fields are not included'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"stars": 1, "expense": 1, "review": "not good"}' \
    http://localhost:$PORT/reviews

status 'PUT reviews/{reviewId} should update a review'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"businessId": 1, "stars": 100, "expense": 1, "review": "not good"}' \
    http://localhost:$PORT/reviews/1

status 'PUT reviews/{reviewId} should fail if necessary fields are not included'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"stars": 100, "expense": 1, "review": "not good"}' \
    http://localhost:$PORT/reviews/1

status 'PUT reviews/{reviewId} that does not exist returns failure'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"businessId": 1, "stars": 100, "expense": 1, "review": "not good"}' \
    http://localhost:$PORT/reviews/123432423

status 'GET reviews should return a paginated response of reviews'
curl http://localhost:$PORT/reviews/

status 'GET reviews?page=2 should return page 2'
curl http://localhost:$PORT/reviews?page=2

status 'POST photos adds a photo for a business'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"businessId": 1, "photoUrl": "www.com/url", "caption": 1}' \
    http://localhost:$PORT/photos

status 'DELETE photos/{photoId} should delete the photo'
curl -X DELETE \
    http://localhost:$PORT/photos/1

status 'DELETE photos/{photoId} that does not exist returns failure'
curl -X DELETE \
    http://localhost:$PORT/photos/12342423423423

status 'PUT photos/{photoId} updates a photo for a business'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"businessId": 1, "photoUrl": 1, "caption": "New caption"}' \
    http://localhost:$PORT/photos/1

status 'PUT photos/{photoId} should fail if necessary fields are not included'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"photoUrl": 1, "caption": "New caption"}' \
    http://localhost:$PORT/photos/1

status 'PUT photos/{photoId} that does not exist returns failure'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"businessId": 1, "photoUrl": 1, "caption": "New caption"}' \
    http://localhost:$PORT/photos/11234234234234

status 'GET photos should return a paginated response of photos'
curl http://localhost:$PORT/photos/

status 'GET photos?page=2 should return page 2'
curl http://localhost:$PORT/photos?page=2

status 'GET an endpoint that does not exist returns failure'
curl http://localhost:$PORT/notreal