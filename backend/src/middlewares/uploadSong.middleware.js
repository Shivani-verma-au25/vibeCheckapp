import multer from 'multer';


const storage = multer.memoryStorage();

export const uploadSong = multer({
    storage : storage,
    limits : {
        fieldSize:1024 *1024 * 10 // 5mb
    }
});

