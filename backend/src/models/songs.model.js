import mongoose, { Schema } from 'mongoose';

const songsSchema = new Schema({
    url: {
        type: String,
        required: [true, "Song url is required. "]
    },
    posterUrl: {
        type: String,
        required: [false, "Song poster is required."],
        default: ""
    },
    title: {
        type: String,
        required: [true, "Title is required."]
    },

    mood: {
        type: String,
        enum: ["happy", "sad", "surprised"],
        default: null
    }
    // mood: {
    //     type:String,
    //     enum:{
    //         values:['happy' , "sad" , "surprised"],
    //         message : "enum message"
    //     },
    //     default : null
    // }
})

export const SongsModel = mongoose.model("SongsModel", songsSchema);