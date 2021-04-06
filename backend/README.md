# JUMBOCASH-T6
Team ID: JUMBOCASH-T6 | Team Members: Kanishka Chowdhury &amp; Piyush Arya

--- 
### Current Version Developed: 6.0

### Current Version Deployed: 6.0
---

## Branch: backend-feature
1. All experimental features
2. Untested features

## To Know More
### [README.md](#)
### [schema.md](schema.md)
### [changelog.md](changelog.md) - for viewing new features in Version-6.0

## How to Run
To run the application
> **npm start**
> 
> **npm run start-dev** (starts with nodemon)

<br>

      To get clear understanding of request and response specification, take a look at test/IntegrationTest/ directory, but ignore the body of 2xx response

## Note from backend developer (6th April):

      For Cashflow Calculations:
      Pending amount is not calculated in cashflow report. Only the transactions whose status is "done" is taken into consideration.
      Current amount signifies the total cashflow, which will get written in cashflow report, while pending is an additional insight generated for user to manage his/her debt.
      Inflow is basically what comes in cash/cashless, Outflow is what goes out in cash/cashless.

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
13. [x] Make aggregation of transactions
14.  Add option to make and send csv file
15. [x] Add optional analytics
16.  Add multiple transactions
17.  Update Multiple transactions
18.  Add cache for userId, now proxy is called 2 times, for deserialize, for id, for getting initial data wrt to query

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
4. Total Aggregates

### Aggregations
1. Window: weekly, monthly, quaterly, yearly
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
   1. comparison with last 5 time intervals (week, mth, qtr, yr)
   2. % breakdown in inflow and outflow