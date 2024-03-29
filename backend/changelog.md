## Version-7.2 (12th April, 10PM)

### Major enhancement
1. Frontend: added csv, pdf report generation service.
2. Frontend: Moved the time filter over to the top of the Dashboard.
3. Added blogs

### Minor fixes:
1. Changed response schema of transaction to include entity name. (Check [schema](schema.md))
2. Added sample request to transaction filter endpoint.
3. Added validation check for user update.
4. Refactored: routes moved under the src folder.
5. Fixed: CSV generation throwing error for not detecting report directory in heroku.
6. Fixed: Seed of other users are not visible.

## Version-7.1 (9th April, 10PM)

## Major Enhancements:

1. Integrated frontend charts with backend api.
2. Added endpoint to edit user.

### To Do:

1. Prettify trends report
2. Add trends to the report
3. cache userId (Need time to implement)
4. Prettify entity object in entity analytics (prettified in report generation)
5. Add pagination of 100 transactions limit (already implemented in `transaction/filter`)
6. Add swagger jsdoc (check [schema](schema.md))
7. Refactor services, auth middleware, seed, config(for passport), app.js
8. Think about adding 'inflow', 'outflow' in transaction schema

### Minor improvements:

1. Fixed: `transaction/multi` adding duplicate transactions in bulkCreate, but it won't update if transaction is already present in the db.

## Version-7.0 (8th April, 11PM)

## Major Enhancements:

1. Added csv report functionality, curently user can view
   1. current inflow - total incoming transactions 
   2. curent outflow - total outgoing transactions
   3. pending inflow - total incoming amount, which has not been paid by client to the user
   4. pending outflow - total outgoing amount, which has not been paid by the user to the vendor
   5. entity-current inflow - list of client who has paid most to the user
   6. entity-current outflow - list of vendor who has sold most items to the user
   7. entity-pending inflow - list of client who are biggest credit holders
   8. entity-pending outflow - list of vendors to whom user owes the most
2. Added service to remove file
3. Added job scheduler, which currently
   1. Cleans `report` directory to optimize space
4. Added `analytics/csv` endpoint for user to download zip of folder containig list of csv files

### To Do:

1. Prettify trends report
2. Add trends to the report
3. cache userId
4. Prettify entity object in entity analytics
5. Add pagination of 100 transactions limit
6. Add swagger jsdoc
7. Refactor services, auth middleware, seed, config(for passport), app.js
8. Think about adding 'inflow', 'outflow' in transaction schema

### Minor improvements:

1. Fixed: entity analytics should return name and contact of the user, in generating report


## Version-6.1 (8th April)

## Major Enhancements:

1. Added seeder function dependent on `fakerator`
2. Added `transaction/multi` endpoint for adding multiple transactions

### To Do:

1. Add csv report

### Minor improvements:

1. Fixed: entity analytics should only group based on "SALES" and "PURCHASE".
2. Reduced response body size from database by `removing` userId, createdAt, updatedAt key from transaction, entity
3. Refactored: User must only see message of database related errors

## Version-6.0

## Major Enhancements:

1. **Implemented authentication with redirection**, tested with frontend app
2. Changed Architecture of web app, now frontend is mounted on server
3. Changed Schema of Page Object in filter-sort-page
4. **Added analytics**
5. Added Request and response schema in [schema file](schema.md)
6. Added inflow, outflow, interval enums in `config/data`

### To Do:

1. Multiple transactions
2. Edit users
3. Add more seeds

### Minor improvements:

1. Refactored authentication handling stack: routes, controllers, and proxy
2. Seeded the test data for auth protected api testing.
3. Tested filter
4. Tested analytics endpoint
5. Fixed: "CREDIT_CARD" is not accepted

## Version-5.2

## Major Enhancements:

1. Improved: authentication middleware for protected routes performed extra db lookup to fetch userId, now performs 2 lookup instead of 3.
2. **Implemented redirect**, but currently not tested with frontend app
3. fixed: client can access protected routes after logging out
4. fixed: client creates new accounts on every authentication
5. **Added pagination**; Completed filter-page-sort elementary
6. Changed Schema of Page

### To Do:

1. Analytics
2. Multiple transactions
3. Edit users

### Minor improvements:

1. Refactored authentication handling stack: routes, controllers, and proxy
2. Seeded the test data for auth protected api testing.
3. Tested filter

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
