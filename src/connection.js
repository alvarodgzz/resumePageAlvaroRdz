
const { MongoClient } = require('mongodb');

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://alrod21:admin123@cluster0.ylt2p.mongodb.net/sample_airbnb?retryWrites=true&w=majority";

    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.3/api/MongoClient.html for more details
     */
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        /*await listDatabases(client);
        await createListing(client, {
            name: "Oscar Peña",
            email: "oscarpena@gmail.com"
        });*/
        await createMultipleListings(client, [
            {
                name: "Hernan Lopez",
                email: "hlopez@gmail.com"
            },
            {
                name: "Claudia Gonzalez",
                email: "claudiaedithgzz@hotmail.com"
            },
            {
                name: "Yannine Rodríguez",
                email: "yanninerdzg@gmail.com"
            },
            {
                name: "Marco Garza",
                email: "marcogarzadosmil@gmail.com"
            }
        ]);

    } catch (e) {
        console.error(e);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);


async function createListing(client, newListing){
    const result = await client.db("alvaro_db").collection("contactos").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
};

async function createMultipleListings(client, newListings){
    const result = await client.db("alvaro_db").collection("contactos").insertMany(newListings);

    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);

};

/**
 * Print the names of all available databases
 * @param {MongoClient} client A MongoClient that is connected to a cluster
 */
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

