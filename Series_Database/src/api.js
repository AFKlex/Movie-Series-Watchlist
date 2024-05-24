// Import Required functions
const { MongoClient } = require("mongodb");
const { ObjectId } = require('mongodb');

// Set Enviorment Variables from Docker Configuration 
const clientDB = process.env.dbname
console.log(clientDB)
const clientCollection = process.env.dbcollection
console.log(clientCollection)

const user = process.env.dbuser;
const pass = process.env.dbpass;

// Set MongoDB URL
const uri = "mongodb://"+user+":"+pass+"@mongoDB:27017";
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }); // Pass options for the MongoClient constructor

// Connect to the MongoDB server
client.connect(err => {
    if (err) {
        console.error("Error occurred while connecting to MongoDB:", err);
        return;
    }
    console.log("Connected to MongoDB successfully");
});

// Function for Adding Entries
async function addEntry(name = '', status = "Completed", score = 0, startDate = new Date(), finishDate = null, rewatchCount = 0, note = '',currentEpisode=0) {
    try {
        // Access the "todo" database and its "test" collection
        const database = client.db(clientDB);
        const collection = database.collection(clientCollection);

        // Parse date strings into Date objects
        startDate = startDate ? new Date(startDate) : new Date();
        finishDate = finishDate ? new Date(finishDate) : null;

        // Check types and apply defaults
        const DEFAULT_SCORE = 0; 
        const DEFAULT_REWATCH_COUNT = 0; 
        const DEFAULT_CURRENT_EPISODE = 1; 

        // Check Data types and if needed Assing Default Values 
        if (typeof name !== 'string') throw new Error('Name must be a string.');
        if (typeof status !== 'string') throw new Error('Note must be a string.');
        if (typeof score !== 'number' || isNaN(score)) score = DEFAULT_SCORE; 
        if (!(startDate instanceof Date)) throw new Error('startDate must be a Date object.');
        if (finishDate !== null && !(finishDate instanceof Date)) throw new Error('finishDate must be a Date object or null.');
        if (typeof rewatchCount !== 'number' || isNaN(rewatchCount)) rewatchCount = DEFAULT_REWATCH_COUNT; 
        if (typeof note !== 'string') throw new Error('Note must be a string.');
        if (typeof currentEpisode !== 'number' || isNaN(currentEpisode)) currentEpisode = DEFAULT_CURRENT_EPISODE; 

        // Check Score
        if(score >100){
            score = 100;
            console.log('Score was set to over 100. \nScore Reduced to 100\n'); 
        }else if(score < 0){
            score = 0;
            console.log('Score was set to smaller 0. \nScore increased to 0\n');
        }

        // Check rewatch count
        if(rewatchCount < 0){
            rewatchCount = 0;
            console.log('Rewatch Count was set to smaller 0. \nRewatch Count increased to 0\n');
        }

        //Check Current Episode 
        if(currentEpisode < 0){
            currentEpisode = 0;
            console.log('CurrentEpisode Count was set to smaller 0. \nCurrentEpisode increased to 0\n');
        }

        // Create a document for insert
        const doc = {
            name: name,
            status: status,
            score: score,
            startDate: startDate,
            finishDate: finishDate,
            rewatchCount: rewatchCount,
            currentEpisode:currentEpisode,
            note: note
        };

        // Insert the defined document into the "collection" collection
        const result = await collection.insertOne(doc);

        // Print the ID of the inserted document
        console.log(`A document was inserted with the _id: ${result.insertedId}`);

    } catch (error) {
        console.error("Error occurred while inserting document:", error);
    }
}

// Function for Getting all Entries
async function getallEntries() {
    try {
        // Acces DB and Collection
        const database = client.db(clientDB);
        const collection = database.collection(clientCollection);

        // Await the result of the query
        const result = await collection.find({}).toArray();
        
        // Log the result
        console.log(`All Todos were successfully retrieved:`, result);
        
        // Return the result
        return result;

    } catch (error) {
        console.error("Error occurred while retrieving todos:", error);
        throw error; // Re-throw the error to propagate it
    }
}

// Function to remove Entries
async function removeEntry(entryId) {
    try {
        // Access the DB and Collection
        const database = client.db(clientDB);
        const collection = database.collection(clientCollection);
        console.log(entryId);

        // Check if entryId is a valid ObjectId
        if (!ObjectId.isValid(entryId)) {
            throw new Error('Invalid ObjectId format for entryId.');
        }

        // Convert entryId to a string and then create an ObjectId instance
        const objectId = ObjectId.createFromHexString(String(entryId));

        // Construct the filter to delete the entry by its _id field
        const filter = { _id: objectId };

        // Perform the deletion operation
        const result = await collection.deleteOne(filter);

        // Check if deleted Successfully
        if (result.deletedCount === 1) {
            console.log('Document successfully deleted.');
        } else {
            console.log('Document not found.');
        }
    } catch (error) {
        console.error('Error occurred while deleting document:', error);
    }
}


// Handle process termination to close the MongoDB client connection
process.on('SIGINT', async () => {
    try {
        console.log("Closing MongoDB connection...");
        await client.close();
        console.log("MongoDB connection closed successfully");
    } catch (error) {
        console.error("Error occurred while closing MongoDB connection:", error);
    } finally {
        process.exit(0);
    }
});

// Export functions for app.js
module.exports = {
    addEntry: addEntry,
    getallEntries: getallEntries,
    removeEntry: removeEntry
};