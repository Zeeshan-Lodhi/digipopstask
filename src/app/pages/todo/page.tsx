"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
    const isLoggedIn = localStorage.getItem("authState")
    const router = useRouter()
    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/")
        }
    }, [])
    return (
        <div>Todo Page</div>
    )
}

export default page