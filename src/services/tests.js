import axios from 'axios';

export async function getStudentTests(offset, limit, token) {
    try {
        // const response = await axios.get(`${API_BASE_URL}/student/tests`, 
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
                id: 835353,
                name: 'Интегральное исчисление: Базовый уровень',
                cnt_questions: 15,
                main_questions: 5,
                creator: 'bogoyavl',
                date_start: 1776270684000,
                date_end: 1777393884000,
                date_created: 1776270684000
            },
            {
                status: 'В процессе',
                id: 57474,
                name: 'Интегральное исчисление: Базовый уровень',
                cnt_questions: 15,
                main_questions: 5,
                creator: 'bogoyavl',
                date_start: 1776270684000,
                date_end: 1777393884000,
                date_created: 1776270684000
            },
            {
                status: 'В процессе',
                id: 8585,
                name: 'Интегральное исчисление: Базовый уровень',
                cnt_questions: 15,
                main_questions: 5,
                creator: 'bogoyavl',
                date_start: 1776270684000,
                date_end: 1777393884000,
                date_created: 1776270684000
            },
            {
                status: 'Не доступен',
                id: 53563,
                name: 'Интегральное исчисление: Базовый уровень',
                cnt_questions: 15,
                main_questions: 5,
                creator: 'bogoyavl',
                date_start: 1776270684000,
                date_end: 1777393884000,
                date_created: 1776270684000
            },
            {
                status: 'Не доступен',
                id: 35353,
                name: 'Интегральное исчисление: Базовый уровень',
                cnt_questions: 15,
                main_questions: 5,
                creator: 'bogoyavl',
                date_start: 1776270684000,
                date_end: 1777393884000,
                date_created: 1776270684000
            },
        ];
    } catch (error) {
        console.error("Ошибка при получении информации о пользователе.", error);
        return false; 
    }
}

export async function getTestInfo(test_id, token) {
    try {
        // const response = await axios.get(`${API_BASE_URL}/student/test/${test_id}`, 
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
                status: 'Доступен',
                id: 835353,
                name: 'Интегральное исчисление: Базовый уровень',
                cnt_questions: 15,
                main_questions: 5,
                creator: 'bogoyavl',
                date_start: 1776270684000,
                date_end: 1777393884000,
                date_created: 1776270684000
            };
            
    } catch (error) {
        console.error("Ошибка при получении информации о конкретном тесте.", error);
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

export async function getStudentFinishedTests(offset, limit, token) {
    try {
        // const response = await axios.get(`${API_BASE_URL}/student/tests`, 
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
                id: 835353,
                name: 'Интегральное исчисление: Базовый уровень',
                cnt_questions: 15,
                main_questions: 5,
                creator: 'bogoyavl',
                date_start: 1776270684000,
                date_end: 1777393884000,
                date_created: 1776270684000
            },
            {
                id: 57474,
                name: 'Интегральное исчисление: Базовый уровень',
                cnt_questions: 15,
                main_questions: 5,
                creator: 'bogoyavl',
                date_start: 1776270684000,
                date_end: 1777393884000,
                date_created: 1776270684000
            },
            {
                id: 8585,
                name: 'Интегральное исчисление: Базовый уровень',
                cnt_questions: 15,
                main_questions: 5,
                creator: 'bogoyavl',
                date_start: 1776270684000,
                date_end: 1777393884000,
                date_created: 1776270684000
            },
            {
                id: 53563,
                name: 'Интегральное исчисление: Базовый уровень',
                cnt_questions: 15,
                main_questions: 5,
                creator: 'bogoyavl',
                date_start: 1776270684000,
                date_end: 1777393884000,
                date_created: 1776270684000
            },
            {
                id: 35353,
                name: 'Интегральное исчисление: Базовый уровень',
                cnt_questions: 15,
                main_questions: 5,
                creator: 'bogoyavl',
                date_start: 1776270684000,
                date_end: 1777393884000,
                date_created: 1776270684000
            },
        ];
    } catch (error) {
        console.error("Ошибка при получении информации о пользователе.", error);
        return false; 
    }
}


export async function getGroupTests(offset, limit, group_name, token) {
    try {
        // const response = await axios.get(`${API_BASE_URL}/student/tests`, 
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
                id: 835353,
                name: 'Интегральное исчисление: Базовый уровень',
                cnt_questions: 15,
                main_questions: 5,
                creator: 'bogoyavl',
                date_start: 1776270684000,
                date_end: 1777393884000,
                date_created: 1776270684000
            },
            {
                status: 'В процессе',
                id: 57474,
                name: 'Интегральное исчисление: Базовый уровень',
                cnt_questions: 15,
                main_questions: 5,
                creator: 'bogoyavl',
                date_start: 1776270684000,
                date_end: 1777393884000,
                date_created: 1776270684000
            },
            {
                status: 'В процессе',
                id: 8585,
                name: 'Интегральное исчисление: Базовый уровень',
                cnt_questions: 15,
                main_questions: 5,
                creator: 'bogoyavl',
                date_start: 1776270684000,
                date_end: 1777393884000,
                date_created: 1776270684000
            },
            {
                status: 'Не доступен',
                id: 53563,
                name: 'Интегральное исчисление: Базовый уровень',
                cnt_questions: 15,
                main_questions: 5,
                creator: 'bogoyavl',
                date_start: 1776270684000,
                date_end: 1777393884000,
                date_created: 1776270684000
            },
            {
                status: 'Не доступен',
                id: 35353,
                name: 'Интегральное исчисление: Базовый уровень',
                cnt_questions: 15,
                main_questions: 5,
                creator: 'bogoyavl',
                date_start: 1776270684000,
                date_end: 1777393884000,
                date_created: 1776270684000
            },
        ];
    } catch (error) {
        console.error("Ошибка при получении информации о пользователе.", error);
        return false; 
    }
}

export async function getStudentResults(test_id, group_name, token) {
    try {
        // const response = await axios.get(`${API_BASE_URL}/student/tests`, 
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
                id: 49860,
                login: 'vasilenk',
                name: 'Данил Василенко',
                result: {
                    mark: '5',
                    success_rate: '4',
                    percent: '100%',
                    date_start: '1776270684000',
                    date_end: '1776270684000'
                }
            },
            {
                id: 49860,
                login: 'gzaharov',
                name: 'Георгий Захаров',
                result: {
                    mark: '3',
                    success_rate: '4',
                    percent: '60%',
                    date_start: '1776270684000',
                    date_end: '1776270684000'
                }
            },
            {
                id: 49860,
                login: 'semykin',
                name: 'Антон Семыкин',
                result: {
                    mark: '4',
                    success_rate: '4',
                    percent: '80%',
                    date_start: '1776270684000',
                    date_end: '1776270684000'
                }
            }
        ];
    } catch (error) {
        console.error("Ошибка при получении результатов студентов по тесту.", error);
        return false; 
    }
}