const {User, Entity, Transaction } = require('../models/index');
// ====== DEPRECATED
// let EntityList = require('./entity');
// let TransactionList = require('./transaction');

// ==== New version
const generateSeed = require("./newTransaction");
let {EntityList, TransactionList} = generateSeed("2e107775-2b0d-4e24-af6c-8766c042fb09", 10, 10, 30, 30)
let {EntityList2, TransactionList2} = generateSeed("9ab3b39b-9aee-438a-88bf-bae9833d0926", 10, 10, 30, 30)

EntityList.concat(EntityList2);
TransactionList.concat(TransactionList2);

// ==== Seed user table with single user
const newUserList = [{
    "id":"9ab3b39b-9aee-438a-88bf-bae9833d0926",
    "name": "Kanishka Chowdhury",
    "emailId": "ckanishka24@gmail.com",
    "companyName": "Kanishka's Store",
    "contact": "21233232324",
    "token": null
  },
  {
    
    "id": "2e107775-2b0d-4e24-af6c-8766c042fb09",
    "name":"Piyush Arya",
    "emailId":"piyusharya223@gmail.com",
    "companyName":null,
    "contact":null,
    "token": null
  }
]

// "name":"Kanishka Chowdhury",
// "emailId":"ckanishka24@gmail.com",

const seed = async () => {

    await User.bulkCreate(newUserList).then((value) => {
        console.log("seeded user");
    }).catch(err => {
        console.log(err);
    })
    
    // ==== Seed Entity table
    await Entity.bulkCreate(EntityList).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
        console.log("seeded Entity")
      }).catch(err => {
        console.log(err) // ... in order to get the array of user objects
      })
    
    await Transaction.bulkCreate(TransactionList).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
      console.log("seeded Transaction")
    }).catch(err => {
      console.log(err) // ... in order to get the array of user objects
    })
}

seed();
