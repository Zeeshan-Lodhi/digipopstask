"use client"
import { logout } from '@/redux/authSlice'
import { Box, Button, Container, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const Navbar = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const isLoggedIn = localStorage.getItem("authState")
    const isAuthentic = useSelector((state: any) => state.auth.isLoggedIn)
    console.log(isAuthentic);

    const handleLogout = () => {
        dispatch(logout())
        router.push("/")
    }



    return (
        <Container maxWidth="lg" sx={{ borderRadius: 2.5, mt: 3, boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }} >
            <Stack direction="row" spacing={2} sx={{ height: 64 }}  >
                <Box
                    onClick={() => router.push("/")}
                    sx={{
                        cursor: "pointer",
                        py: 2,
                        color: 'text.primary',
                        fontFamily: '\'Plus Jakarta Sans\', sans-serif',
                        fontSize: 14,
                        fontWeight: 800,
                        letterSpacing: '0.3px',
                        lineHeight: 2.5,
                        '& span': {
                            color: 'primary.main'
                        }
                    }}
                >
                    Todo<span>Task</span>
                </Box>
                <Stack alignItems="center" direction="row" justifyContent="flex-end" spacing={2} sx={{ flexGrow: 1 }} >
                    {
                        isAuthentic ?
                            <Button variant="outlined" onClick={handleLogout} >   Logout </Button>
                            :
                            <>
                                <Button variant="contained"
                                    onClick={() => router.push("/pages/login")}
                                >   Login </Button>
                                <Button variant="outlined" onClick={() => router.push("/pages/signup")} >   Signup </Button>
                            </>
                    }
                </Stack>
            </Stack>
        </Container>
    )
}
