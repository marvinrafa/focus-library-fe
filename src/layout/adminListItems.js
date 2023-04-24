import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuBook } from '@mui/icons-material';

export const AdminListItems = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <ListItemButton selected={pathname === '/admin/users' || pathname === '/admin'} onClick={() => navigate('/admin/users')}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
            </ListItemButton>
            <ListItemButton selected={pathname === '/admin/books'} onClick={() => navigate('/admin/books')}>
                <ListItemIcon>
                    <MenuBook />
                </ListItemIcon>
                <ListItemText primary="Books" />
            </ListItemButton>
        </React.Fragment>
    );
};
