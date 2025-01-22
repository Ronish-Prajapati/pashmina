import { Routes, Route } from "react-router-dom";
import Pass from './Pass.jsx';
import { AuthProvider } from './context/AuthContext';
import Login from './Login.jsx';
import UserList from './UserList.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'
import './App.css'
import '@fontsource/roboto';
import DashboardHome from "./Dashboard.jsx";
function App() {
  

  return (


   
    <AuthProvider>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected UserList Route */}
        <Route 
          path="/userlist" 
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          } 
        />
        
        {/* Register Route */}
        <Route path="/" element={<Pass />} />
      </Routes>
    </AuthProvider>
 


  )
}

export default App
