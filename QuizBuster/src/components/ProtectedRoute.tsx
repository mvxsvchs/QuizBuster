import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
    isLoggedIn: boolean;
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;

