import axios from 'axios';
import { message } from 'antd';

export const getAllRooms = () => async (dispatch) => {
    try {
        dispatch({ type: 'LOADING', payload: true });
        const response = await axios.get('/api/rooms/getallrooms');
        dispatch({ type: 'GET_ALL_ROOMS', payload: response.data });
        dispatch({ type: 'LOADING', payload: false });
    } catch (error) {
        console.log(error);
        dispatch({ type: 'LOADING', payload: false });
    }
};

export const addRoom = (reqObj) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        await axios.post('/api/rooms/addroom', reqObj);

        dispatch({ type: 'LOADING', payload: false });
        message.success('New room added successfully');
        setTimeout(() => {
            window.location.href = '/';
            // window.location.href='/admin'
        }, 500);
    } catch (error) {
        console.log(error);
        dispatch({ type: 'LOADING', payload: false });
    }
};

export const deleteRoom = (reqObj) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        await axios.post('/api/rooms/deleteroom', reqObj);

        dispatch({ type: 'LOADING', payload: false });
        message.success('Room deleted successfully');
        setTimeout(() => {
            window.location.reload();
        }, 500);
    } catch (error) {
        console.log(error);
        dispatch({ type: 'LOADING', payload: false });
    }
};
