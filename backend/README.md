# JUMBOCASH-T6
Team ID: JUMBOCASH-T6 | Team Members: Kanishka Chowdhury &amp; Piyush Arya

--- 
### Current Version Developed: 5.2

### Current Version Deployed: 5.0
---


## Branch: backend-feature
1. All experimental features
2. Untested features

## To Know More
### [README.md](#)
### [schema.md](schema.md)
### [changelog.md](changelog.md) - for viewing new features in Version-5.1

## How to Run
1. To run the application
   > **npm start**
   > 
   > **npm run start-dev** (starts with nodemon)
2. To get clear understanding of request and response specification, take a look at test/IntegrationTest/ directory, but ignore the body of 2xx response

## Note from backend developer (30th March):
1. Fixed the enum in seeding file, check `backend/config/data.js` for acceptable enums
2. Added cookie based authentication using OAuth2.0 with google Strategy
   1. `GET auth/google` - endpoint for logging in
   2. `GET auth/logout` - endpoint for logging out
   3. `GET user/me` - get user data conforms to userSchema ([schema.md](schema.md)); to be redirected on this endpoint after successful authentication
   4. `PATCH user/me` - editing user data, not implemented it yet.
3. To be deployed by tomorrow.

## Major Enhancements:
1. Added env variable to select database from "remote" or "local"
2. Configured ssl for remote database
3. Seed value in database are now consistent with specified enums.
4. Configured passport to authenticate using google strategy
5. Generated credentials for google oauth2.0
6. Added OAuth2.0 using google strategy with opaque OAuth2.0 tokens.
7. Added token in userSchema
## To Do
1. Test all protected endpoints with test access token
2. Add where id: userId in entity, transaction column
3. Add aggregates based on last week, last month, last quarter, last year
4. Deploy the code, Push the code, Inform partner about changes
5. Add initial data in `user/dashboard`
6. Add pagination
7. Think about caching, indexing, optimizing of query
8. run 2 instances of app in aws: latest-unstable, stable
## Minor fixes:
1. Changed action to version in changelog


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
   9. [x] GET /entity/:id
2. [x] Add hardcoded data for request and response schema
3. [x] Authentication
   1. [x] Make authentication feature using passport js using google strategy
   2. [x] Add hardcoded data for a test user, many entity and many transactions
   3. [x] Make an access token for accessing a test user
4. [x] Pagination for hardcoded data
5. [x] Filter for hardcoded data
6. [x] Sort for hardcoded data
7. [x] Connect to PostgreSQL using sequelize
8. [x] Make database schema
9.  [x] Make request object schema
10. [x] make reposnse object schema
11. [x] Add test folder based on mocha and chai library
12.  Add `/user` endpoint to get and edit user data
13.  Make aggregation of transactions
14.  Add option to make and send csv file
15.  Add optional analytics
16.  Add multiple transactions
17.  Update Multiple transactions
18.  Add cache for userId, now proxy is called 3 times, for deserialize, for id, for getting initial data wrt to query

### Version 2
1. Add aggregates functionality to get sum, count, min, max data
2. Think about presentation and behaviour for dashboard (few ideas on which we can work)
   1. Timeframe filter - 
      1. last day, last week, last month, last quarter, last year
      2. current day, current week, current month, current quarter, current year
   2. Total Credit Inflow and Outflow based on timeframe filter
   3. Vendor Chart - max by transaction, max by sum of amount based on timeframe filter
   4. Customer Chart - max by transaction, max by sum of amount based on timeframe filter
   5. Histogram of Inflow and Outflow reduced to components eg Sales, Purchase, Tax etc. based on timeframe filter
   6. Transaction table - paginated, search by category, paymentStatus, paymentMode


### Initial data
1. Entities associated with the userid
2. Latest 100 (or N) transactions
3. Person details: userSchema
4. Total Aggregates (to think about it)

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