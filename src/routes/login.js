import GuestGuard from '../utils/route-guard/GuestGuard';

import Login from '../pages/authentication/login';

const LoginRoutes = {
    path: '/login',
    element: (
        <GuestGuard>
            <Login />
        </GuestGuard>
    )
};

export default LoginRoutes;
