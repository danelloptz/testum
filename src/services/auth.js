import axios from 'axios';

export async function signIn(login, password) {
    try {
        // const response = await axios.post(`https://kappa.cs.petrsu.ru:8080/auth/login`, 
        // {
        //     login: str,
        //     password: str
        // });
        // return response.data;
        return {
            access_token: 'gjrbgjrbeghergbjger',
            refresh_token: 'fnejbghewrfbjk4ertk'
        }
    } catch (error) {
        console.error("Ошибка при авторизации.", error);
        return false; 
    }
}