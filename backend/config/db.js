import mongoose from 'mongoose';

//asynchronous
const connectDB = async() => {
    try{
        // await is for promise
        //variable conn for connection
        const conn = await mongoose.connect(process.env.MONGO_URI,{
             useUnifiedTopology:true,
             useNewUrlParser:true,
            //  useCreateIndex:true,

        })
        //options
        console.log(`MongoDB connected ${conn.connection.host}` .brightBlue.underline.bold);
    }
    catch(error){
        console.error(`Error:${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB