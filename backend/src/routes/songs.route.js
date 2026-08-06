import {Router} from "express";
import { uploadSongscontroller } from "../controller/songs.controller.js";
import { uploadSong } from "../middlewares/uploadSong.middleware.js";


const router = Router();

router.route('/').post(uploadSong.single('song') ,uploadSongscontroller);

export default router;