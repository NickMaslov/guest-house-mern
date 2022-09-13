import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/booking' exact element={<Booking />} />
                    <Route path='/login' exact element={<Login />} />
                    <Route path='/register' exact element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
