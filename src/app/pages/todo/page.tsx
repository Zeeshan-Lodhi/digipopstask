"use client"
import { useAddTodoMutation, useGetTodosQuery } from '@/redux/services/todo';
import Addtodo from '@/sections/todo/add-todo';
import { TodoListSearch } from '@/sections/todo/todo-list-search';
import { TodoListTable } from '@/sections/todo/todo-list-table';
import { AddTodo, TodosData } from '@/types/todo';
import { applyPagination } from '@/utils/apply-pagination';
import AddIcon from '@mui/icons-material/Add';
import { Button, Container, Modal, SvgIcon } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const Page = () => {
    const { data, isLoading } = useGetTodosQuery()
    const [addTodo, { isLoading: AddLoading }] = useAddTodoMutation()
    console.log(data);
    const [count, setCount] = useState<number>(0)
    const [page, setPage] = useState<number>(0);
    const [todos, setTodos] = useState<TodosData[]>([]);
    const [open, setOpen] = useState(false);
    const [checkFilter, setCheckFilter] = useState("id")
    const [search, setSearch] = useState("")

    const [rowsPerPage, setRowsPerPage] = useState(5);


    useEffect(() => {
        if (data) {
            HandleData()
        }
    }, [data])

    const HandleData = useCallback(
        () => {
            if (data) {
                let fData: TodosData[] = [];
                if (checkFilter === "id") {
                    fData = data?.todos?.filter((todo) => {
                        return todo.id?.toString().includes(search)
                    })
                }
                else if (checkFilter === "todo") {
                    fData = data?.todos?.filter((todo) => {
                        return todo.todo?.toString().includes(search.charAt(0).toUpperCase() + search.slice(1));
                    })
                }
                else if (checkFilter === "userid") {
                    fData = data?.todos?.filter((todo) => {
                        return todo.userId?.toString().includes(search)
                    })
                }
                let todos = applyPagination(fData, page, rowsPerPage);
                setTodos(todos)
                setCount(fData.length)
            }
        },
        [data, page, rowsPerPage, search, checkFilter],
    )

    useEffect(() => {
        HandleData()
    }, [page, rowsPerPage, search, checkFilter])

    const handlePageChange = useCallback(
        (event: any, value: any) => {
            setPage(value);
        },
        [page]
    );

    const handleRowsPerPageChange = useCallback(
        (event: any) => {
            setRowsPerPage(event.target.value);
            setPage(0)
        },
        []
    );

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 2,
        p: 4,
    };
    const InitialValues: AddTodo = {
        todo: "",
        completed: false,
        userId: 0
    }
    const handleAddTodo = (values: AddTodo, { resetForm }: any) => {
        if (values.todo) {

            addTodo({ ...values, completed: JSON.parse(String(values.completed)) }).then(() => {
                toast.success("Todo Added!")
                resetForm()
            }).catch((err) => {
                toast.error(err?.data?.message)
            })
        } else { toast.error("Todo is requires") }
    }
    const isLoggedIn = localStorage.getItem("authState")
    const router = useRouter()
    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/")
        }
    }, [])
    return (
        <>

            <Container maxWidth="lg" sx={{ borderRadius: 3, mt: 3 }} >

                <Stack spacing={3} mt={5} >
                    <Stack direction="row" justifyContent="space-between" >
                        <Stack spacing={1}>
                            <Typography variant="h4"> Todos </Typography>
                        </Stack>
                        <Stack alignItems="center" direction="row" spacing={3} >
                            <Button variant='contained' endIcon={(<SvgIcon> <AddIcon /> </SvgIcon>)} onClick={handleOpen} > Add Todo  </Button>
                        </Stack>
                    </Stack>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Formik initialValues={InitialValues} onSubmit={handleAddTodo}>
                                {({ }) => (
                                    <Form>
                                        <Addtodo handleClose={handleClose} isLoading={AddLoading} />
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                    </Modal>
                    <TodoListSearch
                        checkFilter={checkFilter} setCheckFilter={setCheckFilter}
                        search={search} setSearch={setSearch}
                    />
                    <Card >
                        <Stack p={2}>
                            {isLoading ? (
                                <Box ml={11}
                                    sx={{ display: "flex", justifyContent: "center", }}>
                                    <CircularProgress />
                                </Box>
                            )
                                :
                                <Typography variant="h6" textAlign="center" >
                                    {" "}
                                    Total Count:
                                    {count}
                                </Typography>
                            }
                        </Stack>
                        <TodoListTable
                            items={todos}
                            count={count}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                        />

                    </Card>
                </Stack>
                {/* </Box> */}
            </Container>

        </>
    );
};

export default Page;
