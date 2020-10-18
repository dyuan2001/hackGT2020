const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://dyuan2001:OzZb82ILndheENzV@cluster0.lt7pk.mongodb.net/<dbname>?retryWrites=true&w=majority";


async function main() {
    const client = new MongoClient(uri);
    try {
        await client.connect();

        await listDatabases(client);
    
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
