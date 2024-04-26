import mongoose from "mongoose";

import {DATABASE_NAME} from "../constants.js";


const connectionDb = async() => {
try {
      const connectionInstance = await mongoose.connect(`${process.env.MONDO_DB_URL}/${DATABASE_NAME}`);
       console.log(`\n mongoDB connected !!  Host DB ${connectionInstance.connection.host}`)
        
} catch (error) {
    console.log("mongodb connection failed :"  +error);
    process.exit(1);
}
}

export default connectionDb