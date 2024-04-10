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

status 'POST businesses should not create a business if necessary fields are missing'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"streetAddress": "123 Address St", "city": "Nowhere", "state": "NW", "zipCode": 12345, "phoneNumber": "555-555-5555", "category": "American", "subcategories": ["burgers"], "website": "www.example.com", "email": "example@example.com"}' \
    http://localhost:8086/businesses

status 'PUT businesses should update a business by ID'
curl -v -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"name": "New Business Name", "streetAddress": "123 Address St", "city": "Somewhere", "state": "NW", "zipCode": 12345, "phoneNumber": "555-555-5555", "category": "American", "subcategories": ["burgers"], "website": "www.example.com", "email": "example@example.com"}' \
    http://localhost:8086/businesses/0

status 'DELETE businesses should delete a business by ID'
curl -X DELETE \
    http://localhost:8086/businesses/0

status 'DELETE businesses should not delete a business if the ID does not exist'
curl -X DELETE \
    http://localhost:8086/businesses/-12312

# status 'GET business-by-id should return failure'
# curl http://localhost:3000/businesses/9999

# Here's an example of splitting a big command across
# multiple lines by ending the line with "\":

# curl -v -X PUT \
#     -H 'Content-Type: application/json' \
#     -d '{"starRating": "1", "dollarRaing": "1", "review": "Do not wish to return"}' \
#     http://localhost:3000/reviews/2

# etc.