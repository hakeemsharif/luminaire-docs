import mongoose from "mongoose";

const documentSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        
        description: {
            type: String,
        }, 

        author: {
            type: String,
            required: true
        },

        creationDate: {
            type: Date,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        language: {
            type: String,
            required: true
        },

        file: {
            type: String,
            required: true
        },
    },
    
    {
        timestamps: true,
    }
);

export const Document = mongoose.model('Documents', documentSchema);