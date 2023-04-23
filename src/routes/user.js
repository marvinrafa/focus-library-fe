import { lazy } from 'react';

// import AuthGuard from 'utils/route-guard/AuthGuard';
import Layout from '../layout';
import UserGuard from '../utils/route-guard/UserGuard';

// sample page routing
const Books = lazy(() => import('../pages/users/books'));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <UserGuard>
            <Layout type="user" />
        </UserGuard>
    ),
    children: [
        {
            path: '/',
            element: <Books />
        },
        {
            path: '/books',
            element: <Books />
        }
    ]
};

export default MainRoutes;
