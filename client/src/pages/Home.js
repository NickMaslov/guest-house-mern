import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
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
            <Row justify='center' gutter={16}>
                {rooms.map((room) => {
                    return (
                        <Col xl={6} lg={8} sm={12} xs={24} key={room._id}>
                            <div className='room p-2 bs1'>
                                <img
                                    src={`assets/${room.image}.webp`}
                                    className='roomimg'
                                />

                                <div className='room-content d-flex align-items-center justify-content-between'>
                                    <div className='text-left pl-2'>
                                        <p>{room.name}</p>
                                        <p>Rent Per Day {room.rentPerDay} $</p>
                                    </div>

                                    <div>
                                        <button className='btn1 mr-2'>
                                            <Link to={`/booking/${room._id}`}>
                                                Book Now
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </DefaultLayout>
    );
}

export default Home;
