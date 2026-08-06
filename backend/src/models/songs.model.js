import mongoose, { Schema } from 'mongoose';

const songsSchema = new Schema({
    url: {
        type: String,
        required: [true, "Song url is required. "]
    },
    posterUrl: {
        type: String,
        required: [true, "Song poster is required."]
    },
    title: {
        type: String,
        required: [true, "Title is required."]
    },
    mood: {
        type:String,
        enum:{
            values:['happy' , "sad" , "surprised"],
            message : "enum message"
        }
    }
})

export const SongsModel = mongoose.model("SongsModel", songsSchema);