import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import { useLocation, useNavigate } from 'react-router-dom';

export const UserListItems = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <ListItemButton selected={pathname === '/books' || pathname === '/'} onClick={() => navigate('/books')}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Books" />
            </ListItemButton>
        </React.Fragment>
    );
};
