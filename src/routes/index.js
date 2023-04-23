import { useRoutes } from 'react-router-dom';

import AdminRoutes from './admin';
import LoginRoutes from './login';
import UserRoutes from './user';

export default function Routes() {
    return useRoutes([AdminRoutes, LoginRoutes, UserRoutes]);
}
