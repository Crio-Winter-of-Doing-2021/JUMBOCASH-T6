# JUMBOCASH-T6
Team ID: JUMBOCASH-T6 | Team Members: Kanishka Chowdhury &amp; Piyush Arya

## Branch: backend-feature
1. All experimental features
2. Untested features

## Todo
1. Add endpoints
   1. GET /entity
   2. POST /entity
   3. GET /transaction
   4. POST /transaction
   5. PUT /transaction/:id
   6. GET /transaction/:id
   7. GET /login
2. Add hardcoded data for request and response schema
3. Authentication
   1. Make authentication feature using passport js using google strategy
   2. Add hardcoded data for a test user, many entity and many transactions
   3. Make an access token for accessing a test user
4. Pagination
5. Filter
6. Sort
7. Connect to PostgreSQL using sequelize
8. Make database schema
9. Make request object schema
10. make reposnse object schema
11. Add test folder based on mocha and chai library


## Action
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
1. Add mocha and chai for test suite
2. Add filter logic
3. Add data access layer and import in controller