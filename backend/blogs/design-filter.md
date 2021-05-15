# Design of filter for Transaction

## Objective:

    Design a filter with following requirements:
    1. Filter transaction based on entity - search by entity
    2. Filter transaction between start date and end end date
    3. Filter transaction based on payment status - paid, or not paid
    4. Filter transaction based on mode of payment - Cash, credit card, debit card etc (though it is not mandatory)
    5. Filter transaction based on category - purchase, sales, asset liquidation, tax, employee payroll
    6. Filter transaction based on the amount (Not necessary an important use case, but helps in tracking unpaid transactions)
    7. Combination of all the above filters.

    Along with the filter, transaction could be sorted
    Based on our use case
    1. Time
    2. Amount
    Other keys being enum, so it was no point in sorting them in backend.
    It should also support reverse sorting

    Pagination of response, since it is not feasible to send all the data to the client.
    And the data which is already sent is stored in the frontend.

    So here is our final filter schema.


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

`time`: `from` and `to` accepts valid date format, else error message "Not a valid date format is displayed"
Both `from` and `to` are required keys if `time` attribute is used, so default time as agreed with the team can be used.

`entity`: accepts list of entity-id, which is then feeded as query into data base, displays null if entityID is not present or "Not a valid UUID" if entityId is not valid. Can be empty.

`category`, `status`, `paymentMode`: accepts a list of all categories, payment status, and payment modes respectively, with enums that is agreed upon. Can be empty.

`amount`: same as time, but should only contain a number upto 2 decimal places.



### Sorting 
```js
    sort = {
        key: "time" | "amount",
        reverse: true | false
    }
```

Accepts only `time` or `amount` as input in `key`.
Reverse to sort the tuples in decreasing order.

### Pagination 
```js
    page = {
        limitPerPage: "Natural number",
        currentPage: "Natural Number"
    }
```

Currently we use simple pagination, which is fine considering our requiremnets.
`limitPerPage` defines the maximum number of queries one page should contain.
`currentPage` defines the page which user request to view.

## Implementation

So there must be a route to detect the request and extract the json body, validate the attributes and their values, send the query to database and give the response.

Since our folder struture was already designed in such a waym that adding a new feature wont be a problem.

In routes/transaction.js
```js
router.post("/filter", transactionController.getTransactionsWithFilter);
// <base-url>/api/transaction/filter
```
Invokes the controller to fetch transactions using filter. Uses post method, so that request body cannot be limited due to size of the content.

In cotrollers/transaction.js
```js
const getTransactionsWithFilter = (req, res) => {
  const { sort, page, filter } = req.body;

  const userId = req.userId;

  console.log(sort, page, filter, userId);

  transactionProxy
    .findWithFilter(filter, sort, page, userId)
    .then((value) => {
      res.status(200).send({
        error: false,
        data: value,
      });
    })
    .catch((err) => {
      res.status(err.code).send({
        error: true,
        errorMessage: err.message,
      });
    });
};
```
`req.userId` is the attributed injected by passport module, after validating the user.

In proxy/transaction.js
```js
async function findWithFilter(filter, sort, page, userId) {
  try {
    let response = await Transaction.findAll({
      attributes: visibleAttribute,
      include: {
        model: Entity,
        attributes:['name']
        },
      where: {
        ...sanitizeFilter(filter),
        userId
      },
      order: sortResponse(sort),
      ...paginate(page)
    });

    return response;
  } catch (err) {
    errorHandler(err);
  }
}
```
Notice how we have abstracted away the mapping of filter away from proxy, as proxy should only deal with database handling.

In services/filter.js
```js
const {Op} = require('sequelize');

// sanitize the filter directive for database proxy
module.exports.sanitizeFilter = (filter) => {

    // time: {
    //     from: "datetime",
    //     to: "datetime"
    // },
    // entity: [],
    // category: [],
    // status: [],
    // paymentMode: [],
    // amount: {
    //     from: "integer",
    //     to: "integer"
    // }
    let filterDirective = {};

    const {time, amount, entity, category, status, paymentMode} = filter;

    if(entity && entity.length) {
        filterDirective.entityId = entity;
    } 

    if(category && category.length) {
        filterDirective.category = category;
    }

    if(paymentMode && paymentMode.length) {
        filterDirective.paymentMode = paymentMode;
    }

    if(status && status.length) {
        filterDirective.paymentStatus = status;
    }

    if(amount) {
        filterDirective.amount = {
            [Op.gte] : amount.from,
            [Op.lte]: amount.to
        }
    }

    if(time) {
        filterDirective.time = {
            [Op.gte] : time.from,
            [Op.lte]: time.to
        }
    }

    console.log(filterDirective)
    return filterDirective;

}
```

These functions execute together to provide the filter functionality in transaction.

## Challenges
The main challenge was to think about the request body for filtering based on our use case. Once we agreed upon the request schema, then implementing it was not a major challenge.

## Next steps:
1. Adding a validation check on each attributes before sending to the database.
2. Think about caching and optimization.
3. Display total pages in response.








    