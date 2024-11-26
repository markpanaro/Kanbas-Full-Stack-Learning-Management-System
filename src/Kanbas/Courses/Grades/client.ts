import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const GRADES_API = `${REMOTE_SERVER}/api/grades`;

export const fetchGrade = async (quiz: any) => {
    const response = await axiosWithCredentials
        .get(`${GRADES_API}/${quiz._id}`);
    return response.data;
};

export const saveGrade = async (grade: any) => {
    const { data } = await axiosWithCredentials.post(`${GRADES_API}/${grade.quizId}`, grade);
    return data;
};

export const updateGrade = async (grade: any) => {
    const { data } = await axios.put(`${GRADES_API}/${grade._id}`, grade);
    return data;
};
