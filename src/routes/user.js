import Layout from '../layout';
import UserGuard from '../utils/route-guard/UserGuard';
import Books from '../pages/users/books';
import BookDetail from '../pages/users/bookDetails';
import CheckoutHistory from '../pages/users/checkoutHistory';

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
        },
        {
            path: '/books/:id',
            element: <BookDetail />
        },
        {
            path: '/history',
            element: <CheckoutHistory />
        }
    ]
};

export default MainRoutes;
