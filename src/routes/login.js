import { lazy } from 'react';
import GuestGuard from '../utils/route-guard/GuestGuard';

const Login = lazy(() => import('../pages/authentication/login'));

const LoginRoutes = {
    path: '/login',
    element: (
        <GuestGuard>
            <Login />
        </GuestGuard>
    )
};

export default LoginRoutes;
