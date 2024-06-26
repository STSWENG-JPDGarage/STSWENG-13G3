// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from "./hooks/useAuthContext"

// pages & components
import Inventory from './pages/Inventory'
import SalesPage from './pages/SalesPage'
import AddInventoryItems from './pages/AddInventoryItems'
import ShoppingCart from './pages/ShoppingCart'
import AuditLog from './pages/AuditLog'
import Dashboard from './pages/Dashboard'
import VerifiedUserList from './pages/VerifiedUserList'
import Calendar from './pages/Calendar'
import AddVerifiedUser from './pages/AddVerifiedUser'
import EditVerifiedUser from './pages/EditVerifiedUser'
import AdminControlCenter from './pages/AdminControlCenter';
import Login from './pages/Login'
import EditItem from './pages/EditItem'

import { Row, Col, Container } from 'react-bootstrap';
import Sidebar from './components/Sidebar'
import NavigationBar from './components/Navbar';
import Header from './components/Header';
import { useState, useEffect  } from 'react';
import Payments from './pages/Payments';

import Notification from './components/Notification';
import NotificationPanel from './components/NotificationPanel';

function App() {
  const { user, isLoading } = useAuthContext()

  // states to track if on login page
  const [isLoginPage, setIsLoginPage] = useState(false);

  // Conditional styling (background) for login page
  const loginbg = {
    backgroundImage: isLoginPage ? "url(/BackgroundRedBlur.png)" : "none",
    backgroundRepeat: isLoginPage ? 'no-repeat' : "none",
    height: isLoginPage ? '100vh' : "auto",
    width: isLoginPage ? '100wh' : "auto",
    backgroundSize: isLoginPage ? '40% 100vh' : "auto",
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App" style={loginbg}>
      <BrowserRouter>

        <ConditionalNavbar setIsLoginPage={setIsLoginPage} />
        <Row>
        <Col sm={10} className="pages px-0">
          <Routes>

            <Route
              path="/"
              element={!user && !isLoading ? <Login /> : <Navigate to="/dashboard" />}
            />

            <Route
              path="/dashboard"
              element={user && !isLoading ? <Dashboard /> : <Navigate to="/" />}
            />

            <Route
              path="/inventory"
              element={user && !isLoading ? <Inventory /> : <Navigate to="/" />}
            />

            <Route
              path="/sales-page"
              element={(user && !isLoading && (user.role === "Admin" || user.role === "Secretary")) ? <SalesPage /> : <Navigate to="/" />}
            />

            <Route
              path="/inventory/add-items"
              element={(user && !isLoading && (user.role === "Admin" || user.role === "Partsman")) ? <AddInventoryItems /> : <Navigate to="/" />}
            />
            
              <Route
                path="/payments"
                element={(user && !isLoading && (user.role === "Admin" || user.role === "Secretary")) ? <Payments /> : <Navigate to="/"/>}
              />  

            <Route
              path="/shopping-cart"
              element={user && !isLoading ? <ShoppingCart /> : <Navigate to="/" />}
            />

            <Route
              path="/audit-log"
              element={user && !isLoading ? <AuditLog /> : <Navigate to="/" />}
            />

            <Route
              path="/verified-user-list"
              element={(user && !isLoading && user.role === "Admin") ? <VerifiedUserList /> : <Navigate to="/" />}
            />

            <Route
              path="/calendar"
              element={user && !isLoading ? <Calendar /> : <Navigate to="/" />}
            />

            <Route
              path="/add-verified-user"
              element={(user && !isLoading && user.role === "Admin") ? <AddVerifiedUser /> : <Navigate to="/" />}
            />

            <Route
              path="/edit-verified-user"
              element={(user && !isLoading && user.role === "Admin") ? <EditVerifiedUser /> : <Navigate to="/" />}
            />

            <Route
              path="/edit-item/:id"
              element={(user && !isLoading && (user.role === "Admin" || user.role === "Partsman")) ? <EditItem /> : <Navigate to="/" />}
            />

            <Route
              path='/admin-control-center'
              element={(user && !isLoading && user.role === "Admin") ? <AdminControlCenter /> : <Navigate to="/" />}
            />

          </Routes>

        </Col>
        <Col sm={2} className='col-5 px-0 my-0'>{window.location.pathname !== '/' && <NotificationPanel/>}</Col>
        </Row>
        
      </BrowserRouter>

    </div>
  );
}


function ConditionalNavbar({ setIsLoginPage }) {
  const location = useLocation()

  // Added this to implement conditional styling of background for the login page
  if (location.pathname === '/') {
    setIsLoginPage(true);
  } else {
    setIsLoginPage(false);
  }

  if (location.pathname === '/') {
    return null
  }

  return <NavigationBar />
}


export default App;
