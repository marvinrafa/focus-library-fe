import { DataGrid } from '@mui/x-data-grid';
import { Box, Drawer, IconButton, OutlinedInput, Typography, debounce } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { getBooks } from '../../services/adminService';
import { AddCircle, Edit, FilterAlt, Search } from '@mui/icons-material';
import GlobalFilter from '../../components/filter';
import EditBook from '../../components/editBook';

export default function Books() {
    const [books, setBooks] = useState([]);
    const [status, setStatus] = useState(0);
    const [responseInfo, setResponseInfo] = useState({
        total: 0,
        availableFilters: []
    });
    const [requestParams, setRequestParams] = useState({
        filters: [],
        page: 1
    });
    const [openAdd, setOpenAdd] = useState(false);
    const [editedId, setEditedId] = useState(null);
    const [openFilter, setOpenFilter] = useState(false);
    const [searchText, setSearchText] = useState('');

    const debouncedSearchTextChange = useMemo(() => debounce(setSearchText, 250), []);

    useEffect(() => {
        refreshData();
    }, [requestParams]);

    const refreshData = () => {
        setStatus(0);
        getBooks(setBooks, requestParams, setResponseInfo, setStatus);
    };

    useEffect(() => {
        setRequestParams((r) => ({
            ...r,
            filters: [...(r.filters?.filter((f) => f.name !== 'title') || []), { name: 'title', value: searchText }]
        }));
    }, [searchText]);

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1, sortable: false },
        { field: 'title', headerName: 'Title', flex: 1, sortable: false },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <IconButton onClick={() => setEditedId(params.id)}>
                    <Edit />
                </IconButton>
            )
        }
    ];

    return (
        <Box>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h4">Books</Typography>
                <Box display="flex">
                    <IconButton color="primary" size="large" onClick={() => setOpenAdd(true)}>
                        <AddCircle fontSize="25px" />
                    </IconButton>
                    <IconButton size="large" onClick={() => setOpenFilter(true)}>
                        <FilterAlt fontSize="25px" />
                    </IconButton>
                </Box>
            </Box>
            <OutlinedInput
                startAdornment={<Search stroke={1.5} size="1rem" />}
                onChange={(e) => debouncedSearchTextChange(e.target.value)}
                size="small"
                placeholder="Search..."
            />
            <DataGrid
                sx={{
                    '.MuiDataGrid-cell:focus': {
                        outline: 'none'
                    },
                    '& .MuiDataGrid-row:hover': {
                        cursor: 'pointer'
                    }
                }}
                disableColumnFilter
                disableColumnMenu
                disableRowSelectionOnClick
                paginationMode="server"
                pageSizeOptions={[10]}
                paginationModel={{ page: requestParams.page - 1, pageSize: 10 }}
                onPaginationModelChange={(model) => {
                    // MUI STARTS IN 0
                    if (model.page !== requestParams.page - 1) setRequestParams((c) => ({ ...c, page: model.page + 1 }));
                }}
                rows={books}
                columns={columns}
                pageSize={10}
                rowCount={responseInfo.total}
                loading={status === 0}
                onCellClick={(params) => setEditedId(params.id)}
            />
            <Drawer
                PaperProps={{ style: { width: '500px' } }}
                anchor="right"
                open={openAdd || editedId !== null}
                onClose={() => {
                    setOpenAdd(false);
                    setEditedId(null);
                }}
            >
                <EditBook
                    onClose={() => {
                        setOpenAdd(false);
                        setEditedId(null);
                        refreshData();
                    }}
                    id={editedId}
                />
            </Drawer>

            <Drawer
                PaperProps={{ style: { width: '400px' } }}
                anchor="right"
                open={openFilter}
                onClose={() => {
                    setOpenFilter(false);
                }}
            >
                <GlobalFilter
                    onClose={() => {
                        setOpenFilter(false);
                    }}
                    currentFilters={requestParams.filters}
                    availableFilters={responseInfo.availableFilters}
                    setFilters={(filters) => setRequestParams((c) => ({ ...c, filters }))}
                />
            </Drawer>
        </Box>
    );
}
