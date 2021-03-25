# JUMBOCASH-T6
Team ID: JUMBOCASH-T6 | Team Members: Kanishka Chowdhury &amp; Piyush Arya

## Branch: backend-feature
1. All experimental features
2. Untested features

## To Know More
### [README.md](#)
### [schema.md](schema.md)
### [changelog.md](changelog.md)

## How to Run
1. To run the application
   > **npm start**
   > 
   > **npm run start-dev** (starts with nodemon)
2. To get clear understanding of request and response specification, take a look at test/IntegrationTest/ directory, but ignore the body of 2xx response

## Action-4.1
### Major Issues:
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


## Upcoming actions
1. Add authentication
2. Think about aggregates for dashboard functionality
3. Implement page, filter, sort for database
4. Deploy the app - version 1

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
3. [ ] Authentication
   1. [ ] Make authentication feature using passport js using google strategy
   2. [x] Add hardcoded data for a test user, many entity and many transactions
   3. [ ] Make an access token for accessing a test user
4. [x] Pagination for hardcoded data
5. [x] Filter for hardcoded data
6. [x] Sort for hardcoded data
7. [x] Connect to PostgreSQL using sequelize
8. [x] Make database schema
9.  [x] Make request object schema
10. [x] make reposnse object schema
11. [x] Add test folder based on mocha and chai library
12. [ ] Add `/user` endpoint to get and edit user data
13. [ ] Make aggregation of transactions
14. [ ] Add option to make and send csv file
15. [ ] Add optional analytics
16. [ ] Add multiple transactions
17. [ ] Update Multiple transactions

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

### Add authentication:
1. Frontend:
   1. get token from oauth server (pass credentials).
   2. Send the token to the backend `/login` endpoint
2. Backend:
   1. sends the token to the oauth server, and get user data or error
   2. if error: send error
   3. if user logs in: 
      1. first time: add user data [email, name] in `user` table, token id in `auth` table with userId
      2. after first time: find user data, update `auth` table with token id, userId
   4. Following successful authentication backend will send "initial data" to the frontend

### Initial data
1. Entities associated with the userid
2. Latest 100 (or N) transactions
3. Person details: userSchema
4. Total Aggregates (to think about it)

### Deploy the app for completing authentication
1. Separate test and production database
2. [x] Add env variables
3. [x] Sequelize Logging is turned off
4. deploy to heroku: [project-dashboard](https://dashboard.heroku.com/apps/jumbocash-dev/deploy/heroku-git)
   1. Link postgres to node app: [heroku postgres](https://devcenter.heroku.com/articles/heroku-postgresql)
   2. [x] Update env variables
   3. Deploy the app
   
### Aggregations
1. Window: Monthly, quaterly, yearly
2. Each window
   1. Total Inflow, Outflow - Paid
   2. Total Debt, Credit - Not paid
   3. Top 10 Vendors and 10 Customers
   4. List of Transactions with filter, sort, page options

### Cashflow:
1. component: Purchase, sales, taxes, employee, asset liquidation, asset acquiring, interest-paid
2. Total inflow, total outflow in cash and cashless
3. time interval, customer id

### Optional Analytics
1. customers: 
   1. added, 
   2. top customer by transaction frequency, 
   3. top customer by total amount, 
   4. cashless, cash transaction
   5. unpaid customer dues(total),
   6. unpaid customer's name with dues
2. vendors: 
   1. added, 
   2. top customer by transaction frequency, 
   3. top customer by total amount, 
   4. cashless and cash transaction
   5. unpaid vendors dues(total)
   6. unpaid vendor's name with dues
3. Components: 
   1. comparison with last 5 time intervals (mth, qtr, yr)
   2. % breakdown in inflow and outflow