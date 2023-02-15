import mongoose, { ConnectOptions } from 'mongoose';
import config from '../config/config';

const connectDb = () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(config.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }  as ConnectOptions)
        console.log("Database connected successfully! ✔️")
    }catch(err) {
        console.log(err)
    }
}

export default connectDb;