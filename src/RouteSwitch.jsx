import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TryGlasses from './TryGlasses';

const RouteSwitch = () => (
    <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/try-glasses/:glassesUrl" element={<TryGlasses />} />
        </Routes>
    </Router>
);

export default RouteSwitch;
