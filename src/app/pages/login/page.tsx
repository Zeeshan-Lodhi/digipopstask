"use client"
import { login } from '@/redux/authSlice';
import { useSignInMutation } from '@/redux/services/todo';
import { Container } from '@mui/material';
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
}

const initialValues: Values = {
    username: '',
    password: '',
};

const validationSchema = Yup.object({
    username: Yup
        .string()
        .required('Username is required'),
    password: Yup
        .string()
        .max(255)
        .required('Password is required')
});

const Page = () => {
    const [signIn, { isLoading }] = useSignInMutation()
    const router = useRouter()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            signIn(values).unwrap().then((user) => {
                router.push("/pages/todo")
                dispatch(login())
            }).catch((err) => {
                toast.error(err?.data?.message)
            })
        }
    });

    return (
        <>
            <Container sx={{ mt: 12 }}>
                <Card >
                    <CardHeader
                        sx={{ pb: 0 }}
                        title="Log in"
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
                            </Stack>
                            <Button
                                fullWidth
                                size="large"
                                sx={{ mt: 2 }}
                                type="submit"
                                variant="contained"
                                disabled={isLoading}
                            >
                                Log In
                            </Button>

                        </form>
                        <Typography color="text.secondary" variant="body1" mt={1}> Don't have an account?
                            <Link underline="hover" sx={{ cursor: "pointer" }} variant="subtitle2" onClick={() => router.push("/pages/signup")}  >   Signup  </Link>
                        </Typography>
                    </CardContent>
                </Card>
            </ Container>

        </>
    );
};

export default Page;
