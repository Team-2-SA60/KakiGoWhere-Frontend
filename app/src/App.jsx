import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import AdminLogin from './pages/AdminLogin';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminManagePlace from './pages/AdminManagePlace'
import AdminPlaceDetail from './pages/AdminPlaceDetail';
import AdminCreatePlace from './pages/AdminCreatePlace';
import AdminEvents from './pages/AdminEvents.jsx'
import AdminCreateEvent from './pages/AdminCreateEvent.jsx';
import AdminEventDetail from './pages/AdminEventDetail.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route element={<AdminRoute />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/places' element={<AdminManagePlace />} />
          <Route path='/admin/place/:id' element={<AdminPlaceDetail />} />
          <Route path='/admin/place/create' element={<AdminCreatePlace />} />
          <Route path='/admin/events' element={<AdminEvents />} />
          <Route path='/admin/events/create' element={<AdminCreateEvent />} />
          <Route path='/admin/events/:id' element={<AdminEventDetail />}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
