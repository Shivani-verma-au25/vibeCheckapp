import { app } from "./src/app.js";
import { configrations } from "./src/config/congi.js";
import { connectToDB } from "./src/db/db.js";
import redis from './src/config/cache.js'



connectToDB().then(() => (
        app.listen(configrations.port , () => {
        console.log(`Server is running on port ${configrations.port}`);
    })
)).catch((error) => (
    console.log("Error while connecting to the server",error)
    
))
