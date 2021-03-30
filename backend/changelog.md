## Version-5.1:
## Major Enhancements:
1. Protected all routes with authentication.
2. Test all protected endpoints with test access token.
3. Made a test access token for testing authentication in postman.
4. Added pm2 for app management in production
### To Do:
1. To add functionality for editing user details
### Minor improvements:
1. Fixed: uuid of request not matching with entityId in updateEntityById.json
2. User can create transaction with entity they have not defined
3. Validate transaction for duplication
4. Fixed: test cases in postman

## Version-5.0:
### Major Enhancements:
1. Added env variable to select database from "remote" or "local"
2. Configured ssl for remote database
3. Seed value in database are now consistent with specified enums.
4. Configured passport to authenticate using google strategy
5. Generated credentials for google oauth2.0
6. Added OAuth2.0 using google strategy with opaque OAuth2.0 tokens.
7. Added token in userSchema
### To Do
1. Test all protected endpoints with test access token
2. Add where id: userId in entity, transaction column
3. Add aggregates based on last week, last month, last quarter, last year
4. Deploy the code, Push the code, Inform partner about changes
5. Add initial data in user/dashboard
6. Add pagination
7. Think about caching, indexing, optimizing of query
8. run 2 instances of app in aws: latest-unstable, stable
### Minor fixes:
1. Changed action to version in changelog

## Version-4.1
### Major Enhancements:
1. Added environment variable
2. Automated reset of database on starting of server, specified by env variable flag
3. Added preliminary middleware for authentication handling
4. Added filter-sort functionality
### Minor fixes:
1. Fixed: response body returns transaction with "entity" as its key
2. throws error if gets amount of precision greater than 2.
3. Fixed: time is not accepted by server
4. Improved: providing time is optional for client
5. Changed: time format for request and response: [link](schema.md)
6. Added config/data to declare custom enums, in a simpler way. [link](config/data.js)
7. Changed: specify if you need seeded or undisturbed database
8. Fixed: returns updated item after modification

## Version-4
### Major Enhancements:
1. Added databse connection to all endpoints
2. Added seeding functionality to database
3. Added validation rules for **/entity** endpoint
4. Added validation rules for **/transaction** endpoint
5. Added data driven test suite in postman in **/test**

### Minor Fixes
1. defaultValue in place of default in sequelize Models
2. Integration Test ran successfully All Endpoints of /entity
3. Amount was not visible in seeding: changed model parameter
4. update transaction was executing even for absent unique id
5. Added changelog.md
### Bugs: open
1. Datetime format conflict: "2019-01-03T06:17:43 -06:-30" in schema, "2021-03-13T08:37:08.201Z" in sequelize


## Version-3
### Major Enhancements:
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

## Version-2
### Major Enhancements:
1. Added filtering
### Minor Fixes:
1. SortedResponse and filtering returns array on actions based upon last key

## Version-1
### Major Enhancements
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