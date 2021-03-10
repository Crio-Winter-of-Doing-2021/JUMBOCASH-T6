# JUMBOCASH-T6
Team ID: JUMBOCASH-T6 | Team Members: Kanishka Chowdhury &amp; Piyush Arya

## Branch: backend-feature
1. All experimental features
2. Untested features

## Todo
1. [x] Add endpoints
   1. [x] GET /entity
   2. [x] POST /entity
   3. [x] GET /transaction
   4. [x] POST /transaction
   5. [x] PUT /transaction/:id
   6. [x] GET /transaction/:id
   7.  GET /login
2. [x] Add hardcoded data for request and response schema
3. Authentication
   1. Make authentication feature using passport js using google strategy
   2. Add hardcoded data for a test user, many entity and many transactions
   3. Make an access token for accessing a test user
4. [x] Pagination for hardcoded data
5. [x] Filter for hardcoded data
6. [x] Sort for hardcoded data
7. Connect to PostgreSQL using sequelize
8. [x] Make database schema
9.  [x] Make request object schema
10. [x] make reposnse object schema
11. Add test folder based on mocha and chai library

## Action-3
### Major Issues:
1. Added postgreSQL database engine
2. Implemented table schema and relation for user, transaction and entity
3. **/entity** Endpoint
   1. Added preliminary validation for
   2. Added CRUD functionality in backend
   3. integrated all endpoints with backend
   4. Handled edge cases of not found, duplicate entry with relevant error codes and messages 
4. **/user** Endpoint
   1. Added CRUD functionality
   2. Integrated some endpoints with backend
5. **/transaction** Endpoint
   1. Added CRUD functionality
6. Developed test suite in postman
### Minor Fixes:
1. Added new user for ease in testing, without authentication support.

## Action-2
### Major Issues:
1. Added filtering
### Minor Fixes:
1. SortedResponse and filtering returns array on actions based upon last key

## Action-1
### Major Issues
1. Adding endpoints: 
   1. GET /entity - for getting all entities
   2. GET /transaction - for getting all transactions
   3. POST /transaction/filter - for paginated, sorted, filtered transactions
2. Added harcoded data in seed/
3. [Adding filtering through post request](https://softwareengineering.stackexchange.com/questions/403251/is-it-a-bad-idea-to-pass-json-objects-on-the-query-string-for-an-api-search-op)
4. Added SortedResponse
5. Added pagination
   1. [findIndex method](https://stackoverflow.com/questions/11258077/how-to-find-index-of-an-object-by-key-and-value-in-an-javascript-array/39810268)

### Minor Fixes:
1. Moved request and model schema in schema.md

## Upcoming actions
1. Add validation and constraint for:
   1. empty
   2. field values not conforming to rules
   3. request schema not conforming
   4. Duplication rules
2. complete CRUD functionality for all endpoints
   1. Add controller for user, transaction
   2. Integrate controller with database
   3. Add validation and constraint for request and response