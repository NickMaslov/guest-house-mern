import axios from 'axios';

export const getAllRooms = () => async (dispatch) => {
    try {
        const response = await axios.get('/api/rooms/getallrooms');
        dispatch({ type: 'GET_ALL_ROOMS', payload: response.data });
    } catch (error) {
        console.log(error);
    }
};
