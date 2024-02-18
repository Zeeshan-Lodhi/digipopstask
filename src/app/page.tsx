"use client"
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const router = useRouter()

  const isLoggedIn = localStorage.getItem("authState")

  useEffect(() => {
    if (isLoggedIn) {
      console.log("dec");
      router.push("/pages/todo")
    }

  }, [isLoggedIn])
  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100vw" height="80vh" >
      <Typography variant="h1" color="text.secondary" sx={{
        fontSize: {
          xs: 35,
          lg: 60
        }
      }}>Welcome To Todo App</Typography>
    </Box>
  );
}
