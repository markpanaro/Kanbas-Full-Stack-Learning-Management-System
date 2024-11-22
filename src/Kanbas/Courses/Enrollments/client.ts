import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const createEnrollment = async (courseId: string) => {
    const { data } = await axiosWithCredentials.post(`${ENROLLMENTS_API}/${courseId}`);
    return data;
};

export const deleteEnrollment = async (courseId: string) => {
    await axiosWithCredentials.delete(`${ENROLLMENTS_API}/${courseId}`);
    //return data;
};