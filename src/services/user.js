import axios from 'axios';

export async function getUserInfo() {
    try {
        // const response = await axios.get(`https://kappa.cs.petrsu.ru:8080`);
        // return response.data;
        return {
            login: 'vasilenk',
            name: 'Данил Василенко',
            group: '22307',
            date_modified: 4758478932,
            date_created: 54897548756,
            roles: ['student']
        }
    } catch (error) {
        console.error("Ошибка при получении информации о пользователе.", error);
        return false; 
    }
}