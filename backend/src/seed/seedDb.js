const {User, Entity, Transaction } = require('../models/index');
const EntityList = require('./entity');
const TransactionList = require('./transaction');

// ==== Seed user table with single user
const newUserList = [{
    id: "2e107775-2b0d-4e24-af6c-8766c042fb09",
    name: "Joe Biden",
    emailId: "Joe23biden12@potus.us",
    companyName: "Mudikhana",
    contact: "21233232324"
  },
  {
    "id":"9ab3b39b-9aee-438a-88bf-bae9833d0926",
    "name":"Piyush Arya",
    "emailId":"piyusharya223@gmail.com",
    "companyName":null,
    "contact":null,
    "token":"ya29.a0AfH6SMAfuaf99l3DSkRUZtfdEsfYJGjpynpv8tON6kjFiC0SHKA5iZ4MTCDyk1cFvYX1GzGk66Cb-lQInO58fumq8AyNMu4esPGWvNGGvHonX3UF-bS3qsWJH0nitQM2Ts9uh9n-b1by-2ERubErLHs5W6dB"
  }]

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
