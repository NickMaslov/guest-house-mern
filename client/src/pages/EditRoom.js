import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Form, Input } from 'antd';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { editRoom, getAllRooms } from '../redux/actions/roomActions';

function EditRoom() {
    const { roomId } = useParams();
    const { rooms } = useSelector((state) => state.roomsReducer);
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.alertsReducer);
    const [room, setRoom] = useState({});
    const [totalRooms, setTotalRooms] = useState([]);

    useEffect(() => {
        if (rooms.length === 0) {
            dispatch(getAllRooms());
        } else {
            setTotalRooms(rooms);
            setRoom(rooms.find((o) => o._id === roomId));
        }
    }, [room, rooms, roomId, dispatch]);

    function onFinish(values) {
        values._id = room._id;

        dispatch(editRoom(values));
    }

    return (
        <DefaultLayout>
            {loading && <Spinner />}
            <Row justify='center mt-5'>
                <Col lg={12} sm={24} xs={24} className='p-2'>
                    {totalRooms.length > 0 && (
                        <Form
                            initialValues={room}
                            className='bs1 p-2'
                            layout='vertical'
                            onFinish={onFinish}
                        >
                            <h3>Edit Car</h3>

                            <hr />
                            <Form.Item
                                name='name'
                                label='Room name'
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='description'
                                label='Room description'
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='image'
                                label='Image name'
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='rentPerDay'
                                label='Rent per day'
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='amenities'
                                label='Amenities'
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>

                            <div className='text-right'>
                                <button className='btn1'>EDIT ROOM</button>
                            </div>
                        </Form>
                    )}
                </Col>
            </Row>
        </DefaultLayout>
    );
}

export default EditRoom;
