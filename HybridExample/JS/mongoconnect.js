// Retrieve
const { MongoClient } = require("mongodb");

// Connect to the db/ create it
const url = "mongodb://localhost:27017/names";
const options = { useUnifiedTopology: true };
MongoClient.connect(url, options, (err, db) => {
  if (err) {
    return console.dir(err);
  }

  let dbo = db.db("names");
  let doc1 = { doc1: "doc1" };
  let doc2 = { doc2: "doc2" };
  let lotsOfDocs = [{ doc3: "doc3" }, { doc4: "doc4" }];

  dbo.collection("customers").insertMany(lotsOfDocs, (err, res) => {
    if (err) throw err;
    console.log(`Success! ${JSON.stringify(res)}`);
    db.close();
  });
});
