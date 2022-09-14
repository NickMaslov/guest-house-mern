const initialData = {
    rooms: [],
};

export const roomsReducer = (state = initialData, action) => {
    switch (action.type) {
        case 'GET_ALL_ROOMS': {
            return {
                ...state,
                rooms: action.payload,
            };
        }

        default:
            return state;
    }
};
