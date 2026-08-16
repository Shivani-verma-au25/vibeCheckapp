import axios from "axios";

const api = axios.create({
    baseURL : 'http://localhost:8000',
    withCredentials: true
});



// upload songs api

export const uploadSongs = async(songs)=>{
    const response = await api.post('/api/v1/songs/' ,{songs});
    return response?.data;
};

export const getSongByMood = async ({mood}) => {
    const response = await api.get(`/api/v1/songs/get-song?mood=${mood}`);
    return response.data;
};

// get all songs
export const getAllSongs = async()=>{
    const response = await api.get('/api/v1/songs/get-all-songs');
    return response.data;
};


// search song by title and name

export const searchSong = async (query) =>{
    const response = await api.get(`/api/v1/songs/search?q=${query}`);
    return response.data;
}



// export const getSongByMood = async ({mood}) => {
//     // query
//     const response = await api.get(`/api/v1/songs/get-song`,{
//         params:mood
//     });
//     return response.data;
// };