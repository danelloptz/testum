import axios from 'axios';

export async function signIn() {
    try {
        // const response = await axios.get(`https://kappa.cs.petrsu.ru:8080`);
        // return response.data;
        return {
            token: 'fgvhbjklkkfg3h4jghucjvhmbefgrge'
        }
    } catch (error) {
        console.error("Ошибка при получении информации.", error);
        return false; 
    }
}