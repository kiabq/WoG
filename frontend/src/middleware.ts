// Libraries
import { NextRequest, NextResponse } from 'next/server';

// Routes
import { authRoutes, protectedRoutes, logoutRoutes, adminRoutes } from './routing/routes';

// Types
import type { NextURL } from 'next/dist/server/web/next-url';
import type { IUser } from './utils/types';

function Redirect(url: string | NextURL | URL, request: NextRequest) {
    return NextResponse.redirect(new URL(url, request.url));
}

export default async function middleware(request: NextRequest, response: NextResponse) {
    const token = request.cookies.get('token');

    if (request.nextUrl.pathname.includes('/profile') && token) {
        // Might need to reformat getData function to use fetch instead of axios
        const newUser = await fetch(`${process.env.REACT_APP_BACKEND}/api/users/me`, {
            headers: {
                Authorization: `Bearer ${token.value}`,
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            if (res.status === 200) {
                return res.json()
            };
        }).then((res) => {
            return res.isNew;
        })

        if (newUser === true) {
            return Redirect('/setup', request);
        }
    }

    if (authRoutes.includes(request.nextUrl.pathname) && token) {
        return Redirect('/', request);
    }

    if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
        return Redirect('/', request);
    }

    if (logoutRoutes.includes(request.nextUrl.pathname)) {
        return Redirect('/', request);
    }

    if (adminRoutes.includes(request.nextUrl.pathname)) {
        if (!token) {
            return Redirect('/', request);
        }

        const userRole = await fetch(`${process.env.REACT_APP_BACKEND}/api/users/me`, {
            headers: {
                Authorization: `Bearer ${token.value}`,
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            if (res.status === 200) {
                return res.json()
            };
        }).then((res) => {
            return res.role?.type
        })
        
        if (userRole !== "admin") {
            return Redirect('/', request);
        }
    }
}