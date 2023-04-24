import { useState, useEffect } from 'react';
import { Box, TextField, MenuItem, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const GlobalFilter = ({ currentFilters, setFilters, availableFilters, onClose }) => {
    const theme = useTheme();
    const [newFilters, setNewFilters] = useState(currentFilters);

    useEffect(() => {
        setNewFilters(currentFilters || []);
    }, [currentFilters]);

    return (
        <Box p={3} mt={6}>
            <Box mt="12px" display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5">Filters</Typography>
            </Box>
            {availableFilters.map((f, index) => {
                if (f.type === 'text')
                    return (
                        <Box mt="28px" mb="24px">
                            <TextField
                                key={`text-field-${index}`}
                                sx={{ mt: 2 }}
                                fullWidth
                                label={f.label}
                                value={newFilters.find((item) => f.name === item.name)?.value || ''}
                                onChange={(e) => {
                                    const removedKeyFilter = newFilters.filter((item) => f.name !== item.name);
                                    setNewFilters([...removedKeyFilter, { name: f.name, value: e.target.value }]);
                                }}
                            />
                        </Box>
                    );
                else if (f.type === 'select') {
                    <TextField
                        key={`text-field-select${index}`}
                        sx={{ mt: 2 }}
                        label={f.label}
                        fullWidth
                        select
                        value={newFilters.find((item) => f.name === item.name)?.value || null}
                        onChange={(e) => {
                            const removedKeyFilter = newFilters.filter((item) => f.name !== item.name);
                            setNewFilters([...removedKeyFilter, { name: f.name, value: e.target.value }]);
                        }}
                    >
                        {Object.keys(f.values).map((key) => (
                            <MenuItem key={key} value={key}>
                                {f.values[key]}
                            </MenuItem>
                        ))}
                    </TextField>;
                }
                return <></>;
            })}
            <Box mt="65px" mb="37px" display="flex" justifyContent="space-between">
                <Button onClick={() => setNewFilters([])} variant="outlined">
                    Reset
                </Button>
                <Button
                    onClick={() => {
                        onClose();
                        if (setFilters) {
                            setFilters(newFilters);
                        }
                    }}
                    variant="contained"
                    sx={{ color: theme.palette.background.paper }}
                >
                    Apply
                </Button>
            </Box>
        </Box>
    );
};

export default GlobalFilter;
