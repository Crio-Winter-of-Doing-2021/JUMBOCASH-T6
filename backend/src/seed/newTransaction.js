const fakerator = require('fakerator')();
const enums = require("../../config/data");

/**
 * TODO:
 * 1. Generate entity
 *      1. Generate UUID
 *      2. Take userId
 *      3. Genratre name
 *      4. address
 *      5. Contact
 * 
 */

// // uuid
// console.log(`UUID: ${fakerator.misc.uuid()}`)
// // name
// console.log(`name: ${fakerator.names.nameM()}`)
// // choose from a list
// let category = fakerator.random.arrayElement(enums.categoryList);
// console.log(`category: ${category}`);
// // address
// console.log(`name: ${fakerator.address.street()}, 
//     ${fakerator.address.city()}, 
//     ${fakerator.address.country()}, 
//     ${fakerator.address.postCode()}`)
// // time
// let date = new Date(fakerator.date.recent(1000));
// console.log(`date: ${date.toISOString()}`);

// // contact
// let contact = fakerator.random.number(6*10**9, 10**10-1);
// console.log(`contact: ${contact}`);

/**
 * 
 * @param {'UUID'} userId - user id present in db
 * @param {Number} minEntityPool - minimum number of entity per user
 * @param {Number} maxEntityPool - maximum number of entity per user
 * @param {Number} minTransaction - minimum number of transaction per entity
 * @param {Number} maxTransactions - minimum number of transaction per entity
 * 
 */
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

    transactions.sort((a, b) => {
        return a.time > b.time
    });

    return {
        "EntityList": entities,
        "TransactionList": transactions
    }

}

// generateEntity("2e107775-2b0d-4e24-af6c-8766c042fb09")


// const {entities, transactions} = generateEntity("2e107775-2b0d-4e24-af6c-8766c042fb09", 1, 3, 6, 8)

// console.log(`Entities:`);
// console.log(entities, entities.length);
// console.log(`Transactions:`);
// console.log(transactions, transactions.length);

module.exports = generateSeed;




/**
 * Generate Transaction
 *      take userId
 *      Take entityId
 *      UUId
 *      time
 *      category
 *      paymentMode
 *      paymentStatus
 *      amount
 *      
 * make it more realistic
 * tax should be 100, 1000
 * purchase: 1000, 10000
 * sales: 100, 10000
 * asset liq: 5000 15000
 * employee: 5000 15000
 * 
 */

