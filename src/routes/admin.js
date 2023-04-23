import { lazy } from 'react';

// import AuthGuard from 'utils/route-guard/AuthGuard';
import Layout from '../layout';
import AdminGuard from '../utils/route-guard/AdminGuard';

// sample page routing
const UsersManagemet = lazy(() => import('../pages/admin/users'));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/admin',
    element: (
        <AdminGuard>
            <Layout type="admin" />
        </AdminGuard>
    ),
    children: [
        {
            path: '/admin',
            element: <UsersManagemet />
        },
        {
            path: '/admin/users',
            element: <UsersManagemet />
        }
    ]
};

export default MainRoutes;
