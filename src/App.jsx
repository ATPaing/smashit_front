// lib
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import DashboardMain from "./pages/DashboardMain";
import GameDetailsPage from "./pages/GameDetailsPage";

// css
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

// components
import ProtectedRoute from "./components/ProtectedRoute";
import HomeRedirect from "./components/HomeRedirect";

// dashboard sub-pages
import DashboardHome from "./pages/DashboardHome";
import GamesPage from "./pages/GamesPage";
import NotificationsPage from "./pages/NotificationsPage";
import FriendsPage from "./pages/FriendsPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomeRedirect />} />

                <Route path="/signup" element={<Signup />} />

                <Route path="/login" element={<Login />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardMain />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<DashboardHome />} />

                    <Route path="games" element={<GamesPage />} />

                    <Route path="games/:gameId" element={<GameDetailsPage />} />

                    <Route
                        path="notifications"
                        element={<NotificationsPage />}
                    />

                    <Route path="friends" element={<FriendsPage />} />

                    <Route path="profile" element={<ProfilePage />} />

                    <Route path="settings" element={<SettingsPage />} />
                </Route>
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}

export default App;
