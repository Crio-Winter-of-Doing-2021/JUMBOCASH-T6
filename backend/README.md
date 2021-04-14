# JUMBOCASH-T6
Team ID: JUMBOCASH-T6 | Team Members: Kanishka Chowdhury &amp; Piyush Arya

--- 
### Current Version Developed: 7.2

### Current Version Deployed: 7.2
---

## Branch: cwod-final

## To Know More
### [README.md](#)
### [schema.md](schema.md) - Contains API contracts and table schema
### [changelog.md](changelog.md) - Timeline of API development
### backend-feature branch

## Links to blog
1. [Authentication workflow](blogs/Authentication.md)
2. [Some useful commands and snippets to handle file in Node.js](blogs/file-handling.md)
3. [Designing filter](blogs/design-filter.md)
4. [Writing, managing and sending multiple files in a go](blogs/file-writing.md)
5. [Folder-structure](blogs/folder-structure.md)
6. [Seeding with dummy-data](blogs/generating-dummy-data.md)
7. [Challenges and next step](blogs/vulnerability.md)

## How to Run
Compile the frontend:
> **npm run build**
> Replace the build folder in the `/backend` 

To run the application
> **npm start**
> 
> **npm run start-dev** (starts with nodemon)

<br>

      To get clear understanding of request and response specification, take a look at test/IntegrationTest/ directory, but ignore the body of 2xx response



## Todo
### Version 1
1. [x] Add endpoints
   1. [x] GET /entity
   2. [x] POST /entity
   3. [x] GET /transaction
   4. [x] POST /transaction
   5. [x] PATCH /transaction/:id
   6. [x] GET /transaction/:id
   7. [x] GET /login
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
12. [x] Add `/user` endpoint to get and edit user data
13. [x] Make aggregation of transactions
14. [x] Add option to make and send csv file
15. [x] Add optional analytics
16. [x] Add multiple transactions
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