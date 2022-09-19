import axios from 'axios';
import { message } from 'antd';

export const userLogin = (reqObj) => async (dispatch) => {
    try {
        dispatch({ type: 'LOADING', payload: true });

        const response = await axios.post('/api/users/login', reqObj);
        localStorage.setItem('user', JSON.stringify(response.data));
        message.success('Login success');
        dispatch({ type: 'LOADING', payload: false });
        setTimeout(() => {
            window.location.href = '/';
        }, 500);
    } catch (error) {
        console.log(error);
        message.error('Something went wrong');
        dispatch({ type: 'LOADING', payload: false });
    }
};

export const userRegister = (reqObj) => async (dispatch) => {
    try {
        dispatch({ type: 'LOADING', payload: true });
        const response = await axios.post('/api/users/register', reqObj);
        message.success('Registration successfull');
        dispatch({ type: 'LOADING', payload: false });
        setTimeout(() => {
            window.location.href = '/login';
        }, 500);
    } catch (error) {
        console.log(error);
        message.error('Something went wrong');
        dispatch({ type: 'LOADING', payload: false });
    }
};
