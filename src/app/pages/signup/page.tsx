"use client"
import { login } from '@/redux/authSlice';
import { useSignInMutation, useSignUpMutation } from '@/redux/services/todo';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';


interface Values {
    username: string;
    password: string;
    confirm_password: string;
}

const initialValues: Values = {
    username: '',
    password: '',
    confirm_password: '',
};

const validationSchema = Yup.object({
    username: Yup
        .string()
        .required('Username is required'),
    password: Yup
        .string()
        .max(255)
        .required('Password is required'),
    confirm_password: Yup
        .string()
        .max(255)
        .required('Confirm Password is required')
});

const Page = () => {
    const [signUp, { isLoading }] = useSignUpMutation()
    const router = useRouter()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            if (values.password != values.confirm_password) {
                toast.error("Password is not matched")
            } else {
                signUp(values).unwrap().then((user) => {
                    router.push("/pages/todo")
                    dispatch(login())
                }).catch((err) => {
                    toast.error(err?.data?.message)
                })
            }
        }
    });

    return (
        <>

            <Box width="50vw" margin="auto" mt={12}>

                <Card >
                    <CardHeader
                        sx={{ pb: 0 }}
                        title="Signup"
                    />
                    <CardContent>
                        <form
                            noValidate
                            onSubmit={formik.handleSubmit}
                        >
                            <Stack spacing={3}>
                                <TextField
                                    autoFocus
                                    error={!!(formik.touched.username && formik.errors.username)}
                                    fullWidth
                                    helperText={formik.touched.username && formik.errors.username}
                                    label="User name"
                                    name="username"
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                />
                                <TextField
                                    error={!!(formik.touched.password && formik.errors.password)}
                                    fullWidth
                                    helperText={formik.touched.password && formik.errors.password}
                                    label="Password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    type="password"
                                    value={formik.values.password}
                                />
                                <TextField
                                    error={!!(formik.touched.confirm_password && formik.errors.confirm_password)}
                                    fullWidth
                                    helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                                    label="Confirm Password"
                                    name="confirm_password"
                                    onChange={formik.handleChange}
                                    type="password"
                                    value={formik.values.confirm_password}
                                />
                            </Stack>
                            <Button
                                fullWidth
                                size="large"
                                sx={{ mt: 2 }}
                                type="submit"
                                variant="contained"
                                disabled={isLoading}
                            >
                                Signup
                            </Button>

                        </form>
                        <Typography color="text.secondary" variant="body1" mt={1}> Don't have an account?
                            <Link underline="hover" sx={{ cursor: "pointer" }} variant="subtitle2" onClick={() => router.push("/pages/login")}  >   Login  </Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Box >

        </>
    );
};

export default Page;
