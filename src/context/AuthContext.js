import { useState, createContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

const initialState = {
    isLoggedIn: false,
    user: null
};

export const ContextProvider = (props) => {
    const [state, setState] = useState(initialState);

    const setLoginSuccess = (isLoggedIn) => setState({ isLoggedIn });

    const login = async (email, password) => {
        setLoginSuccess(false);

        const response = await axios.post('/login', { email, password });
        if (response && response.status === 200) {
            const { user, token } = response.data;
            setState({ isLoggedIn: true, user: user });
            axios.defaults.headers.common.authorization = `Bearer ${token}`;
            localStorage.setItem('token', token);
        }
    };

    const setUser = async (user) => {
        setState({ isLoggedIn: true, user: user });
    };

    const logout = async () => {
        await axios.post('/logout');
        setState({ isLoggedIn: false, user: null });

        localStorage.removeItem('token');
        delete axios.defaults.headers.common.authorization;
    };

    return (
        <AuthContext.Provider
            value={{
                state,
                login,
                setUser,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
