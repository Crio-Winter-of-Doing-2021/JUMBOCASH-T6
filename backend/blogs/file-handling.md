# File Handling in Node

These are some of the commands and snippets, which we used in our implementation.   

## Check if the folder exists.
```js
    fs.existsSync('<path>/<folder-name>')
```

## Create a new folder
```js
    fs.mkdirSync('<path>/<folder-name>')
```

## Create a new file
```js
fs.writeFile(filePath, csv, { encoding: "utf-8" }, function(err) {
        if (err) {
            return console.error(`Error in writing file: ${err}`);
        }
        console.log("File created");
    });
```

## Create a new file asynchronously
```js
  return new Promise(function(resolve, reject) {
    fs.writeFile(filePath, csv, { encoding: "utf-8" }, function(err) {
        if (err) reject(err);
        else resolve(true);
    });
  });
```

## Remove a folder which may or may not contain file
```js
const fs = require("fs")

const removeDir = function(path) {

    try {
        if (fs.existsSync(path)) {
        const files = fs.readdirSync(path)

        if (files.length > 0) {
            files.forEach(function(filename) {
            if (fs.statSync(path + "/" + filename).isDirectory()) {
                removeDir(path + "/" + filename)
            } else {
                fs.unlinkSync(path + "/" + filename)
            }
            })
            fs.rmdirSync(path)
        } else {
            fs.rmdirSync(path)
        }
        } else {
        console.log("Directory path not found.")
        }
    } catch (err) {
        console.error("Error in cleaning directory occured", err)
    }
}
```

## Schedule the cleaning operation
```js
// Runs in every 50 minutes (3000 s).
setInterval(function() {
  removeDir(path.join(__dirname, "report"));
  if (!fs.existsSync(`report`)){
    fs.mkdirSync(`report`);
  }
  console.log("cleaned Directory report")
}, 3000 * 1000);
```
