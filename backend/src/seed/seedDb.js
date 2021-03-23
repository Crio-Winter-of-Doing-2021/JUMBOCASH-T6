const {User, Entity, Transaction } = require('../models/index');
const EntityList = require('./entity');
const TransactionList = require('./transaction');

// ==== Seed user table with single user
const newUser = {
    id: "2e107775-2b0d-4e24-af6c-8766c042fb09",
    name: "Joe Biden",
    emailId: "Joe23biden12@potus.us",
    companyName: "Mudikhana",
    contact: "+21 233232324"
  }

const seed = async () => {

    await require('../proxy/user').create(newUser).then((value) => {
        console.log(value);
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