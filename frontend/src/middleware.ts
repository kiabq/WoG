// Libraries
import { NextRequest, NextResponse } from 'next/server';

// Routes
import { authRoutes, protectedRoutes, logoutRoutes } from './routing/routes';

export default async function middleware(request: NextRequest, response: NextResponse) {
    const token = request.cookies.get('token');
    
    if (request.nextUrl.pathname.includes('/profile') && token) {
        try {
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
                return NextResponse.redirect(new URL('/setup', request.url));
            }
        } catch(err) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if (authRoutes.includes(request.nextUrl.pathname) && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    
    if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (logoutRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
    }
}