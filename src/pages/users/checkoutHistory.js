import { DataGrid } from '@mui/x-data-grid';
import { Box, Chip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Done, Warning } from '@mui/icons-material';
import { getCheckoutHistory } from '../../services/userService';

export default function CheckoutHistory() {
    const [checkouts, setCheckouts] = useState([]);
    const [status, setStatus] = useState(0);
    const [responseInfo, setResponseInfo] = useState({
        total: 0
    });
    const [requestParams, setRequestParams] = useState({
        page: 1
    });

    useEffect(() => {
        refreshData();
    }, [requestParams]);

    const refreshData = () => {
        setStatus(0);
        getCheckoutHistory(setCheckouts, requestParams, setResponseInfo, setStatus);
    };

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1, sortable: false, hidden: true },
        { field: 'book', headerName: 'Book title', flex: 1, sortable: false, valueGetter: (params) => params.row.book.title },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            sortable: false,
            renderCell: (params) =>
                !params.row.active ? (
                    <Chip disabled size="large" label="Returned" color="success" deleteIcon={<Done />} />
                ) : (
                    <Chip label="Active" color="warning" deleteIcon={<Warning />} />
                )
        }
    ];

    return (
        <Box>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h4">Checkout History</Typography>
            </Box>
            <DataGrid
                sx={{
                    '.MuiDataGrid-cell:focus': {
                        outline: 'none'
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
                rows={checkouts}
                columns={columns}
                pageSize={10}
                rowCount={responseInfo.total}
                loading={status === 0}
                columnVisibilityModel={{
                    id: false
                }}
            />
        </Box>
    );
}
