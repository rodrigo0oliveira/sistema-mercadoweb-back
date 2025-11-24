import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const database = async ()=>{
    try{

        await mongoose.connect(process.env.MONGO_URL || '');
        console.log('Mongo connected');
    }catch(error:any){
        console.error(error.message);
    }
}

export default database;