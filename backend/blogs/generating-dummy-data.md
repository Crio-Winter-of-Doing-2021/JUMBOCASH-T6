# Seeding the database.

## Objective:
Populating any database using bare hands is a tedious task, but its needed nevertheless.
Since our Application is dependent on crunching financial data, so the more data we have the better.
We decided to seed the database before using it.
Now, the problem for us was, we cannot seed the database with any format, we needed the data to be **meaningful** and **strictly conforming to the schema**,
So in the initial stage of our development we used [json generator](https://www.json-generator.com/)

## Using json generator
Our requirement was to generate data for entity and transaction for a single user.
So we tweaked the format of the template to produce output with the following template.

Sample Entity:
```js
{
    "userId": "2e107775-2b0d-4e24-af6c-8766c042fb09",
    "id": "3930b3f7-5cc0-4f22-be17-da2d0e482f37",
    "name": "Stone Quinn",
    "address": "726 Christopher Avenue, Cetronia, Missouri, 4080",
    "contact": "+91 (969) 552-3445"
},
```
Sample Transaction:
```js
{
    "id": "1f55cc32-d7d5-44f7-aa77-22454190fe77",
    "userId": "2e107775-2b0d-4e24-af6c-8766c042fb09",
    "entityId": "3930b3f7-5cc0-4f22-be17-da2d0e482f37",
    "time": "2018-11-10 12:00:48 -06:-30",
    "paymentMode": "DEBIT_CARD",
    "paymentStatus": "NOT_PAID",
    "amount": 2192.33,
    "category": "PURCHASE"
},

```

## Challenges:
Now, since the transaction was functionally dependent on entity table, we wanted the json-gemerator to select uuid randomly from the given array of uuids. But it seemed that the generator was facing some issues while randomly selecting uuid. Now our only option was to randomly select a list of transaction generated and change their entityId manually, which is a time-taking task and is not feasible when operating on hundreds of transaction.
So, we decided to have only 20 transactions and 3 entity for sometime.

## Improvement:
After integrating authentication in our app, it was time to implement the analytics which will need hundreds to data points to test the api and its implementation logic.
So we selected [fakerator](https://www.npmjs.com/package/fakerator) for our use.

## Implementing:
Now, having got our own set of generator, we could tweak it for our use case.
Now our plan was to give a user Id and range of entity associated with the userId, and the range of transactions committed by entity, our generator should return two arrays containing entities and transactions.

```js
let {EntityList, TransactionList} = generateSeed("2e107775-2b0d-4e24-af6c-8766c042fb09", 10, 10, 30, 30)
```
This is the API interface of our seed generation.

```js

function generateSeed(userId, minEntityPool, maxEntityPool, minTransaction, maxTransactions) {

    let entities = [], transactions = [];

    for(let i = 1; i <= fakerator.random.number(minEntityPool, maxEntityPool); i++) {

        const entity = {
            "id": fakerator.misc.uuid(),
            "userId": userId,
            "name": fakerator.names.nameM(),
            "address": `${fakerator.address.street()}, ${fakerator.address.city()} ${fakerator.address.postCode()}`,
            "contact": fakerator.random.number(6*10**9, 10**10-1)
        }

        entities.push(entity);

        for(let i = 1; i <= fakerator.random.number(minTransaction, maxTransactions); i++) {
            
            const time = new Date(fakerator.date.recent(400));

            const trans = {
                "id": fakerator.misc.uuid(),
                "entityId": entity.id,
                "userId": userId,
                "time": time.toISOString(),
                "paymentStatus": fakerator.random.arrayElement(enums.paymentStatusList),
                "paymentMode": fakerator.random.arrayElement(enums.paymentModeList),
                "category": fakerator.random.arrayElement(enums.categoryList),
                "amount": fakerator.random.number(100, 20000)
            }

            transactions.push(trans);
        }
    }   

    // For shuffling transactions
    transactions.sort((a, b) => {
        return a.time > b.time
    });

    return {
        "EntityList": entities,
        "TransactionList": transactions
    }

}

```

## Features:
1. Transaction is generated with the desired ranges of entity id, without violating foreign key constraint.
2. Each entity will have random number of transaction, within specified lower and upper limit.

## Improvements:
Though the implementation was good enough for our use case, the parameters like amount and date can also be tweaked to introduce more realism in the seeded data.
