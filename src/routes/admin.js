import Layout from '../layout';
import AdminGuard from '../utils/route-guard/AdminGuard';
import UserDetails from '../pages/admin/userDetail';
import UsersManagemet from '../pages/admin/users';
import Books from '../pages/admin/books';

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
        },
        {
            path: '/admin/books',
            element: <Books />
        }
    ]
};

export default MainRoutes;
