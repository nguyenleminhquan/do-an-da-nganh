import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        mongoose
        console.log('MongoDB connected!')
    } catch (error) {
        throw error
    }
}

var DbConnection = function () {

    var db = null;
    var instance = 0;

    async function DbConnect() {
        try {
            let url = process.env.MONGO_URI
            let _db = await mongoose.connect(url)

            return _db
        } catch (e) {
            return e
        }
    }

   async function Get() {
        try {
            instance++;     // this is just to count how many times our singleton is called.
            console.log(`DbConnection called ${instance} times`);

            if (db != null) {
                console.log(`db connection is already alive`);
                return db;
            } else {
                console.log(`getting new db connection`);
                db = await DbConnect();
                return db; 
            }
        } catch (e) {
            return e;
        }
    }

    return {
        Get: Get
    }
}


export default connectDB