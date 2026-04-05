import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import connectToDB from "./src/config/database.js";
import { startCronJobs } from "./src/utils/cronJobs.js";






const PORT = process.env.PORT || 3000;



const startServer = async () => {
    await connectToDB();
  
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
};


startServer();