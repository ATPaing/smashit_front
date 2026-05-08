// lib
import { Routes, Route } from "react-router-dom";

// pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// css
import "./App.css";

// components
import ProtectedRoute from "./components/ProtectedRoute";
import HomeRedirect from "./components/HomeRedirect";


function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<HomeRedirect />} />
                <Route path="/signup" element= {<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
