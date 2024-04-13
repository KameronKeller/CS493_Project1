#!/bin/sh

status() {
    printf "\n=====================================================\n"
    printf "%s\n" "$1"
    printf -- "-----------------------------------------------------\n"
}

# businesses endpoint
status 'POST businesses should create a business'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"name": "test business", "streetAddress": "123 Address St", "city": "Nowhere", "state": "NW", "zipCode": 12345, "phoneNumber": "555-555-5555", "category": "American", "subcategories": ["burgers"], "website": "www.example.com", "email": "example@example.com"}' \
    http://localhost:8086/businesses
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

status 'GET businesses should return all of the businesses'
curl http://localhost:8086/businesses/

status 'DELETE businesses should delete a business by ID'
curl -X DELETE \
    http://localhost:8086/businesses/1

status 'DELETE businesses should not delete a business if the ID does not exist'
curl -X DELETE \
    http://localhost:8086/businesses/-12312

status 'POST reviews should create a review for a business'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"businessId": 1, "stars": 1, "expense": 1, "review": "not good"}' \
    http://localhost:8086/reviews

status 'GET businesses/{businessId} should return detailed info about that business'
curl http://localhost:8086/businesses/1

# status 'GET businesses/{businessId} that does not exist should return failure'
# curl http://localhost:8086/businesses/3848292849382073