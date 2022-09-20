import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, Row, Divider, DatePicker, Checkbox, Modal } from 'antd';
import moment from 'moment';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { getAllRooms } from '../redux/actions/roomActions';
import { bookRoom } from '../redux/actions/bookingActions';
import StripeCheckout from 'react-stripe-checkout';
import 'aos/dist/aos.css';
import AOS from 'aos';

const { RangePicker } = DatePicker;

function BookingRoom() {
    const { roomId } = useParams();
    const { rooms } = useSelector((state) => state.roomsReducer);
    const { loading } = useSelector((state) => state.alertsReducer);
    const [room, setRoom] = useState({});
    const dispatch = useDispatch();
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [totalDays, setTotalDays] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (rooms.length == 0) {
            dispatch(getAllRooms());
        } else {
            setRoom(rooms.find((o) => o._id == roomId));
        }
    }, [rooms]);

    useEffect(() => {
        setTotalAmount(totalDays * room.rentPerDay);
    }, [totalDays]);

    function selectTimeSlots(values) {
        setFrom(moment(values[0]).format('MMM DD yyyy'));
        setTo(moment(values[1]).format('MMM DD yyyy'));

        setTotalDays(values[1].diff(values[0], 'days'));
    }

    function onToken(token) {
        const reqObj = {
            token,
            user: JSON.parse(localStorage.getItem('user'))._id,
            room: room._id,
            totalDays,
            totalAmount,
            bookedTimeSlots: {
                from,
                to,
            },
        };

        dispatch(bookRoom(reqObj));
    }

    return (
        <DefaultLayout>
            {console.log('fromto: ', from, to)}
            {loading && <Spinner />}
            <Row
                justify='center'
                className='d-flex align-items-center'
                style={{ minHeight: '90vh' }}
            >
                <Col lg={10} sm={24} xs={24} className='p-3'>
                    <img
                        src={`../assets/${room.image}.webp`}
                        className='roomimg2 bs1 w-100'
                        data-aos='flip-left'
                        data-aos-duration='1500'
                    />
                </Col>

                <Col lg={10} sm={24} xs={24}>
                    <Divider type='horizontal' dashed>
                        Room Info
                    </Divider>
                    <div style={{ textAlign: 'center' }}>
                        <p>{room.name}</p>
                        <p>{room.rentPerDay} Rent Per Day /-</p>
                        <p>
                            Amenities:{' '}
                            {room.amenities && room.amenities.join(' ')}
                        </p>
                    </div>

                    <Divider type='horizontal' dashed>
                        Select Time Slots
                    </Divider>
                    <RangePicker
                        format='MMM DD yyyy'
                        onChange={selectTimeSlots}
                    />
                    <br />
                    <button
                        className='btn1 mt-2'
                        onClick={() => {
                            setShowModal(true);
                        }}
                    >
                        See Booked Slots
                    </button>
                    {from && to && (
                        <div>
                            <p>
                                Total Days : <b>{totalDays}</b>
                            </p>
                            <p>
                                Rent Per Day : <b>{room.rentPerDay}</b>
                            </p>

                            <h3>Total Amount : {totalAmount}</h3>

                            <StripeCheckout
                                // shippingAddress
                                token={onToken}
                                currency='USD'
                                amount={totalAmount * 100}
                                stripeKey='pk_test_51L0JatC3pkDU7Lg0NIDcRrqfYwy7FfXdxBFRA5Msfj46AF9ESD85xbv9yf5C9MHtWke13UmM1TsG6JN814d116hP00CbbMxuv0'
                            >
                                <button className='btn1'>Book Now</button>
                            </StripeCheckout>
                        </div>
                    )}
                </Col>

                {room.name && (
                    <Modal
                        visible={showModal}
                        closable={false}
                        footer={false}
                        title='Booked time slots'
                    >
                        <div className='p-2'>
                            {room.bookedTimeSlots.map((slot) => {
                                return (
                                    <button className='btn1 mt-2'>
                                        {slot.from} - {slot.to}
                                    </button>
                                );
                            })}

                            <div className='text-right mt-5'>
                                <button
                                    className='btn1'
                                    onClick={() => {
                                        setShowModal(false);
                                    }}
                                >
                                    CLOSE
                                </button>
                            </div>
                        </div>
                    </Modal>
                )}
            </Row>
        </DefaultLayout>
    );
}

export default BookingRoom;
