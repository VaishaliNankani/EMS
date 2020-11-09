const oracledb = require('oracledb');
 
 
// The general recommendation for simple SODA usage is to enable autocommit
oracledb.autoCommit = true;
 
async function run() {
  let connection;
 
  try {
    connection = await oracledb.getConnection(
      {
        user: "ADMIN",
        password: "Passwordoci*30",
        connectString: "db202010231723_medium"
      });
 
    // Create the parent object for SODA
    const soda = connection.getSodaDatabase();
 
    // Create a new SODA collection
    // This will open an existing collection, if the name is already in use.
    collection = await soda.createCollection("mycollection");
 
    // Insert a document.  A system generated key is created by default.
    content = {name: "Matilda", address: {city: "Melbourne"}};
    doc = await collection.insertOneAndGet(content);
    const key = doc.key;
    console.log("The key of the new SODA document is: ", key);
 
    // Fetch the document back
    doc = await collection.find().fetchArraySize(0).key(key).getOne(); // A SodaDocument
    content = doc.getContent();                                        // A JavaScript object
    console.log(content);
let js
    console.log(content.name); 
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}
 
run();
