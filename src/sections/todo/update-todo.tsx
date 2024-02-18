import { AddTodo, UpdateTodo } from '@/types/todo';
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { Field, useFormikContext } from 'formik';


interface Todo {
    isLoading: boolean
    handleClose?: () => void;
}
const Updatetodo = ({ handleClose, isLoading }: Todo) => {
    let { handleSubmit } = useFormikContext<UpdateTodo>();
    const Submit = () => {
        handleSubmit()
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                    <Typography variant='h6'>Update Todo</Typography>
                </Grid>
                <Grid item md={12} xs={12}>
                    <Field as={TextField} name="todo" label="Todo" fullWidth />
                </Grid>
                <Grid item md={12} xs={12}>
                    <Field as={TextField} name="userId" type="number" label="User Id" fullWidth />
                </Grid>
                <Grid item md={12} xs={12}>
                    <Field as={TextField} name="completed" label="Status" fullWidth select >
                        <MenuItem value="true">Completed</MenuItem>
                        <MenuItem value="false">Not Completed</MenuItem>
                    </Field>
                </Grid>
                <Grid md={12} mt={2} ml={2}>
                    <Button variant="contained" onClick={Submit} disabled={isLoading} > Update Todo </Button>
                    <Button variant="outlined" onClick={handleClose} sx={{ ml: 2 }}> Close </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Updatetodo