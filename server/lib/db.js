import mongoose from "mongoose";

//  function for Connect to MongoDB
export const connectDB = async () => {
    try{
        mongoose.connection.on('connected', () => 
            console.log('MongoDB connected successfully'));
        await mongoose.connect(`${process.env.MONGODB_URI}/chat-app` )
    }catch (error) {
        console.error('Error connecting to MongoDB:', error);
       
    }
}