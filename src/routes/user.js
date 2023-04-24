import Layout from '../layout';
import UserGuard from '../utils/route-guard/UserGuard';
import Books from '../pages/users/books';

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
