import './App.css';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingRoom from './pages/BookingRoom';
import UserBookings from './pages/UserBookings';
import AddRoom from './pages/AddRoom';

function App() {
    const protectedRoute = (element) =>
        localStorage.getItem('user') ? (
            element
        ) : (
            <Navigate replace to='/login' />
        );

    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/login' exact element={<Login />} />
                    <Route path='/register' exact element={<Register />} />
                    <Route
                        path='/booking/:roomId'
                        exact
                        element={protectedRoute(<BookingRoom />)}
                    />
                    <Route
                        path='/userbookings'
                        exact
                        element={protectedRoute(<UserBookings />)}
                    />
                    <Route
                        path='/addroom'
                        exact
                        element={protectedRoute(<AddRoom />)}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

// export function ProtectedRoute(props) {
//     const navigate = useNavigate();

//     if (localStorage.getItem('user')) {
//         return <Route {...props} />;
//     } else {
//         return navigate('/login');
//     }
// }

export default App;
