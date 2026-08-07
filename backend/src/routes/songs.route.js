import {Router} from "express";
import { getSongAccordingToMood, uploadSongscontroller } from "../controller/songs.controller.js";
import { uploadSong } from "../middlewares/uploadSong.middleware.js";


const router = Router();

router.route('/').post(uploadSong.single('song') ,uploadSongscontroller);
router.route('/get-song').get(getSongAccordingToMood);

export default router;