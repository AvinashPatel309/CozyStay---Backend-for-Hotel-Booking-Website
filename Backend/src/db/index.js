import {DB_NAME} from "../constants.js"
import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(
            `${process.env.MONGODB_URL}/${DB_NAME}`
        );

        console.log("MongoDB connected Successfully !!");
        
    } catch (error) {
        console.log("Error Connectiong to MongoDB");
        process.exit(1)
    }
}

export default connectDB