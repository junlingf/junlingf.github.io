

async function add(){
    const {MongoClient} = require('mongodb');
    const uri = "mongodb+srv://junlingf:iU3KvW4id9aqo2sQ@cluster0.kc8ue.mongodb.net/WebApp?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    var input = document.getElementById('filename'), fileName = input.value;
    alert("record: "+fileName);
    async function createListing(client, newListing){
        const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
        console.log(`New listing created with the following id: ${result.insertedId}`);
    };

    async function listDatabases(client){
        databasesList = await client.db().admin().listDatabases();
     
        alert("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    };
    
    
    
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  createListing(
            client,
            {
                name: fileName,
                summary: "it is a test",
                bedrooms: 1,
                bathrooms: 1
            }
        );
        await listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
};






