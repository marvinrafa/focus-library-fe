import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, MenuItem, TextField, Typography } from '@mui/material';
import { createUser, getUser, updateUser } from '../services/adminService';
import { useSnackbar } from 'notistack';

const EditUser = ({ id = null, onClose, refresh }) => {
    const [status, setStatus] = useState(id ? 0 : 1);
    const [user, setUser] = useState({
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        role: 'student'
    });
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (id) getUser(id, setUser, setStatus);
    }, []);

    const handleSave = async () => {
        if (id) {
            const response = await updateUser(id, user);
            if (response.status === 200) {
                enqueueSnackbar('Success updating user', { variant: 'success', autoHideDuration: 1000 });
                onClose();
            }
        } else {
            const response = await createUser(user);
            if (response.status === 201) {
                enqueueSnackbar('Success creating user', { variant: 'success', autoHideDuration: 1000 });
                onClose();
            }
        }
    };

    return (
        <Box mt={8} p={3}>
            {status !== 1 ? (
                <CircularProgress />
            ) : (
                <>
                    <Typography variant="h5">{id ? 'Edit user' : 'Add user'}</Typography>
                    <TextField
                        sx={{ my: 2 }}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label="First name"
                        value={user.first_name}
                        onChange={(e) => setUser((c) => ({ ...c, first_name: e.target.value }))}
                    />
                    <TextField
                        sx={{ my: 2 }}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label="Last name"
                        value={user.last_name}
                        onChange={(e) => setUser((c) => ({ ...c, last_name: e.target.value }))}
                    />
                    <TextField
                        sx={{ my: 2 }}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label="Email"
                        value={user.email}
                        onChange={(e) => setUser((c) => ({ ...c, email: e.target.value }))}
                    />
                    <TextField
                        sx={{ my: 2 }}
                        fullWidth
                        select
                        label="Role"
                        value={user.role}
                        onChange={(e) => setUser((c) => ({ ...c, role: e.target.value }))}
                    >
                        <MenuItem key="student" value="student">
                            Student
                        </MenuItem>
                        <MenuItem key="librarian" value="librarian">
                            Librarian
                        </MenuItem>
                    </TextField>
                    <Button onClick={handleSave} variant="contained">
                        Save
                    </Button>
                </>
            )}
        </Box>
    );
};

export default EditUser;
