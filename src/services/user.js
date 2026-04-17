import axios from 'axios';

export async function getUserInfo(token) {
    try {
        // const response = await axios.get(`${API_BASE_URL}/api/v1/auth/me`, 
        //     {
        //         headers: {
        //             'Authorization': `Bearer ${token}`,
        //             'Content-Type': 'application/json'
        //         }
        //     }
        // );
        // return response.data;
        console.log(token);
        return {
            name: 'Василенко Данил'
        };
    } catch (error) {
        console.error("Ошибка при получении информации о пользователе.", error);
        return false; 
    }
}