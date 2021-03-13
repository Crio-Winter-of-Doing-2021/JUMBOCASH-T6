
## Database Schema

### User
```js
    userSchema = {
        id: 'uuid',
        name: 'text',
        emailId: 'text',
        companyName: 'text',
        contact: 'text'
    }
```

### Entity
```js
    entitySchema = {
        id: 'uuid',
        userId: 'uuid',
        name: 'text',
        address: 'text',
        contact: 'text'
    }
```

### Transaction
```js
    transactionSchema = {
        id: 'uuid',
        userId: 'uuid',
        entityId: 'uuid',
        time: 'timestampz',
        paymentMode: 'text',
        paymentStatus: 'text',
        amount: 'integer',
        category: 'text'
    }
```
ENUMS

1. paymentMode: CASH, DEBIT_CARD, CREDIT_CARD, UPI
2. paymentStatus: PAID, NOT_PAID (PAID PARTIALLY - in future)
3. category: SALES, PURCHASE, EMPLOYEE, TAX, ASSET_LIQUIDATION

Scope for adding more enums in future

Timestampz example: "2018-12-06T02:16:39 -06:-30" - issue

---

## Request Schema for FILTER-PAGE-SORT

- Why is it made?
  - In an attempt to provide full autonomy to frontend developer for developing dynamic search filter, with paginations and sort by functionality.
  - The frontend developer can use it or implement filter in frontend, depending upon the **agreement**, but **“Better to have, and not need, than to need, and not have.”**
- Does frontend needs it:
  - It totally depends on the frontend-developer as to how he wants to design the search functionality.
  - The request to the endpoint can be made considering the query-processing time vs response-payload size tradeoff.
  

### Pagination 
```js
    page = {
        cursor: {id: "id"},
        flow: "start" | "end",
        limit: "any integer"
    }
```

### Filter
```js
    filter = {
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
    }
```

### Sorting 
```js
    sort = {
        key: "time" | "amount",
        reverse: true | false
    }
```

## API endpoints
### Version1 

GOAL: 
1. How request and response needs to performed between frontend and backend
2. Design of frontend dashboard and user
3. Backend to database CRUD operation
4. That's why only one userId will remain in user table, ie, single user application

GET /entities

Returns an array of entity conforming to entitySchema or an empty array

Response:  
```js
{
    error: false,
    data: [...entityArray]
}
```
---

POST /entities

Accepts a json of userSchema and returns created object or error

Request:  
```js
{
    "userId": "2e107775-2b0d-4e24-af6c-8766c042fb09",
    "name": "Douglas Dillon",
    "address": "493 Bragg Street, Northridge, Northern Mariana Islands, 4486",
    "contact": "+91 (945) 438-3642"
    
}
```
Successful response:  
```js
{
    error: false,
    user: {
      "userId": "2e107775-2b0d-4e24-af6c-8766c042fb09",
      "id": "4a454efb-4818-4154-9729-bbdf40791fe7",
      "name": "Douglas Dillon",
      "address": "493 Bragg Street, Northridge, Northern Mariana Islands, 4486",
      "contact": "+91 (945) 438-3642"
    }
}
```
Failed response:  
```js
{
    error: true,
    errorMessage: "error message" | "{field} Cannot be left empty" | "contact specification violation"
}
```
---

GET /transactions

Returns an array of transactions conforming to transactionSchema or an empty array

Response:  
```js
{
    error: false,
    data: [...transactionArray]
}
```

---
POST /transactions

Accepts a json of transactionSchema and returns created object or error

Request:  
```js
{
    "userId": "2e107775-2b0d-4e24-af6c-8766c042fb09",
    "entityId": "65327d08-9184-4d57-9f83-f7a646e92a58",
    "time": "2018-12-06T02:16:39 -06:-30",
    "paymentMode": "CASH",
    "paymentStatus": "PAID",
    "amount": 2691.15,
    "category": "SALES"
}
```
Successful response:  
```js
{
    error: false,
    transaction: {
        "id": "c5857cea-a5e5-4c85-b9b5-d99de8d7971e",
        "userId": "2e107775-2b0d-4e24-af6c-8766c042fb09",
        "entityId": "65327d08-9184-4d57-9f83-f7a646e92a58",
        "time": "2018-12-06T02:16:39 -06:-30",
        "paymentMode": "CASH",
        "paymentStatus": "PAID",
        "amount": 2691.15,
        "category": "SALES"
    }
}
```
Failed response:  
```js
{
    error: true,
    errorMessage: "Any message" | "unprocessable entity in {field-name}" | "Unsupported enum in {field-name}
}
```
---
GET /transaction/:id

Returns an object of transaction conforming to transactionSchema

Successful response:  
```js
{
    error: false,
    transaction: {
        "id": "c5857cea-a5e5-4c85-b9b5-d99de8d7971e",
        "userId": "2e107775-2b0d-4e24-af6c-8766c042fb09",
        "entityId": "65327d08-9184-4d57-9f83-f7a646e92a58",
        "time": "2018-12-06T02:16:39 -06:-30",
        "paymentMode": "CASH",
        "paymentStatus": "PAID",
        "amount": 2691.15,
        "category": "SALES"
    }
}
```
Failed response:  
```js
{
    error: true,
    errorMessage: "Not found" 
}
```

---
PATCH /transaction/:id

Updates an object of transaction conforming to transactionSchema

Request:
```js
{
    "paymentStatus": "PAID",
}
```

Successful response:  
```js
{
    error: false,
    transaction: {
        "id": "c5857cea-a5e5-4c85-b9b5-d99de8d7971e",
        "userId": "2e107775-2b0d-4e24-af6c-8766c042fb09",
        "entityId": "65327d08-9184-4d57-9f83-f7a646e92a58",
        "time": "2018-12-06T02:16:39 -06:-30",
        "paymentMode": "CASH",
        "paymentStatus": "PAID",
        "amount": 2691.15,
        "category": "SALES"
    }
}
```
Failed response:  
```js
{
    error: true,
    errorMessage: "Not found" | "Enum not supported" | "Unprocessable entity" 
}
```
---
POST /transactions/filter

Returns an array of transaction conforming to transactionSchema or empty array

Request:
```js
{
    filter: {
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
    },

    page: {
        cursor: {id: "id"},
        flow: "start" | "end",
        limit: "any integer"
    },

    sort: {
        key: "time" | "amount",
        reverse: true | false
    }
    
}
```
Successful response:  
```js
{
    error: false,
    data: [...transactionArray]
}
```
Failed response:  
```js
{
    error: true,
    errorMessage: "Any message" | "unprocessable entity in {field-name}" | "case-specific error" | "Unsupported enum in {field-name}
}
```

POST /login

---

PATCH /entity/:id

---

PATCH /user

---

GET /user

To get clear understanding of request and response specification, take a look at test/IntegrationTest/ directory
