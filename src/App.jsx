import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Use Routes instead of Router for route definitions
import { NavigationProvider } from './apis/context/navigateContext';
import {LandingPage,LoginPage} from './utils/index';
import PatientRegister from './pages/PatientRegister';
import PrescriberDashboard from './pages/PrescriberDashboard';
import PharmacistDashboard from './pages/PharmacistDashboard';
import ManageUsers from "./pages/auth/ManageUsers"
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './utils/PrivateRoute'; // Import the PrivateRoute component


function App() {
  return (
    <BrowserRouter>
      <NavigationProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/triage" element={<PrivateRoute><PatientRegister /></PrivateRoute>} />
          <Route path="/prescriber" element={<PrivateRoute><PrescriberDashboard /></PrivateRoute>} />
          <Route path="/pharmacy" element={<PrivateRoute><PharmacistDashboard /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute><ManageUsers /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />

        </Routes>
      </NavigationProvider>
    </BrowserRouter>
  );
};

export default App;
