import axios from 'axios';

export const addUser = async (email, password) => {
    const res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.API_URL}`, 
        {
            email: email,
            password: password,
            returnSecureToken: true,
        }
    )
}

export const login = async (email, password) => {
    const res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.API_URL}`, 
        {
            email: email,
            password: password,
            returnSecureToken: true,
        }
    )
}