
## Database Schema

### User
```js
    userSchema = {
        id: 'uuid',
        name: 'text',
        emailId: 'text',
        companyName: 'text',
        contact: 'text',
        token: 'text'
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

TIMESTAMP:

Request time format: "2018-12-06 02:16:39 -06:-30"<br>
Response time format: "2018-12-07T08:16:39.000Z" ([ISO string format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString))

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
        limitPerPage: "Natural number",
        currentPage: "Natural Number"
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
            from: "decimal",
            to: "decimal"
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
    "time": "2018-12-06 02:16:39 -06:-30",
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
        "time": "018-12-07T08:16:39.000Z",
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
        "time": "2018-12-06 02:16:39 -06:-30",
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
        "time": "2018-12-06 02:16:39 -06:-30",
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
            from: "decimal",
            to: "decimal"
        }
    },

    page: {
        limitPerPage: "Natural number",
        currentPage: "Natural Number"
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

PATCH /user/me

Request body:
```js
{
    "name": "Piyush Arya",
    "emailId": "piyusharya223@gmail.com",
    "companyName": "alpacino",
    "contact": "21129133"
}
```

Successful Response:
```js
{
    "error": false,
    "data": {
        "id": "2e107775-2b0d-4e24-af6c-8766c042fb09",
        "name": "Piyush Arya",
        "emailId": "piyusharya223@gmail.com",
        "companyName": "alpacino",
        "contact": "21129133",
        "token": null,
        "createdAt": "2021-04-09T14:02:17.412Z",
        "updatedAt": "2021-04-09T14:53:55.431Z"
    }
}
```

Failure response:
```js
{
    "error": false,
    "message": "company name cannot be left empty" | "contact cannot be left empty"
}
```
---

GET /user/me

Successful Response:
```js
{
    "error": false,
    "data": {
        "id": "2e107775-2b0d-4e24-af6c-8766c042fb09",
        "name": "Piyush Arya",
        "emailId": "piyusharya223@gmail.com",
        "companyName": "alpacino",
        "contact": "21129133",
        "token": null,
        "createdAt": "2021-04-09T14:02:17.412Z",
        "updatedAt": "2021-04-09T14:53:55.431Z"
    }
}
```


---

POST analytics/trend - get trends last 6 weeks/months/quarters/years

Request body:
```js
{
    "interval": "week" | "month" | "quarter" | "year" 
}
```

Failed response:
```js
{
    error: true,
    message: "Interval not allowed"
}
```

Successful response:
```js
{
    "error": false,
    "analytics": {
        "pending": {
            "inflow": {
                "countTransaction": 0,
                "totalAmount": 0,
                "components": []
            },
            "outflow": {
                "countTransaction": 1,
                "totalAmount": 2082.93,
                "components": [
                    {
                        "totalAmount": "2082.93",
                        "countTransactions": "1",
                        "startTime": "2020-10-01T00:00:00.000Z",
                        "paymentStatus": "NOT_PAID",
                        "category": "PURCHASE"
                    }
                ]
            }
        },
        "current": {
            "inflow": {
                "countTransaction": 0,
                "totalAmount": 0,
                "components": []
            },
            "outflow": {
                "countTransaction": 0,
                "totalAmount": 0,
                "components": []
            }
        },
        "message": "Trend since last 6 months"
    }
}
```
---

POST analytics/entity

Request Body
```js
{
    "time": {
       "from": "2018-01-03T06:17:43Z",
        "to": "2021-01-01T01:00:00Z"
    }
}
```
Date in ISO string format

Successful Response

```js
{
    "error": false,
    "analytics": {
        "pending": {
            "inflow": {
                "countTransaction": 0,
                "totalAmount": 0,
                "components": []
            },
            "outflow": {
                "countTransaction": 3,
                "totalAmount": 6419.51,
                "components": [
                    {
                        "totalAmount": "2192.33",
                        "countTransactions": "1",
                        "entityId": "3930b3f7-5cc0-4f22-be17-da2d0e482f37",
                        "entity": {
                            "name": "Headly Sawayn",
                            "contact": "9256057908"
                        }
                        "paymentStatus": "NOT_PAID",
                        "category": "PURCHASE"
                    },
                    {
                        "totalAmount": "2144.25",
                        "countTransactions": "1",
                        "entityId": "4a454efb-4818-4154-9729-bbdf40791fe7",
                        "entity": {
                            "name": "Richard Dawkins",
                            "contact": "6883729018"
                        }
                        "paymentStatus": "NOT_PAID",
                        "category": "PURCHASE"
                    },
                    {
                        "totalAmount": "2082.93",
                        "countTransactions": "1",
                        "entityId": "65327d08-9184-4d57-9f83-f7a646e92a58",
                        "entity": {
                            "name": "Simon Sawayn IV",
                            "contact": "6859057908"
                        }
                        "paymentStatus": "NOT_PAID",
                        "category": "PURCHASE"
                    }
                ]
            }
        },
        "current": {
            "inflow": {
                "countTransaction": 1,
                "totalAmount": 2691.15,
                "components": [
                    {
                        "totalAmount": "2691.15",
                        "countTransactions": "1",
                        "entityId": "65327d08-9184-4d57-9f83-f7a646e92a58",
                        "entity": {
                            "name": "Simon Sawayn IV",
                            "contact": "6859057908"
                        }
                        "paymentStatus": "PAID",
                        "category": "SALES"
                    }
                ]
            },
            "outflow": {
                "countTransaction": 0,
                "totalAmount": 0,
                "components": []
            }
        }
    }
}
```
---

POST analytics/cashflow

Request Body
```js
{
    "time": {
       "from": "2018-01-03T06:17:43Z",
        "to": "2021-01-01T01:00:00Z"
    }
}
```

Successful Response:
```js
{
    "error": false,
    "analytics": {
        "pending": {
            "inflow": {
                "countTransaction": 0,
                "totalAmount": 0,
                "components": []
            },
            "outflow": {
                "countTransaction": 3,
                "totalAmount": 6419.51,
                "components": [
                    {
                        "totalAmount": "6419.51",
                        "countTransactions": "3",
                        "category": "PURCHASE",
                        "paymentStatus": "NOT_PAID"
                    }
                ]
            }
        },
        "current": {
            "inflow": {
                "countTransaction": 1,
                "totalAmount": 2691.15,
                "components": [
                    {
                        "totalAmount": "2691.15",
                        "countTransactions": "1",
                        "category": "SALES",
                        "paymentStatus": "PAID"
                    }
                ]
            },
            "outflow": {
                "countTransaction": 0,
                "totalAmount": 0,
                "components": []
            }
        }
    }
}
```
POST analytics/csv

Request Body
```js
{
    "time": {
       "from": "2020-01-03T06:17:43Z",
        "to": "2021-05-01T01:00:00Z"
    },
    "interval": "year"
}
```
Successful Response:

> Returns a folder with .zip extension containig all reports

Failure Response:

> Returns a .json file

---

    For Cashflow Calculations:
    Pending amount is not calculated in cashflow report. Only the transactions whose status is "done" is taken into consideration.
    Current amount signifies the total cashflow, which will get written in cashflow report, while pending is an additional insight generated for user to manage his/her debt

<br>

    To get clear understanding of request and response specification, take a look at test/IntegrationTest/ directory
