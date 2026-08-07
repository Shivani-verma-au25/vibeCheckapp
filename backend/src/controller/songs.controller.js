import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { SongsModel } from "../models/songs.model.js";
import nodeId3 from 'node-id3';
import { uploadSongFile } from "../utils/uploadSong.js";


//  upload song controller
export const uploadSongscontroller = asyncHandler(async (req, res) => {
    // read information from file.buffer
    const songBuffer = req.file?.buffer;
    const mood = req?.body?.mood;
    const tags = nodeId3.read(songBuffer);

    if (!songBuffer) {
        throw new ApiError(404, "Song file is not provided.")
    };
    if (!tags?.title) {
        throw new ApiError(400, "Song title not found in metadata.");
    }

    // for optimization use Promise.all it resolve all promises (not wait for done one by one function)
    const [songFile, posterFile] = await Promise.all([
        uploadSongFile({
            buffer: songBuffer,
            fileName: `${tags?.title}.mp3`,
            folder: '/vibe-check/songs'
        }),
        uploadSongFile({
            buffer: tags.image.imageBuffer,
            fileName: `${tags.title}.jpeg`,
            folder: "/vibe-check/posters",
        })
    ]);


    // let songFile;
    // let posterFile = null;
    // try {
    //     songFile = await uploadSongFile({
    //         buffer: songBuffer,
    //         fileName: `${tags?.title }.mp3`,
    //         folder: '/vibe-check/songs'
    //     });

    //     if (tags?.image?.imageBuffer) {
    //         posterFile = await uploadSongFile({
    //             buffer: tags.image.imageBuffer,
    //             fileName: `${tags.title}.jpeg`,
    //             folder: "/vibe-check/posters",
    //         });
    //     }

    // } catch (error) {
    //     throw new ApiError(404, "Song not uploaded.", error?.message)
    // };

    // create song

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
    const { mood } = req.query;

    if (!mood) {
        throw new ApiError(404, "Mood is required.")
    };

    // find mood in db
    const song = await SongsModel.findOne({
        mood
    });

    if (!song) {
        throw new ApiError(404, "Song  not found.");
    };

    return res.status(200).json(new ApiResponse(200, song, "Song fetched succesffully."))
})