// lib
import { Routes, Route } from "react-router-dom";

// pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import DashboardMain from "./pages/DashboardMain";

// css
import "./App.css";

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

                <Route path="notifications" element={<NotificationsPage />} />

                <Route path="friends" element={<FriendsPage />} />

                <Route path="profile" element={<ProfilePage />} />

                <Route path="settings" element={<SettingsPage />} />
            </Route>
        </Routes>
    );
}

export default App;
