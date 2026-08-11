import {Router} from "express";
import { getAllSongs, getSongAccordingToMood, searchSongs, uploadSongscontroller } from "../controller/songs.controller.js";
import { uploadSong } from "../middlewares/uploadSong.middleware.js";


const router = Router();

router.route('/').post(uploadSong.single('song') ,uploadSongscontroller);
router.route('/get-song').get(getSongAccordingToMood);
router.route('/get-all-songs').get(getAllSongs);
router.route('/search').get(searchSongs)

export default router;