const oracledb = require('oracledb');
oracledb.autoCommit = true;
createEmployee = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a employee',
        })
    }
    result  = await createDoc(req,res);
    return result
}

async function getConnection(){
 let connection;
    connection = await oracledb.getConnection(
      {
        user: "ADMIN",
        password: "Passwordoci*30",
        connectString: 'db202010231723_medium'
      });

return connection;
}

async function createDoc(req,res) {
  let connection;
 
  try {
    connection = await getConnection(); 
    // Create the parent object for SODA
    const soda = connection.getSodaDatabase();

    // Create a new SODA collection
    // This will open an existing collection, if the name is already in use.
    collection = await soda.createCollection("employee1");
    // Insert a document.  A system generated key is created by default.
    console.log(req.body.empid);
    console.log(req.body.name);
    console.log(req.body.emailid);
    console.log(req.body.phonenumber);
    console.log(req.body.address);
    content  = {empid: 1014882,name: "vaishali",
 emailid: "vaishali.nankani@oracle.com" ,phonenumber:7838076784,address: "delhi",_id: Math.random()};
    content.empid = req.body.empid;
    content.name = req.body.name;
    content.emailid = req.body.emailid;
    content.phonenumber = req.body.phonenumber;
    content.address= req.body.address;
    doc = await collection.insertOneAndGet(content);
    const key = doc.key;
    console.log("The key of the new SODA document is: ", doc.key);
    // Fetch the document back
    doc = await collection.find().fetchArraySize(0).key(key).getOne(); // A SodaDocument
    content = doc.getContent();
    content._id = key;                                        // A JavaScript object
    console.log(content);
    return res.status(201).json(content); 
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: err }) 
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
        return res.status(400).json({ success: false, error: err }) 
      }
    }
  }
}
updateEmployee = async (req, res) => {
    const body = req.body
    const id = req.params.id
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
  try {
    connection = await getConnection(); 
    // Create the parent object for SODA
    const soda = connection.getSodaDatabase();

    // Create a new SODA collection
    // This will open an existing collection, if the name is already in use.
    collection = await soda.createCollection("employee1");
    doc = await collection.find().key(id).replaceOneAndGet(req.body);
    employee = doc.getContent();          
    console.log(employee);
    return res.status(200).json({
                    success: true,
                    id: doc.key,
                    message: 'Employee updated!',
                }) 
  } catch (err) {
    console.error(err);
    return res.status(404).json({ success: false, error: err }) 
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err }) 
   }
  }
 } 
} 

deleteEmployee = async (req, res) => {
let connection;
let removed = false;

const id = req.params.id
try {
	connection = await getConnection(); 
    // Create the parent object for SODA
    const soda = connection.getSodaDatabase();

    // Create a new SODA collection
    // This will open an existing collection, if the name is already in use.
        collection = await soda.createCollection("employee1");
        doc = await collection.find().fetchArraySize(0).key(id).getOne();
        employee = doc.getContent();          
	removed = await collection.find().key(id).remove();
        return res.status(200).json({ success: true, data: employee }) 
}
catch(err) {
	console.error(err);
        return res.status(404).json({ success: false, error: err }) 
}
finally {
	if (connection) {
		try {
			await connection.close();
		}
		catch(err) {
			console.error(err);
                 return res.status(404).json({ success: false, error: err }) 
		}
	}
}
return removed;
}

getEmployeeById = async (req, res) => {
try{    
connection = await getConnection(); 
    // Create the parent object for SODA
    const soda = connection.getSodaDatabase();

    // Create a new SODA collection
    // This will open an existing collection, if the name is already in use.
    collection = await soda.createCollection("employee1");
const key = req.params.id
    doc = await collection.find().fetchArraySize(0).key(key).getOne(); // A SodaDocument
    employee = doc.getContent();                                        // A JavaScript object
    console.log(employee);
    return res.status(200).json({ success: true, data: employee })
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: err })
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err })
      }
    }
  }

}

getEmployees = async (req, res) => {
try{    
    connection = await getConnection();
    // Create the parent object for SODA
    const soda = connection.getSodaDatabase();

    // Create a new SODA collection
    // This will open an existing collection, if the name is already in use.
    collection = await soda.createCollection("employee1");
    documents = await collection.find().fetchArraySize(100).getDocuments(); // A SodaDocument
    var employees = []
   for (let i = 0; i < documents.length; i++) {
      employee = documents[i].getContent();
      employee._id = documents[i].key;
      employees.push(employee); 
    }
    console.log(employees);  
    return res.status(200).json({ success: true, data: employees })
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: err })
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
        return res.status(400).json({ success: false, error: err })
      }
    }
}
}

module.exports = {
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployees,
    getEmployeeById,
}
