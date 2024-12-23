import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log("MongoDB Connected");
        })
        connection.on('error', (err) => {
            console.log('MongoDB connection error, please make sure db is up and running' + err)
            process.exit()
        })
    } catch (error) {
        console.log("something wrong in connection database");
        console.log(error);


    }
}