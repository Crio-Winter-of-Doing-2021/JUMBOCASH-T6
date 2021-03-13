# JUMBOCASH-T6
Team ID: JUMBOCASH-T6 | Team Members: Kanishka Chowdhury &amp; Piyush Arya

## Branch: backend-feature
1. All experimental features
2. Untested features

## To Know More
### README.md
### schema.md
### changelog.md

## A Note..
1. To run the application
   > **npm start**
   > 
   > **npm run start-dev** (starts with nodemon)

2. Seed database: 
   1. In app.js, uncomment the following snippet
   ```js
   // for setting the db with seed value, and starting the server
   sequelize.sync({force:true}).then(() => {
   app.listen(PORT, console.log(`Server started on port ${PORT}`));

   require('./src/seed/seedDb');
   }).catch(err => console.log("Error: " + err));
   ```
3. Unseed database:
   1. In app.js, uncomment the following snippet
   ```js
   // for starting the server with previously stored data
   sequelize.sync().then(() => {
   app.listen(PORT, console.log(`Server started on port ${PORT}`));
   }).catch(err => console.log("Error: " + err));

   // {force: true} - for dropping all tables
   ```

4. To get clear understanding of request and response specification, take a look at test/IntegrationTest/ directory, but ignore the body of 2xx response

## Upcoming actions
1. Add validation and constraint for: date
2. Add authentication
3. Think about aggregates for dashboard functionality
4. Implement page, filter, sort for database
5. Deploy the app - version 1

## Todo
### Version 1
1. [x] Add endpoints
   1. [x] GET /entity
   2. [x] POST /entity
   3. [x] GET /transaction
   4. [x] POST /transaction
   5. [x] PATCH /transaction/:id
   6. [x] GET /transaction/:id
   7.  GET /login
   8. [x] PATCH /entity/:id
2. [x] Add hardcoded data for request and response schema
3. Authentication
   1. Make authentication feature using passport js using google strategy
   2. [x] Add hardcoded data for a test user, many entity and many transactions
   3. Make an access token for accessing a test user
4. [x] Pagination for hardcoded data
5. [x] Filter for hardcoded data
6. [x] Sort for hardcoded data
7. [x] Connect to PostgreSQL using sequelize
8. [x] Make database schema
9.  [x] Make request object schema
10. [x] make reposnse object schema
11. [x] Add test folder based on mocha and chai library

### Version 2
1. Add aggregates functionality to get sum, count, min, max data
2. Think about presentation and behaviour for dashboard (few ideas on which we can work)
   1. Timeframe filter - 
      1. last day, last week, last month, last quarter, last year
      2. current day, current week, current month, current quarter, current year
   1. Total Credit Inflow and Outflow based on timeframe filter
   2. Vendor Chart - max by transaction, max by sum of amount based on timeframe filter
   3. Customer Chart - max by transaction, max by sum of amount based on timeframe filter
   4. Histogram of Inflow and Outflow reduced to components eg Sales, Purchase, Tax etc. based on timeframe filter
   5. Transaction table - paginated, search by category, paymentStatus, paymentMode

