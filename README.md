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
2. Authentication
   1. Make authentication feature using passport js using google strategy
   2. Add hardcoded data for a test user, many entity and many transactions
   3. Make an access token for accessing a test user
3. Pagination
4. Filter
5. Sort
6. Connect to PostgreSQL using sequelize
7. Make database schema
8. Make request object schema
9. make reposnse object schema
10. Add test folder based on mocha and chai library

## Database Schema

### User
```js
    const userSchema = {
        id: 'uuid',
        name: 'text',
        emailId: 'text',
        companyName: 'text',
        contact: 'text'
    }
```

### Entity
```js
    const entitySchema = {
        id: 'uuid',
        userId: 'uuid',
        name: 'text',
        address: 'text',
        contact: 'text'
    }
```

### Transaction
```js
    const transactionSchema = {
        id: 'uuid',
        userId: 'uuid',
        entityId: 'uuid',
        time: 'timestampz',
        paymentMode: 'text',
        paymentStatus: 'text',
        amount: 'money',
        category: 'text'
    }
```


## Request Schema

### Pagination 
```js
    const page = {
        cursor: "A data point in db",
        flow: start | end | before | after,
        limit: "any integer"
    }
```

### Filter
```js
    const filter = {
        time: {
            from: "datetime",
            to: "datetime"
        },
        entity: [],
        category: [],
        status: [],
        paymentMode: [],
        amount: {
            from: "integer",
            to: "integer"
        }
        amountPaid: {
            from: "integer",
            to: "integer"
        }
    }
```

### Sorting 
```js
    const sort = {
        sortBy: "A Paramater",
        reverse: true | false
    }
```

### request.query schema
```js
    const query = {
        filter: {},
        sort: {}
        page: {},
    }
```