import mongoose from "mongoose";

//Database connection: DB is always in different continent, and it takes time for the connection, and it can even fail.

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

//The value that will return from the database connection will be a promise, and we don't care what kind of data is returned in promise so "void"
async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("DB connection already exists");
        return
    }

    try{
       const db = await mongoose.connect(process.env.MONGODB_URI || '');
       console.log("DB we got is: ",db);
        connection.isConnected = db.connections[0].readyState;
    } catch (error){
        console.log("Database connection failed", error);
        process.exit(1)
    }
}

export default dbConnect;