"use client"
import { logout } from '@/redux/authSlice'
import { Avatar, Box, Button, ButtonBase, Container, Divider, Popover, Stack, SvgIcon, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const Navbar = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const isLoggedIn = localStorage.getItem("authState")
    const isAuthentic = useSelector((state: any) => state.auth.isLoggedIn)

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    console.log(isAuthentic);

    const handleLogout = () => {
        dispatch(logout())
        router.push("/")
        handleClose()
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
                            <div>
                                <Box
                                    component={ButtonBase}
                                    onClick={handleClick}
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        borderWidth: 2,
                                        borderStyle: 'solid',
                                        borderColor: 'divider',
                                        height: 40,
                                        width: 40,
                                        borderRadius: '50%'
                                    }}
                                >
                                    <Avatar sx={{ height: 32, width: 32 }}
                                    >
                                        Z
                                    </Avatar>
                                </Box>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                >
                                    <Typography sx={{ p: 2 }}>Zeeshan Lodhi</Typography>
                                    <Divider />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            p: 1,
                                            justifyContent: 'center'
                                        }}
                                    >

                                        <Button variant="outlined" fullWidth onClick={handleLogout} >   Logout </Button>
                                    </Box>
                                </Popover>
                            </div>
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
