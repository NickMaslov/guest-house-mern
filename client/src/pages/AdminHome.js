import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import { deleteRoom, getAllRooms } from '../redux/actions/roomActions';
import { Col, Row, Divider, DatePicker, Checkbox, Edit } from 'antd';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import moment from 'moment';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, message } from 'antd';
const { RangePicker } = DatePicker;

function AdminHome() {
    const { rooms } = useSelector((state) => state.roomsReducer);
    const { loading } = useSelector((state) => state.alertsReducer);
    const [totalRooms, setTotalRooms] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllRooms());
    }, []);

    useEffect(() => {
        setTotalRooms(rooms);
    }, [rooms]);

    return (
        <DefaultLayout>
            <Row justify='center' gutter={16} className='mt-2'>
                <Col lg={20} sm={24}>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h3 className='mt-1 mr-2'>Admin Panel</h3>
                        <button className='btn1'>
                            <a href='/addroom'>ADD ROOM</a>
                        </button>
                    </div>
                </Col>
            </Row>

            {loading == true && <Spinner />}

            <Row justify='center' gutter={16}>
                {totalRooms.map((room) => {
                    return (
                        <Col xl={6} lg={8} sm={12} xs={24} key={room._id}>
                            <div className='room p-2 bs1'>
                                <img
                                    src={`../assets/${room.image}.webp`}
                                    className='roomimg'
                                />

                                <div className='room-content d-flex align-items-center justify-content-between'>
                                    <div className='text-left pl-2'>
                                        <p>{room.name}</p>
                                        <p>Rent Per Day {room.rentPerDay} /-</p>
                                    </div>

                                    <div className='mr-4'>
                                        <Link to={`/editroom/${room._id}`}>
                                            <EditOutlined
                                                className='mr-3'
                                                style={{
                                                    color: 'green',
                                                    cursor: 'pointer',
                                                }}
                                            />
                                        </Link>

                                        <Popconfirm
                                            title='Are you sure to delete this room?'
                                            onConfirm={() => {
                                                dispatch(
                                                    deleteRoom({
                                                        roomId: room._id,
                                                    })
                                                );
                                            }}
                                            okText='Yes'
                                            cancelText='No'
                                        >
                                            <DeleteOutlined
                                                style={{
                                                    color: 'red',
                                                    cursor: 'pointer',
                                                }}
                                            />
                                        </Popconfirm>
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

export default AdminHome;
