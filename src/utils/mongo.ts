import mongoose from "mongoose";
import config from 'config';

export default async function connnectToMongo(){
    try {
        await mongoose.connect(config.get('dbUri'))
        console.log("connected to database")
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}