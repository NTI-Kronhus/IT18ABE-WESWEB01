var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://kronhus.tk:27017/";


exports.updateDb = function (email, name, message)
{
    console.log("test")
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        var query = { email: `${email}` };
        dbo.collection("WESWEB").find(query).toArray(function (err, result) {
          if (err) throw err;
          console.log("DEBUG")
          console.log(result);
          if (result.length!=0) {
            var newvalues = { $set: { name: `${name}`, message: `${message}` } };
            dbo.collection("WESWEB").updateOne(query, newvalues, function (err, res) {
              if (err) throw err;
              console.log("1 document updated");
              db.close();
            });
          } else {
            var myobj = { name: `${name}`, email: `${email}`, message: `${message}` };
            dbo.collection("WESWEB").insertOne(myobj, function (err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              db.close();
            });
          }
        });
      });
};