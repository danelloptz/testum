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
                date_end: 1777393884000,
                id: 'fefe343kjn'
            },
            {
                status: 'В процессе',
                name: 'Интегральное исчисление: Базовый уровень',
                main_q: 15,
                more_q: 5,
                date_start: 1776270684000,
                date_end: 1777393884000,
                id: 'rn3j2r23'
            },
            {
                status: 'В процессе',
                name: 'Интегральное исчисление: Базовый уровень',
                main_q: 15,
                more_q: 5,
                date_start: 1776270684000,
                date_end: 1777393884000,
                id: 'enjfner304mf'
            },
            {
                status: 'Не доступен',
                name: 'Интегральное исчисление: Базовый уровень',
                main_q: 15,
                more_q: 5,
                date_start: 1776270684000,
                date_end: 1777393884000,
                id: 'n34b3jhk35k'
            },
            {
                status: 'Не доступен',
                name: 'Интегральное исчисление: Базовый уровень',
                main_q: 15,
                more_q: 5,
                date_start: 1776270684000,
                date_end: 1777393884000,
                id: 'n35n4kj54352l'
            },
        ];
    } catch (error) {
        console.error("Ошибка при получении информации о пользователе.", error);
        return false; 
    }
}

export async function getHardQu(test_id, token) {
    try {
        // const response = await axios.get(`${API_BASE_URL}/student/test/${test_id}/hard `, 
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
                id: 0,
                is_multiple_choice: true,
                text: 'Какая из этих переменных является типом int?',
                image_url: null,
                options: [
                    {
                        id: 0,
                        text: '5',
                        image_url: ''
                    },
                    {
                        id: 1,
                        text: '2.45',
                        image_url: ''
                    },
                    {
                        id: 2,
                        text: '7',
                        image_url: ''
                    },
                    {
                        id: 3,
                        text: 'undefined',
                        image_url: ''
                    },
                ]
            },
            {
                id: 1,
                is_multiple_choice: false,
                text: '2 + 2 = ?',
                image_url: null,
                options: [
                    {
                        id: 0,
                        text: '67',
                        image_url: ''
                    },
                    {
                        id: 1,
                        text: '4',
                        image_url: ''
                    },
                    {
                        id: 2,
                        text: '0',
                        image_url: ''
                    },
                ]
            },
           
        ];
    } catch (error) {
        console.error("Ошибка при получении сложных вопросов", error);
        return false; 
    }
}

export async function getBaseQu(test_id, token) {
    try {
        // const response = await axios.get(`${API_BASE_URL}/student/test/${test_id}/base `, 
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
                id: 0,
                is_multiple_choice: true,
                text: 'Какая из этих переменных является типом float?',
                image_url: null,
                options: [
                    {
                        id: 0,
                        text: '5',
                        image_url: ''
                    },
                    {
                        id: 1,
                        text: '2.45',
                        image_url: ''
                    },
                    {
                        id: 2,
                        text: '7',
                        image_url: ''
                    },
                    {
                        id: 3,
                        text: 'undefined',
                        image_url: ''
                    },
                ]
            },
            {
                id: 1,
                is_multiple_choice: false,
                text: '4 + 4 = ?',
                image_url: null,
                options: [
                    {
                        id: 0,
                        text: '67',
                        image_url: ''
                    },
                    {
                        id: 1,
                        text: '4',
                        image_url: ''
                    },
                    {
                        id: 2,
                        text: '8',
                        image_url: ''
                    },
                ]
            },
           
        ];
    } catch (error) {
        console.error("Ошибка при получении простых вопросов", error);
        return false; 
    }
}

export async function postHardQu(test_id, task_answers, token) {
    try {
        // const response = await axios.post(`${API_BASE_URL}/student/test/${test_id}/hard  `, {
        //     task_answers
        // },
        //     {
        //         headers: {
        //             'Authorization': `Bearer ${token}`,
        //             'Content-Type': 'application/json'
        //         }
        //     }
        // );
        // return response.data;

        return {
            success: true,
            all_correct: false
        };
    } catch (error) {
        console.error("Ошибка при отправке сложных вопросов", error);
        return false; 
    }
}

export async function postBaseQu(test_id, task_answers, token) {
    try {
        // const response = await axios.post(`${API_BASE_URL}/student/test/${test_id}/hard  `, {
        //     task_answers
        // },
        //     {
        //         headers: {
        //             'Authorization': `Bearer ${token}`,
        //             'Content-Type': 'application/json'
        //         }
        //     }
        // );
        // return response.data;

        return {
            success: true,
        };
    } catch (error) {
        console.error("Ошибка при отправке простых вопросов", error);
        return false; 
    }
}

export async function getTestResult(test_id, token) {
    try {
        // const response = await axios.get(`${API_BASE_URL}/student/test/{test_id}/result `, 
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
            mark: '2',
            success_rate: '20%',
            date_start: 1776270684000,
            date_end: 1777393884000,
        };
    } catch (error) {
        console.error("Ошибка при получении результата теста", error);
        return false; 
    }
}