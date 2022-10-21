import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export const PublicRoute = ({
    children,
}) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated) {
        return <Navigate to={'/'} replace />
    }

    return (
        <>
            {children}
        </>
    );
}