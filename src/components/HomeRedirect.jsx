import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const HomeRedirect = () => {

    const { loading, isAuthenticated } = useAuth();

    if (loading) {
        return <p>Loading...</p>;
    }

    return isAuthenticated
        ? <Navigate to="/dashboard" replace />
        : <Navigate to="/login" replace />;
};

export default HomeRedirect;