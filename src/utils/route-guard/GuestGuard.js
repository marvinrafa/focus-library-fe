import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const GuestGuard = ({ children }) => {
    const navigate = useNavigate();
    const { state: ContextState, setUser } = useContext(AuthContext);
    const { isLoggedIn, user } = ContextState;
    const sessionToken = localStorage.getItem('token');

    useEffect(() => {
        if (sessionToken !== null && !isLoggedIn) {
            const init = async () => {
                if (sessionToken && verifyToken(sessionToken)) {
                    setSession(sessionToken);
                    const response = await axios.get('/profile');
                    const { user } = response.data;
                    if (user) {
                        setUser(user);
                    }
                } else {
                    setSession(null);
                }
            };
            init();
        }
        if (isLoggedIn && user.role === 'librarian') {
            navigate('/admin/users', { replace: true });
        }

        if (isLoggedIn && user.role === 'student') {
            navigate('/books', { replace: true });
        }
    }, [isLoggedIn, navigate, user, sessionToken, setUser]);

    if (!isLoggedIn) return children;
};

const verifyToken = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded = jwtDecode(serviceToken);
    /**
     * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
     */
    return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken = null) => {
    if (serviceToken) {
        localStorage.setItem('token', serviceToken);
        axios.defaults.headers.common.authorization = `Bearer ${localStorage.getItem('token')}`;
    } else {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common.authorization;
    }
};

export default GuestGuard;
