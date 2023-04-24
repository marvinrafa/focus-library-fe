import { DataGrid } from '@mui/x-data-grid';
import { Box, Drawer, IconButton, OutlinedInput, Typography, debounce } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { getUsers } from '../../services/adminService';
import { AddCircle, Edit, FilterAlt, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import EditUser from '../../components/editUser';
import GlobalFilter from '../../components/filter';

export default function Users() {
    const [users, setUsers] = useState([]);
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

    const navigate = useNavigate();

    useEffect(() => {
        refreshData();
    }, [requestParams]);

    const refreshData = () => {
        setStatus(0);
        getUsers(setUsers, requestParams, setResponseInfo, setStatus);
    };

    useEffect(() => {
        setRequestParams((r) => ({
            ...r,
            filters: [...(r.filters?.filter((f) => f.name !== 'first_name') || []), { name: 'first_name', value: searchText }]
        }));
    }, [searchText]);

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1, sortable: false },
        { field: 'first_name', headerName: 'First name', flex: 1, sortable: false },
        { field: 'last_name', headerName: 'Last name', flex: 1, sortable: false },
        { field: 'email', headerName: 'Email', flex: 1, sortable: false },
        { field: 'role', headerName: 'Role', flex: 1, sortable: false },
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
                <Typography variant="h4">Students</Typography>
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
                onPaginationModelChange={(model) => setRequestParams(model.page)}
                rows={users}
                columns={columns}
                pageSize={10}
                rowCount={responseInfo.total}
                loading={status === 0}
                onCellClick={(params) => {
                    if (params.field !== 'action') navigate(`/admin/users/${params.id}`);
                }}
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
                <EditUser
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
