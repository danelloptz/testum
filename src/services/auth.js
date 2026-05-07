// import axios from 'axios';

// export async function signIn(login, password) {
//     try {
//         // const response = await axios.post(`https://kappa.cs.petrsu.ru:8080/auth/login`, 
//         // {
//         //     login: str,
//         //     password: str
//         // });
//         // return response.data;
//          if (login == 'vasilenk' && password == '12345') {
//             return {
//                 access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ItCh0YLRg9C00LXQvdGCIiwicm9sZSI6InN0dWRlbnQiLCJleHAiOjQ3MzM5ODQwMDB9.eT4g8V1n8zYw3Qy7yq6X9l0GxF4k5YhX9cQ3Yx2wQ1M',
//                 refresh_token: 'fnejbghewrfbjk4ertk'
//             }
//         }

//         if (login == 'gzaharov' && password == '12345') {
//             return {
//                 access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ItCb0LXQutGC0L7RgCIsInJvbGUiOiJsZWN0b3IiLCJleHAiOjQ3MzM5ODQwMDB9.ZGQw7Q0wR0zY3mS0m0lZl5w7R9vZpP6sYz7wK1F3s1E',
//                 refresh_token: 'fnejbghewrfbjk4ertk'
//             }
//         }

//         return {
//             status: false,
//             detail: 'Неверные данные'
//         }
//     } catch (error) {
//         console.error("Ошибка при авторизации.", error);
//         return false; 
//     }
// }

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Логин
export async function login(login, password) {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            login,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data; // { access_token, refresh_token }
    } catch (error) {
        console.error("Ошибка при логине.", error);
        return false;
    }
}

// Обновление токенов
export async function refreshToken(token) {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data; // { access_token, refresh_token }
    } catch (error) {
        console.error("Ошибка при обновлении токена.", error);
        return false;
    }
}

// Получение текущего пользователя
export async function getMe(token) {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error("Ошибка при получении профиля пользователя.", error);
        return false;
    }
}