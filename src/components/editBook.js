import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, FormControlLabel, MenuItem, Switch, TextField, Typography } from '@mui/material';
import { createBook, getAuthorsList, getBook, getGenresList, updateBook } from '../services/adminService';
import { useSnackbar } from 'notistack';

const EditBook = ({ id = null, onClose, refresh }) => {
    const [status, setStatus] = useState(id ? 0 : 1);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [book, setBook] = useState({
        id: '',
        title: '',
        author_id: null,
        genre_id: null,
        published: true,
        year: 2023,
        base_stock: 1
    });
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (id) getBook(id, setBook, setStatus);
        getAuthorsList(setAuthors);
        getGenresList(setGenres);
    }, []);

    const handleSave = async () => {
        if (id) {
            const response = await updateBook(id, book);
            if (response.status === 200) {
                enqueueSnackbar('Success updating book', { variant: 'success', autoHideDuration: 1000 });
                onClose();
            }
        } else {
            const response = await createBook(book);
            if (response.status === 201) {
                enqueueSnackbar('Success creating book', { variant: 'success', autoHideDuration: 1000 });
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
                        label="Title"
                        value={book.title}
                        onChange={(e) => setBook((c) => ({ ...c, title: e.target.value }))}
                    />
                    <TextField
                        sx={{ my: 2 }}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label="Year"
                        type="number"
                        value={book.year}
                        onChange={(e) => setBook((c) => ({ ...c, year: e.target.value }))}
                    />
                    <TextField
                        sx={{ my: 2 }}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label="Base Stock"
                        type="number"
                        value={book.base_stock}
                        onChange={(e) => setBook((c) => ({ ...c, base_stock: e.target.value }))}
                    />
                    <TextField
                        sx={{ fontSize: '12px', my: 2 }}
                        fullWidth
                        select
                        onChange={(e) => setBook((c) => ({ ...c, author_id: e.target.value }))}
                        value={book.author_id}
                        InputLabelProps={{ shrink: true }}
                        label="Author"
                    >
                        {authors.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        sx={{ fontSize: '12px', my: 2 }}
                        fullWidth
                        select
                        onChange={(e) => setBook((c) => ({ ...c, genre_id: e.target.value }))}
                        value={book.genre_id}
                        InputLabelProps={{ shrink: true }}
                        label="Genre"
                    >
                        {genres.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <FormControlLabel
                        sx={{ width: '100%' }}
                        control={
                            <Switch checked={book.published} onChange={(e) => setBook((c) => ({ ...c, published: e.target.checked }))} />
                        }
                        label="Is published?"
                    />
                    <Button onClick={handleSave} variant="contained" sx={{ mt: 2 }}>
                        Save
                    </Button>
                </>
            )}
        </Box>
    );
};

export default EditBook;
