# Generating file in Node.js

## Background:
Our Analytics API was almost ready except, we needed to export all the insights into a file in csv format. 

> CSV file can contain only a single table.

This is a pretty simple infromation but I realized it the hard way!!


## Implementation
We used [json2csv](https://www.npmjs.com/package/json2csv) package to write the json into csv file.
Now, since we had to write multiple files in each request, we let the node perform the task in parallel way using `Promise.all`.


Implementation of `Promise.all`
```js
    await Promise.all([
      writeCsvHelper(`current-inflow.csv`, cashflow.current.inflow.components),
      writeCsvHelper(`current-outflow.csv`, cashflow.current.outflow.components),
      writeCsvHelper(`pending-inflow.csv`, cashflow.pending.inflow.components),
      writeCsvHelper(`pending-outflow.csv`, cashflow.pending.outflow.components),
    
      writeCsvHelper(`entity-current-inflow.csv`, pretifyEntity(entityAnalytics.current.inflow.components) ),
      writeCsvHelper(`entity-current-outflow.csv`, pretifyEntity(entityAnalytics.current.outflow.components) ),
      writeCsvHelper(`entity-pending-inflow.csv`, pretifyEntity(entityAnalytics.pending.inflow.components) ),
      writeCsvHelper(`entity-pending-outflow.csv`, pretifyEntity(entityAnalytics.pending.outflow.components) )

    ]);
```

Implementation of `writeCsvHelper`
```js
async function writeCsvHelper(filePath, data, opts = {}) {

  try {

  const csv = await parseAsync(data, opts);

  return new Promise(function(resolve, reject) {
    fs.writeFile(filePath, csv, { encoding: "utf-8" }, function(err) {
        if (err) reject(err);
        else resolve(true);
    });
  });

  } catch (err) {
    errorHandler(err);
  }

}
```
`Promise.all` does only await multiple promises. It doesn't care in what order they resolve, or whether the computations are running in parallel.

## Send the files as response

We used [express-zip](https://www.npmjs.com/package/express-zip) package to compress multiple files into a single rar file and send as response.


Implementation of express-zip in controllers/analytics.js:
```js
async function generateCsvReport (req, res) {

  const userId = req.userId;
  const {from, to} = req.body.time;
  const interval = req.body.interval;

  console.log(`get report for ${userId} for current ${interval}`);

  analyticsProxy
    .getReport(userId, interval, from, to)
    .then((value) => {
      res.zip([
        { path: `current-inflow.csv`, name: `current-inflow.csv` },
        { path: `current-outflow.csv`, name: `current-outflow.csv` },
        { path: `pending-inflow.csv`, name: `pending-inflow.csv` },
        { path: `pending-outflow.csv`, name: `pending-outflow.csv` },
        { path: `entity-current-inflow.csv`, name: `entity-current-inflow.csv` },
        { path: `entity-current-outflow.csv`, name: `entity-current-outflow.csv` },
        { path: `entity-pending-inflow.csv`, name: `entity-pending-inflow.csv` },
        { path: `entity-pending-outflow.csv`, name: `entity-pending-outflow.csv` },
      ]);
    })
    .catch((err) => {
      res.status(err.code).send({
          error: true,
          errorMessage: err.message,
      });
    });
}
```

So here, our file is ready, but wait, they are generated in the root directory, and Implementation currently assumes that report is generated for a single user, but what if multiple users want to generate the report, we cannot use the same file name for all users, and express-zip does not send any folders.

The hack: We moved all the files concerning each user into the report folder in root directory, with each of the user getting their own folder based on their user ID.

So our implementation was tweaked to create and fetch files from the user id sub-directory in report directory.


Inclusion of folder in path:
```js
async function getReport(userId, cashflow, entityAnalytics, trend) {

  try {

    if (!fs.existsSync(`report/${userId}`)){
      fs.mkdirSync(`report/${userId}`);
    }

    await Promise.all([
      writeCsvHelper(`report/${userId}/current-inflow.csv`, cashflow.current.inflow.components),
      writeCsvHelper(`report/${userId}/current-outflow.csv`, cashflow.current.outflow.components),
      writeCsvHelper(`report/${userId}/pending-inflow.csv`, cashflow.pending.inflow.components),
      writeCsvHelper(`report/${userId}/pending-outflow.csv`, cashflow.pending.outflow.components),
    
      writeCsvHelper(`report/${userId}/entity-current-inflow.csv`, pretifyEntity(entityAnalytics.current.inflow.components) ),
      writeCsvHelper(`report/${userId}/entity-current-outflow.csv`, pretifyEntity(entityAnalytics.current.outflow.components) ),
      writeCsvHelper(`report/${userId}/entity-pending-inflow.csv`, pretifyEntity(entityAnalytics.pending.inflow.components) ),
      writeCsvHelper(`report/${userId}/entity-pending-outflow.csv`, pretifyEntity(entityAnalytics.pending.outflow.components) )

    ]);

    return true;

  } catch (err) {
    errorHandler(err);
  }

}
```

In controllers/analytics.js:
```js
async function generateCsvReport (req, res) {

  const userId = req.userId;
  const {from, to} = req.body.time;
  const interval = req.body.interval;

  console.log(`get report for ${userId} for current ${interval}`);

  analyticsProxy
    .getReport(userId, interval, from, to)
    .then((value) => {
      res.zip([
        { path: `report/${userId}/current-inflow.csv`, name: `${userId}/current-inflow.csv` },
        { path: `report/${userId}/current-outflow.csv`, name: `${userId}/current-outflow.csv` },
        { path: `report/${userId}/pending-inflow.csv`, name: `${userId}/pending-inflow.csv` },
        { path: `report/${userId}/pending-outflow.csv`, name: `${userId}/pending-outflow.csv` },
        { path: `report/${userId}/entity-current-inflow.csv`, name: `${userId}/entity-current-inflow.csv` },
        { path: `report/${userId}/entity-current-outflow.csv`, name: `${userId}/entity-current-outflow.csv` },
        { path: `report/${userId}/entity-pending-inflow.csv`, name: `${userId}/entity-pending-inflow.csv` },
        { path: `report/${userId}/entity-pending-outflow.csv`, name: `${userId}/entity-pending-outflow.csv` },
      ]);
    })
    .catch((err) => {
      res.status(err.code).send({
          error: true,
          errorMessage: err.message,
      });
    });
}
```

## Features
1. All operation of file creation are happening parallelly.
2. Reports are saved in user-specific directory.
3. Reports are received in a folder which eases access and file handling.

## Challenges
1. Writing multiple files and storing in directory can increase slug size of the app in the run time. 




