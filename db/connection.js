import { connect } from "mongoose";
import { config } from "dotenv";
config();


export const connection = async() => {
    try{
        await connect(process.env.CONNECTION_STRING);
        console.log("Connected Successfully");
    }
    catch(err){
        console.log("Some kind of error");
    }
}