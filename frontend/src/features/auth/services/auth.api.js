import axios from 'axios'


const apiIntsance = axios.create({
    baseURL :  import.meta.env.VITE_BACKEND_URL,
    withCredentials : true,
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

export const getMe = async() =>{
    const response = await apiIntsance.get('/api/v1/user/me');
    return response.data;
};

// update user profile
export const updateProfile = async (data) =>{
    const response = await apiIntsance.put("/api/v1/user/update-profile" ,data);
    return response.data;
}