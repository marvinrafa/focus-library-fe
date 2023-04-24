import Layout from '../layout';
import AdminGuard from '../utils/route-guard/AdminGuard';
import UserDetails from '../pages/admin/userDetail';
import UsersManagemet from '../pages/admin/users';

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
        },
        {
            path: '/admin/users/:id',
            element: <UserDetails />
        }
    ]
};

export default MainRoutes;
