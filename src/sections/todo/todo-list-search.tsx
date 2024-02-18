import SearchIcon from '@mui/icons-material/Search';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SvgIcon from '@mui/material/SvgIcon';

import TextField from '@mui/material/TextField';
interface TodoSearch {
    checkFilter: string;
    setCheckFilter: any;
    search: string;
    setSearch: any
}
export const TodoListSearch = (props: TodoSearch) => {
    const {
        checkFilter,
        setCheckFilter,
        search,
        setSearch
    } = props;

    const sortOptions = [
        {
            label: 'Id',
            value: 'id'
        },
        {
            label: 'Todo',
            value: 'todo'
        },
        {
            label: 'UserId',
            value: 'userid'
        },

    ];

    return (
        <Box sx={{ display: "flex", flexDirection: "row-reverse", gap: "20px" }}>

            <Grid item md={12}>

                <TextField label="Filter By" name="sort" select SelectProps={{ native: true }} value={checkFilter} onChange={(e) => setCheckFilter(e.target.value)}>
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value} > {option.label} </option>
                    ))}
                </TextField>
            </Grid>
            <Box component="form" sx={{ flexGrow: 1 }} >
                <OutlinedInput
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    fullWidth
                    name="orderNumber"
                    placeholder="Search todo"
                    startAdornment={(
                        <InputAdornment position="start">
                            <SvgIcon> <SearchIcon /> </SvgIcon>
                        </InputAdornment>
                    )}
                />
            </Box>
        </Box>
    );
};

