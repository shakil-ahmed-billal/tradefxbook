import { createAuthClient } from "better-auth/react"

const PROD_API = 'https://tradefxbook-eta.vercel.app';
const DEV_API = 'http://localhost:8000';
const IS_DEV = typeof window !== 'undefined' && window.location.hostname === 'localhost';
const AUTH_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (IS_DEV ? DEV_API : PROD_API);

export const authClient = createAuthClient({
    baseURL: AUTH_BASE_URL,
    fetchOptions: {
        credentials: 'include',
    },
})
