import { Menu, Dropdown, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

function DefaultLayout({ children }) {
    const user = JSON.parse(localStorage.getItem('user'));

    const items = [
        { label: <a href='/'>Home</a>, key: 'home' },
        { label: <a href='/userbookings'>Bookings</a>, key: 'bookings' },
        { label: <a href='/admin'>Admin</a>, key: 'admin' },
        {
            label: (
                <span
                    style={{ color: 'red' }}
                    onClick={() => {
                        localStorage.removeItem('user');
                        window.location.href = '/login';
                    }}
                >
                    Logout
                </span>
            ),
            key: 'logout',
        },
    ];

    const menu = <Menu items={items} />;

    return (
        <div>
            <div className='header bs1'>
                <Row gutter={16} justify='center'>
                    <Col lg={20} sm={24} xs={24}>
                        <div className='d-flex justify-content-between'>
                            <h1>
                                <Link to='/'>Guest House</Link>
                            </h1>

                            <Dropdown overlay={menu} placement='bottom'>
                                <Button>{user && user.username}</Button>
                            </Dropdown>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className='content'>{children}</div>

            <div className='footer text-center'>
                <hr />

                <p>Desinged and Developed By</p>

                <p>NICK M</p>
            </div>
        </div>
    );
}

export default DefaultLayout;
