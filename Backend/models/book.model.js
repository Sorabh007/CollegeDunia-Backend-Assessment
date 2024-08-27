import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        validate:{
            validator: function(x){
                return x.trim().length>0;
            },
            message:"Title can't be empty"
        }
    },

    author: {
        type: String,
        required: true,
        validate:{
            validator: function(x){
                return x.trim().length>0;
            },
            message:"Author can't be empty"
        }
    },

    isbn: {
        type: String,
        unique: true,
        require: true
    },

    publishedDate: {
        type: Date,
        default: Date.now
    }
},
{ timestamps: true });

export const books = mongoose.model("books", bookSchema);
