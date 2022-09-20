import React, { useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookings } from '../redux/actions/bookingActions';
import { Col, Row } from 'antd';
import Spinner from '../components/Spinner';

function UserBookings() {
    const dispatch = useDispatch();
    const { bookings } = useSelector((state) => state.bookingsReducer);
    const { loading } = useSelector((state) => state.alertsReducer);
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        dispatch(getAllBookings());
    }, [dispatch]);

    // console.log(user);
    return (
        <DefaultLayout>
            {loading && <Spinner />}
            <h3 className='text-center mt-2'>My Bookings</h3>

            <Row justify='center' gutter={16}>
                <Col lg={16} sm={24}>
                    {bookings
                        .filter((o) => o.user === user._id)
                        .map((booking) => {
                            return (
                                <Row
                                    gutter={16}
                                    className='bs1 mt-3 text-left'
                                    key={booking._id}
                                >
                                    <Col lg={6} sm={24}>
                                        <p>
                                            <b>{booking.room.name}</b>
                                        </p>
                                        <p>
                                            Total days :{' '}
                                            <b>{booking.totalDays}</b>
                                        </p>
                                        <p>
                                            Rent per day :{' '}
                                            <b>{booking.room.rentPerDay}</b>
                                        </p>
                                        <p>
                                            Total amount :{' '}
                                            <b>{booking.totalAmount}</b>
                                        </p>
                                    </Col>

                                    <Col lg={12} sm={24}>
                                        <p>
                                            Transaction Id :{' '}
                                            <b>{booking.transactionId}</b>
                                        </p>
                                        <p>
                                            From:{' '}
                                            <b>
                                                {booking.bookedTimeSlots.from}
                                            </b>
                                        </p>
                                        <p>
                                            To:{' '}
                                            <b>{booking.bookedTimeSlots.to}</b>
                                        </p>
                                        <p>
                                            Date of booking:{' '}
                                            <b>
                                                {new Date(
                                                    booking.createdAt
                                                ).toLocaleDateString('en-gb')}
                                            </b>
                                        </p>
                                    </Col>

                                    <Col lg={6} sm={24} className='text-right'>
                                        <img
                                            style={{ borderRadius: 5 }}
                                            alt=''
                                            src={`../assets/${booking.room.image}.webp`}
                                            height='140'
                                            className='p-2'
                                        />
                                    </Col>
                                </Row>
                            );
                        })}
                </Col>
            </Row>
        </DefaultLayout>
    );
}

export default UserBookings;
