import { app } from "./src/app.js";
import { configrations } from "./src/config/congi.js";



app.listen(configrations.port , () => {
    console.log(`Server is running on port ${configrations.port}`);
    
})