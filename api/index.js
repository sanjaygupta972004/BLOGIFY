import app from "./app.js"
import connectionDb from "./db/index.js"
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
});

const PORT = process.env.PORT || 4000;

connectionDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log("Something went wrong while connecting server with database:");
        throw new Error(`Server failed to start due to error: ${error}`); 
});
