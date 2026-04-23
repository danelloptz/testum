import axios from 'axios';

export async function getGroups(token) {
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
                name: '22307',
                count: 10
            },
            {
                name: '22306',
                count: 10
            },
            {
                name: '22305',
                count: 10
            },
            {
                name: '22304',
                count: 10
            },
            {
                name: '22303',
                count: 10
            },
        ];
    } catch (error) {
        console.error("Ошибка при получении групп.", error);
        return false; 
    }
}