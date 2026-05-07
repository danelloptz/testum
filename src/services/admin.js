import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// ======================
// CREATE LECTURER
// POST /admin/lecturers
// ======================

export async function createLecturer(token, login) {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/admin/lecturers`,
            {
                login
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Ошибка при создании лектора', error);

        return false;
    }
}

// ======================
// DELETE LECTURER
// DELETE /admin/lecturers/{lecturer_id}
// ======================

export async function deleteLecturer(token, lecturerId) {
    try {
        const response = await axios.delete(
            `${API_BASE_URL}/admin/lecturers/${lecturerId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Ошибка при удалении лектора', error);

        return false;
    }
}

// ======================
// GET LECTURERS
// GET /admin/lecturers
// ======================

export async function getLecturers(token) {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/admin/lecturers`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Ошибка при получении списка лекторов', error);

        return false;
    }
}