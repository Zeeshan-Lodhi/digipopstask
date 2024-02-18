import { useUpdateTodoMutation } from "@/redux/services/todo";
import { TodosData, UpdateTodo } from "@/types/todo";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Chip, MenuItem, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { Field, Form, Formik } from "formik";
import type { ChangeEvent, MouseEvent } from "react";
import { Fragment, useCallback, useState } from "react";
import { toast } from "react-hot-toast";
export interface TodoInterface {
    items?: TodosData[];
    count?: number;
    onPageChange?: (
        event: MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => void;
    onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    page?: number;
    rowsPerPage?: number;
}
export const TodoListTable = (props: TodoInterface) => {
    let {
        count = 0,
        items,
        onPageChange = () => { },
        onRowsPerPageChange,
        page = 0,
        rowsPerPage = 0,
    } = props;
    const [updateTodo, { isLoading }] = useUpdateTodoMutation()

    const [currentProduct, setCurrentProduct] = useState<number | null>(0);

    const handleProductToggle = useCallback((productId: number): void => {
        setCurrentProduct((prevProductId) => {
            if (prevProductId === productId) {
                return null;
            }

            return productId;
        });
    }, []);

    const handleProductClose = useCallback((): void => {
        setCurrentProduct(null);
    }, []);

    const handleEditFare = async (values: UpdateTodo) => {
        updateTodo({ ...values, completed: JSON.parse(String(values.completed)) }).unwrap().then((elm) => {
            toast.success("Todo Updated!")

        }).catch((err) => { toast.error(err.data.message) })
    };

    return (
        <div>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell >Id</TableCell>
                        <TableCell >Todo</TableCell>
                        <TableCell>User Id</TableCell>
                        <TableCell >Completed</TableCell>

                    </TableRow>
                </TableHead>

                <TableBody>
                    {items?.map((todo) => {
                        const isCurrent = todo?.id === currentProduct;
                        return (
                            <Fragment key={todo.id}>
                                <TableRow hover key={todo.id}>
                                    <TableCell
                                        padding="checkbox"
                                        sx={{
                                            ...(isCurrent && {
                                                position: "relative",
                                                "&:after": {
                                                    position: "absolute",
                                                    content: '" "',
                                                    top: 0,
                                                    left: 0,
                                                    backgroundColor: "primary.main",
                                                    width: 3,
                                                    height: "calc(100% + 1px)",
                                                },
                                            }),
                                        }}
                                    >
                                        <IconButton
                                            onClick={() => handleProductToggle(todo.id)}
                                        >
                                            <SvgIcon>
                                                {" "}
                                                {isCurrent ? (
                                                    <KeyboardArrowDownIcon />
                                                ) : (
                                                    <KeyboardArrowRightIcon />
                                                )}{" "}
                                            </SvgIcon>
                                        </IconButton>
                                    </TableCell>


                                    <TableCell>
                                        {todo?.id}
                                    </TableCell>
                                    <TableCell>
                                        {todo?.todo}
                                    </TableCell>
                                    <TableCell >
                                        {todo.userId}
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={todo.completed ? "Yes" : "No"} color={todo.completed ? "primary" : "error"} />
                                    </TableCell>
                                </TableRow>

                                {isCurrent && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            sx={{
                                                p: 0,
                                                position: "relative",
                                                "&:after": {
                                                    position: "absolute",
                                                    content: '" "',
                                                    top: 0,
                                                    left: 0,
                                                    backgroundColor: "primary.main",
                                                    width: 3,
                                                    height: "calc(100% + 1px)",
                                                },
                                            }}
                                        >
                                            <CardContent>

                                                <Formik initialValues={todo} onSubmit={handleEditFare} >
                                                    {({ values }) => (
                                                        <Form>
                                                            <Grid container spacing={3} >
                                                                <Grid item md={4} xs={12} >
                                                                    <Field as={TextField} label="Todo" name="todo" fullWidth />
                                                                </Grid>
                                                                <Grid item md={4} xs={12} >
                                                                    <Field as={TextField} label="Status" name="completed" fullWidth select >
                                                                        <MenuItem value="true">Completed</MenuItem>
                                                                        <MenuItem value="false">Not Completed</MenuItem>
                                                                    </Field>
                                                                </Grid>
                                                                <Grid item md={4} xs={12} >
                                                                    <Field as={TextField} label="User Id" type="number" name="userId" fullWidth />
                                                                </Grid>
                                                                {/* Update and cancle buttons */}
                                                                <Stack
                                                                    ml={3}
                                                                    mt={2}
                                                                    alignItems="center"
                                                                    direction="row"
                                                                    justifyContent="space-between"

                                                                >
                                                                    <Stack
                                                                        alignItems="center"
                                                                        direction="row"
                                                                        spacing={2}
                                                                    >
                                                                        <Button
                                                                            disabled={isLoading}
                                                                            type="submit"
                                                                            variant="contained"
                                                                            sx={{ width: "80px" }}
                                                                        >
                                                                            Update
                                                                        </Button>

                                                                        <Button
                                                                            color="inherit"
                                                                            onClick={handleProductClose}
                                                                        >
                                                                            Close
                                                                        </Button>
                                                                    </Stack>

                                                                </Stack>
                                                            </Grid>

                                                        </Form>
                                                    )}
                                                </Formik>
                                            </CardContent>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </Fragment>
                        );
                    })}
                </TableBody>
            </Table>
            {
                items?.length === 0 && <Typography textAlign="center" margin="auto" m={2}>No todo to display</Typography>
            }
            <Box position="fixed" right={0} bottom={0} sx={{ backgroundColor: "white" }}>

                <TablePagination
                    component="div"
                    count={count}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Box>
        </div>
    );
};

// TodoListTable.propTypes = {
//     count: PropTypes.number,
//     items: PropTypes.any,
//     onPageChange: PropTypes.func,
//     onRowsPerPageChange: PropTypes.func,
//     page: PropTypes.number,
//     rowsPerPage: PropTypes.number,
// };
