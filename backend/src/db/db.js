import mongoose from  'mongoose'
import { configrations } from '../config/congi.js';


export const connectToDB = async () => {
    try {
        const dbInstanse = await mongoose.connect(configrations.mongo_uri);
        console.log("Connected to the db ;-" , dbInstanse.connection.host);
    } catch (error) {
        console.log("Getting Error while connecting to the host" , error);
        process.exit(1)
        
    }
}