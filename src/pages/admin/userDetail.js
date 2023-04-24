import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { finishBookCheckout, getUser } from '../../services/adminService';
import { ArrowBack, Done, Warning } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export default function UserDetails() {
    const { id } = useParams();
    const [user, setUser] = useState();
    const [status, setStatus] = useState(0);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setStatus(0);
        getUser(id, setUser, setStatus);
    }, [id]);

    const handleFinishCheckout = async (id, index) => {
        const response = await finishBookCheckout(id);
        if (response.status === 200) {
            const newCheckouts = user.book_checkouts;
            newCheckouts[index] = { ...newCheckouts[index], active: false };
            setUser((c) => ({ ...c, book_checkouts: newCheckouts }));
            enqueueSnackbar(response.data.message, { variant: 'success', autoHideDuration: 1000 });
        }
    };
    return (
        <Box>
            {status === 0 ? (
                <CircularProgress />
            ) : (
                <Box>
                    <Typography variant="h4">Student detail</Typography>
                    <Box mt={4}>
                        <Typography mb={2}>
                            <strong>First name: </strong>
                            {user.first_name}
                        </Typography>
                        <Typography mb={2}>
                            <strong>Last name: </strong>
                            {user.last_name}
                        </Typography>
                        <Typography mb={2}>
                            <strong>Role: </strong>
                            {user.role}
                        </Typography>
                        <Typography mb={2}>
                            <strong>Email: </strong>
                            {user.email}
                        </Typography>
                    </Box>
                    <Divider sx={{ mt: 2, mb: 4 }} />
                    <Typography variant="h5">Book checkouts: </Typography>

                    <TableContainer component={Paper} sx={{ mb: 4 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Book title</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {user.book_checkouts.map((checkout, index) => (
                                    <TableRow key={checkout.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {checkout.book.title}
                                        </TableCell>
                                        <TableCell align="right">
                                            {!checkout.active ? (
                                                <Chip disabled size="large" label="Returned" color="success" deleteIcon={<Done />} />
                                            ) : (
                                                <Chip
                                                    onClick={() => handleFinishCheckout(checkout.id, index)}
                                                    label="Mark as returned"
                                                    color="warning"
                                                    deleteIcon={<Warning />}
                                                />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button endIcon={<ArrowBack />} onClick={() => navigate('/admin/users')}>
                        Back
                    </Button>
                </Box>
            )}
        </Box>
    );
}
