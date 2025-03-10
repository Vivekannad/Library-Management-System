import {Schema , model} from "mongoose";

const categorySchema = new Schema({
    category: {
        type : String , 
        enum : ["thriller", "drama", "romance"],
        required : true
    }
})

export const Category = model("Category", categorySchema);