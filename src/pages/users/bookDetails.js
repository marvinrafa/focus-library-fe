import { Box, Button, CircularProgress, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ArrowBack, CheckCircleOutline, Close } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { getBook, requestBookCheckout } from '../../services/userService';

export default function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState();
    const [status, setStatus] = useState(0);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setStatus(0);
        getBook(id, setBook, setStatus);
    }, [id]);

    const handleRequestCheckout = async () => {
        const response = await requestBookCheckout(id);
        if (response.status === 200) {
            const newCheckouts = book.active_checkouts_count + 1;
            setBook((c) => ({ ...c, active_checkouts_count: newCheckouts }));
            enqueueSnackbar(response.data.message, { variant: 'success', autoHideDuration: 1000 });
        }
    };
    return (
        <Box>
            {status === 0 ? (
                <CircularProgress />
            ) : (
                <Box>
                    <Typography variant="h4">Book detail</Typography>
                    <Box mt={4}>
                        <Typography mb={2}>
                            <strong>Title </strong>
                            {book.title}
                        </Typography>
                        <Typography mb={2}>
                            <strong>Available Stock: </strong>
                            {book.base_stock - book.active_checkouts_count}
                            {book.base_stock - book.active_checkouts_count > 0 ? (
                                <CheckCircleOutline sx={{ mb: -0.5 }} color="success" />
                            ) : (
                                <Close sx={{ mb: -0.5 }} color="error" />
                            )}
                        </Typography>
                        <Typography mb={2}>
                            <strong>Author: </strong>
                            {book.author.name}
                        </Typography>
                        <Typography mb={2}>
                            <strong>Genre: </strong>
                            {book.genre.name}
                        </Typography>
                        <Typography mb={2}>
                            <strong>Year: </strong>
                            {book.year}
                        </Typography>
                        <Button sx={{ mt: 2 }} variant="contained" onClick={() => handleRequestCheckout()}>
                            Request Checkout
                        </Button>
                    </Box>
                    <Divider sx={{ mt: 2, mb: 4 }} />
                    <Button endIcon={<ArrowBack />} onClick={() => navigate('/')}>
                        Back
                    </Button>
                </Box>
            )}
        </Box>
    );
}
