import axios from 'axios';

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
