import dotenv from "dotenv";
dotenv.config();
import database from "./src/database";

import app from "./app";
const PORT = process.env.PORT || 3000;

database();

app.listen(PORT,()=>{
    console.log(`Listen in port ${PORT}`);
});