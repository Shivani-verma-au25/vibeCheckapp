import ImageKit from "@imagekit/nodejs";
import fs from "fs";
import { configrations } from "../config/congi.js";
import dotenv from "dotenv";
import { ApiError } from "./ApiError.js";


dotenv.config();

const client = new ImageKit({
    publicKey: configrations.imageKitPublicKey,
    privateKey: configrations.imakeKitPrivateKey,
    urlEndpoint: configrations.imageKitUrlEndpoint,
});

export async function uploadSongFile({buffer , fileName , folder = 'vibe-check'}){
    try {
        const result = await client.files.upload({
            file : await ImageKit.toFile(buffer),
            fileName,
            folder
        });
       
        return {
            url: result.url
        };
    } catch (error) {
        return null;
        throw new ApiError(500, "Failed to upload file to ImageKit." , error?.error);
    } finally {
    // This runs whether upload succeeds or fails
    if (fs.existsSync(fileName)) {
        fs.unlinkSync(fileName);
        console.log("Temp file deleted.");
    }
}}