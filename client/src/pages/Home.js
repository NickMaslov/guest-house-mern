import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRooms } from '../redux/actions/roomsActions';
import DefaultLayout from '../components/DefaultLayout';

function Home() {
    const { rooms } = useSelector((state) => state.roomsReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllRooms());
    }, []);

    return (
        <DefaultLayout>
            {rooms.map((room) => (
                <h1>{room.name}</h1>
            ))}
        </DefaultLayout>
    );
}

export default Home;
