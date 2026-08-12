import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { SongsModel } from "../models/songs.model.js";
import nodeId3 from 'node-id3';
import { uploadSongFile } from "../utils/uploadSong.js";
import { json } from "stream/consumers";
import { log } from "console";


//  upload song controller
export const uploadSongscontroller = asyncHandler(async (req, res) => {
    // read information from file.buffer
    const songBuffer = req.file?.buffer;
    const rawMood = req?.body?.mood ;

    if (!songBuffer) {
        throw new ApiError(404, "Song file is not provided.")
    };

     // Read ID3 metadata
    const tags = nodeId3.read(songBuffer);

    if (!tags?.title) {
        throw new ApiError(400, "Song title not found.");
    }

    // for optimization use Promise.all it resolve all promises (not wait for done one by one function)
    const [songFile, posterFile] = await Promise.all([
        uploadSongFile({
            buffer: songBuffer,
            fileName: `${tags?.title}.mp3`,
            folder: '/vibe-check/songs'
        }),
        // uploadSongFile({
        //     buffer: tags.image.imageBuffer,
        //     fileName: `${tags.title}.jpeg`,
        //     folder: "/vibe-check/posters",
        // }) 
         tags?.image?.imageBuffer
            ? uploadSongFile({
                buffer: tags.image.imageBuffer,
                fileName: `${tags.title}.jpeg`,
                folder: "/vibe-check/posters"
            })
            : Promise.resolve(null)
    ]);

    const mood =
    rawMood === undefined ||
    rawMood === null ||
    rawMood === "" ||
    rawMood === "null"
        ? null
        : rawMood.trim();



    const newSong = await SongsModel.create({
        title: tags?.title,
        url: songFile?.url,
        posterUrl: posterFile?.url || "",
        mood 
    });

    

    return res.status(201).json(new ApiResponse(201, newSong, "Song created."))


});


// get song according to mood controller

export const getSongAccordingToMood = asyncHandler(async (req, res) => {

    const mood = req.query.mood?.trim().toLowerCase();

    if (!mood) {
        throw new ApiError(400, "Mood is required.");
    }

    const songs = await SongsModel.find({ mood });

    if (!songs.length) {
        throw new ApiError(404, "No songs found.");
    }

    // const randomSong =
    //     songs[Math.floor(Math.random() * songs.length)];

    return res.status(200).json(
        new ApiResponse(
            200,
            // randomSong,
            songs,
            "Song fetched successfully."
        )
    );
});


// get all songs

export const getAllSongs = asyncHandler( async ( req , res) =>{
    const songs = await SongsModel.find() // get all data
    if(!songs){
        throw new ApiError(400 , "Song not Available.")
    };


    return res.status(200).json( new ApiResponse(200 , songs , "All songs."))
});


//  search songs by queries


export const searchSongs = asyncHandler( async (req ,res) => {
    const {q} = req.query; // get query

    if(!q?.trim()){
        throw new ApiError(400, "Search query is required.");
    };

    const songs = await SongsModel.find({
        // song search by title and mood
        $or :[
            {
                title : {
                $regex: q.trim(),
                $options : 'i'
            }
        },
        {
            mood :{
                $regex : q.trim(),
               $options : 'i'
            }
        }]
    });


    if(songs?.length === 0){
        throw new  ApiError(400 , "Song not found.")
    };

    return res.status(200).json( new ApiResponse(200 , songs , `Song found for ${q}`))

})