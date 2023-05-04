import { Navigate } from "react-router-dom";

const Protected = ({ isLoggedIn, handleNotification, children }) => {

    if(!isLoggedIn) {
        handleNotification('You need to be logged in to do that.', 'error');
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default Protected;