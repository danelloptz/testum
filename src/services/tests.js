import axios from 'axios';

export async function getStudentTests(token) {
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
        return [
            {
                status: 'Доступен',
                name: 'Интегральное исчисление: Базовый уровень',
                main_q: 15,
                more_q: 5,
                date_start: 1776270684000,
                date_end: 1777393884000
            },
            {
                status: 'В процессе',
                name: 'Интегральное исчисление: Базовый уровень',
                main_q: 15,
                more_q: 5,
                date_start: 1776270684000,
                date_end: 1777393884000
            },
            {
                status: 'В процессе',
                name: 'Интегральное исчисление: Базовый уровень',
                main_q: 15,
                more_q: 5,
                date_start: 1776270684000,
                date_end: 1777393884000
            },
            {
                status: 'Не доступен',
                name: 'Интегральное исчисление: Базовый уровень',
                main_q: 15,
                more_q: 5,
                date_start: 1776270684000,
                date_end: 1777393884000
            },
            {
                status: 'Не доступен',
                name: 'Интегральное исчисление: Базовый уровень',
                main_q: 15,
                more_q: 5,
                date_start: 1776270684000,
                date_end: 1777393884000
            },
        ];
    } catch (error) {
        console.error("Ошибка при получении информации о пользователе.", error);
        return false; 
    }
}