import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllRooms } from '../redux/actions/roomActions';
import { Row, Col, DatePicker } from 'antd';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import moment from 'moment';

const { RangePicker } = DatePicker;

function Home() {
    const { rooms } = useSelector((state) => state.roomsReducer);
    const { loading } = useSelector((state) => state.alertsReducer);
    const [totalRooms, setTotalRooms] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllRooms());
    }, [dispatch]);

    useEffect(() => {
        setTotalRooms(rooms);
    }, [rooms]);

    function setFilter(values) {
        var selectedFrom = moment(values[0], 'MMM DD yyyy');
        var selectedTo = moment(values[1], 'MMM DD yyyy');

        var temp = [];

        for (var room of rooms) {
            if (room.bookedTimeSlots.length === 0) {
                temp.push(room);
            } else {
                for (var booking of room.bookedTimeSlots) {
                    if (
                        selectedFrom.isBetween(booking.from, booking.to) ||
                        selectedTo.isBetween(booking.from, booking.to) ||
                        moment(booking.from).isBetween(
                            selectedFrom,
                            selectedTo
                        ) ||
                        moment(booking.to).isBetween(selectedFrom, selectedTo)
                    ) {
                    } else {
                        temp.push(room);
                    }
                }
            }
        }

        setTotalRooms(temp);
    }

    return (
        <DefaultLayout>
            <Row className='mt-3' justify='center'>
                <Col lg={20} sm={24} className='d-flex justify-content-center'>
                    <RangePicker format='MMM DD yyyy' onChange={setFilter} />
                </Col>
            </Row>

            {loading === true && <Spinner />}
            <Row justify='center' gutter={16}>
                {totalRooms.map((room) => {
                    return (
                        <Col xl={6} lg={8} sm={12} xs={24} key={room._id}>
                            <div className='room p-2 bs1'>
                                <img
                                    src={`assets/${room.image}.webp`}
                                    alt=''
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
