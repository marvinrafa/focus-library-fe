import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import { useLocation, useNavigate } from 'react-router-dom';

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
        </React.Fragment>
    );
};