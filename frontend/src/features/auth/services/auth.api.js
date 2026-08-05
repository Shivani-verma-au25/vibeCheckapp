import axios from 'axios'


const apiIntsance = axios.create({
    baseURL : 'http://localhost:8000',
    withCredentials : true
});



export const signUp = async(data) =>{
    const response = await apiIntsance.post('/api/v1/user/sign-up' , data);
    return response.data;
};

export const signIn = async(data) =>{
    const response = await apiIntsance.post('/api/v1/user/sign-in' , data);
    return response.data;
};

export const signOut = async() =>{
    const response = await apiIntsance.post('/api/v1/user/sign-out' );
    return response.data;
};

export const getMe = async(data) =>{
    const response = await apiIntsance.get('/api/v1/user/me');
    return response.data;
};