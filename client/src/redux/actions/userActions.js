import axios from 'axios';
import { message } from 'antd';

export const userLogin = (reqObj) => async (dispatch) => {
    try {
        const response = await axios.post('/api/users/login', reqObj);
        localStorage.setItem('user', JSON.stringify(response.data));
        message.success('Login success');
        setTimeout(() => {
            window.location.href = '/';
        }, 500);
    } catch (error) {
        console.log(error);
        message.error('Something went wrong');
    }
};

export const userRegister = (reqObj) => async (dispatch) => {
    try {
        const response = await axios.post('/api/users/register', reqObj);
        message.success('Registration successfull');
        setTimeout(() => {
            window.location.href = '/login';
        }, 500);
    } catch (error) {
        console.log(error);
        message.error('Something went wrong');
    }
};
